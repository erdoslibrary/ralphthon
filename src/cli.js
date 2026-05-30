import { loadPluginData } from "./dataLoader.js";
import { analyzePlugins, buildLeaderboard } from "./scoring.js";
import { formatAnalyzeTable, formatLeaderboardTable, formatError } from "./formatters.js";
import { CoqidError, toPublicError } from "./errors.js";

const HELP = `Coqid-game

Usage:
  coqid-game --help
  coqid-game analyze --data <path> [--format table|json] [--threshold <number>]
  coqid-game leaderboard --period weekly|monthly --data <path> [--sort score|usage|efficiency]

Commands:
  analyze       Rank plugins by survival score and print recommendations.
  leaderboard   Print weekly or monthly plugin rankings.

Safety:
  Recommendation only. Coqid-game does not delete plugins automatically.
`;

export async function runCli(argv, io) {
  const { stdout, stderr, exit } = io;

  try {
    const result = await handleCommand(argv);
    stdout.write(result.output);
    exit(result.exitCode);
  } catch (error) {
    const publicError = toPublicError(error);
    const format = argv.includes("--format") ? valueAfter(argv, "--format") : "table";
    stderr.write(formatError(publicError, format));
    exit(publicError.exitCode);
  }
}

export async function handleCommand(argv) {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { output: HELP, exitCode: 0 };
  }

  const [command] = argv;
  const options = parseOptions(argv.slice(1));

  if (command === "analyze") {
    return analyzeCommand(options);
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

async function analyzeCommand(options) {
  const format = options.format || "table";
  ensureAllowed("format", format, ["table", "json"]);

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

  return { output: formatAnalyzeTable(results), exitCode: 0 };
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
