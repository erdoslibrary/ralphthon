import { spawnSync } from "node:child_process";

const commands = [
  ["cli/coqid-game.js", ["--help"], 0],
  ["cli/coqid-game.js", ["analyze", "--data", "fixtures/plugins.json"], 0],
  ["cli/coqid-game.js", ["leaderboard", "--period", "weekly", "--data", "fixtures/plugins.json"], 0],
  ["cli/coqid-game.js", ["analyze", "--data", "fixtures/invalid.json"], 1],
  ["cli/coqid-game.js", ["analyze", "--data", "fixtures/malformed.json"], 1]
];

for (const [script, args, expectedStatus] of commands) {
  const result = spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8"
  });

  if (result.status !== expectedStatus) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`Smoke command failed: ${script} ${args.join(" ")}`);
  }
}

console.log("Smoke check passed: help, analyze, leaderboard, and invalid-input paths behaved as expected.");
