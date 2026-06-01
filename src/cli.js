import { loadPluginData } from "./dataLoader.js";
import { analyzePlugins, buildLeaderboard } from "./scoring.js";
import { createInterface } from "node:readline/promises";
import { formatAnalyzeTable, formatLeaderboardTable, formatError, formatPluginDetail } from "./formatters.js";
import { CoqidError, toPublicError } from "./errors.js";

const HELP = `Coqid-game

Usage:
  coqid-game --help
  coqid-game analyze --data <path> [--format table|json] [--threshold <number>] [--interactive|--no-interactive]
  coqid-game leaderboard --period weekly|monthly --data <path> [--sort score|usage|efficiency]
  coquid-game analyze --data <path>

Commands:
  analyze       Rank plugins by survival score and print recommendations.
  leaderboard   Print weekly or monthly plugin rankings.

Safety:
  Recommendation only. Coqid-game does not delete plugins automatically.
`;

export async function runCli(argv, io) {
  const { stdin, stdout, stderr, exit } = io;

  try {
    const result = await handleCommand(argv, {
      interactiveDefault: Boolean(stdin?.isTTY && stdout?.isTTY)
    });
    stdout.write(result.output);
    if (result.interactive) {
      await runInteractiveSelection(result.results, { stdin, stdout });
    }
    exit(result.exitCode);
  } catch (error) {
    const publicError = toPublicError(error);
    const format = argv.includes("--format") ? valueAfter(argv, "--format") : "table";
    stderr.write(formatError(publicError, format));
    exit(publicError.exitCode);
  }
}

export async function handleCommand(argv, context = {}) {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { output: HELP, exitCode: 0 };
  }

  const [command] = argv;
  const options = parseOptions(argv.slice(1));

  if (command === "analyze") {
    return analyzeCommand(options, context);
  }

  if (command === "leaderboard") {
    return leaderboardCommand(options);
  }

  if (["delete", "remove", "purge"].includes(command)) {
    throw new CoqidError(
      "INVALID_INPUT",
      `Command '${command}' is not available in the MVP.`,
      "Use analyze to receive recommendation-only deletion candidates."
    );
  }

  throw new CoqidError(
    "INVALID_INPUT",
    `Unknown command: ${command}`,
    "Run coqid-game --help to see available commands."
  );
}

async function analyzeCommand(options, context) {
  const format = options.format || "table";
  ensureAllowed("format", format, ["table", "json"]);
  const interactive = resolveInteractive(options, context.interactiveDefault);

  const threshold = options.threshold === undefined ? undefined : Number(options.threshold);
  if (options.threshold !== undefined && (!Number.isFinite(threshold) || threshold < 0 || threshold > 100)) {
    throw new CoqidError(
      "INVALID_INPUT",
      "--threshold must be a number between 0 and 100.",
      "Use a value such as --threshold 35."
    );
  }

  const data = await loadPluginData(options.data);
  const results = analyzePlugins(data.plugins, { deleteThreshold: threshold });

  if (format === "json") {
    return {
      output: `${JSON.stringify({ ok: true, data: { plugins: results } }, null, 2)}\n`,
      exitCode: 0
    };
  }

  return {
    output: formatAnalyzeTable(results),
    exitCode: 0,
    interactive,
    results
  };
}

async function leaderboardCommand(options) {
  const period = options.period;
  ensureAllowed("period", period, ["weekly", "monthly"]);
  const sort = options.sort || "score";
  ensureAllowed("sort", sort, ["score", "usage", "efficiency"]);

  const data = await loadPluginData(options.data);
  const results = analyzePlugins(data.plugins);
  const entries = buildLeaderboard(results, period, sort);

  return { output: formatLeaderboardTable(entries, period), exitCode: 0 };
}

function parseOptions(argv) {
  const options = {};
  const flagOptions = new Set(["interactive", "no-interactive"]);

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      throw new CoqidError(
        "INVALID_INPUT",
        `Unexpected argument: ${token}`,
        "Use --option value syntax."
      );
    }

    const key = token.slice(2);
    if (flagOptions.has(key)) {
      options[key] = true;
      continue;
    }

    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new CoqidError(
        "INVALID_INPUT",
        `Missing value for --${key}.`,
        "Run coqid-game --help to see required options."
      );
    }
    options[key] = value;
    index += 1;
  }

  return options;
}

async function runInteractiveSelection(results, io) {
  const { stdin, stdout } = io;
  let selected = null;
  let pendingDelete = null;

  const processAnswer = (rawAnswer) => {
    const answer = rawAnswer.trim().toLowerCase();

    if (pendingDelete) {
      if (["yes", "y", "confirm", "확인", "삭제"].includes(answer)) {
        stdout.write(`Confirmed recommendation-only delete choice for ${pendingDelete.name}. No files were deleted.\n`);
        pendingDelete = null;
        return false;
      }
      if (["no", "n", "cancel", "취소", "아니오"].includes(answer)) {
        stdout.write(`Cancelled delete choice for ${pendingDelete.name}.\n`);
        pendingDelete = null;
        return false;
      }
      stdout.write("Confirm delete choice with yes or cancel with no.\n");
      return false;
    }

    if (["quit", "q", "exit", "end", "done", "stop", "종료", "끝"].includes(answer)) {
      stdout.write("Session ended. No plugins were deleted.\n");
      return true;
    }

    if (["rank", "ranks", "list", "table", "help", "?"].includes(answer)) {
      stdout.write(formatRankHelp(results));
      return false;
    }

    if (answer === "delete" || answer === "d") {
      if (!selected) {
        stdout.write("Select a plugin number before choosing delete.\n");
        return false;
      }
      pendingDelete = selected;
      stdout.write(`Delete choice requested for ${selected.name}. This is recommendation-only; no files will be deleted. Type yes to confirm or no to cancel.\n`);
      return false;
    }

    if (answer === "keep" || answer === "k") {
      if (!selected) {
        stdout.write("Select a plugin number before choosing keep.\n");
        return false;
      }
      stdout.write(`Recorded keep choice for ${selected.name} in this session.\n`);
      return false;
    }

    const rank = Number(answer);
    if (Number.isInteger(rank) && rank >= 1 && rank <= results.length) {
      selected = results[rank - 1];
      stdout.write(`${formatPluginDetail(selected, rank)}\n`);
      return false;
    }

    stdout.write("Unknown input. Enter a rank number, delete, keep, or quit.\n");
    return false;
  };

  if (!stdin?.isTTY) {
    const input = await readAll(stdin);
    for (const answer of input.split(/\r?\n/).filter((line) => line.length > 0)) {
      stdout.write("Select rank, delete, keep, or quit > ");
      if (processAnswer(answer)) {
        return;
      }
    }
    stdout.write("Input ended. No plugins were deleted.\n");
    return;
  }

  const readline = createInterface({ input: stdin, output: stdout });

  try {
    while (true) {
      const answer = await readline.question("Select rank, delete, keep, or quit > ");
      if (processAnswer(answer)) {
        return;
      }
    }
  } finally {
    readline.close();
  }
}

function formatRankHelp(results) {
  return [
    "Enter a rank number to inspect a plugin:",
    ...results.map((plugin, index) => `${index + 1}: ${plugin.name} (${plugin.status}, score ${plugin.survivalScore})`),
    "Then type keep, delete, or quit.",
    ""
  ].join("\n");
}

async function readAll(stream) {
  let input = "";
  for await (const chunk of stream) {
    input += chunk;
  }
  return input;
}

function resolveInteractive(options, interactiveDefault) {
  if (options.format === "json") {
    return false;
  }
  if (options["no-interactive"]) {
    return false;
  }
  if (options.interactive) {
    return true;
  }
  return Boolean(interactiveDefault);
}

function ensureAllowed(name, value, allowed) {
  if (!allowed.includes(value)) {
    throw new CoqidError(
      "INVALID_INPUT",
      `Invalid ${name}: ${value || "(missing)"}.`,
      `Allowed ${name} values: ${allowed.join(", ")}.`
    );
  }
}

function valueAfter(argv, key) {
  const index = argv.indexOf(key);
  return index >= 0 ? argv[index + 1] : undefined;
}
