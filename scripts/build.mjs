import { access } from "node:fs/promises";

const requiredFiles = [
  "cli/coqid-game.js",
  "cli/coquid-game.js",
  "src/cli.js",
  "src/dataLoader.js",
  "src/scoring.js",
  "src/formatters.js",
  "src/errors.js",
  "fixtures/plugins.json",
  "fixtures/invalid.json",
  "fixtures/malformed.json",
  "fixtures/empty.json"
];

await Promise.all(requiredFiles.map((file) => access(file)));
await import("../src/cli.js");
await import("../src/dataLoader.js");
await import("../src/scoring.js");
await import("../src/formatters.js");

console.log("Build check passed: CLI modules and fixtures are present.");
