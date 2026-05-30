import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

function runCli(args) {
  return spawnSync(process.execPath, ["cli/coqid-game.js", ...args], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
}

test("help output exposes analyze and leaderboard", () => {
  const result = runCli(["--help"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /analyze/);
  assert.match(result.stdout, /leaderboard/);
});

test("declared package bin points to the runnable CLI entrypoint", async () => {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const entrypoint = packageJson.bin["coqid-game"];
  const result = spawnSync(process.execPath, [entrypoint, "--help"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });

  assert.equal(entrypoint, "./cli/coqid-game.js");
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Coqid-game/);
});

test("analyze prints report sections and safety notice", () => {
  const result = runCli(["analyze", "--data", "fixtures/plugins.json"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Coqid-game Survival Report/);
  assert.match(result.stdout, /DELETE_RECOMMENDED/);
  assert.match(result.stdout, /REMIND/);
  assert.match(result.stdout, /does not delete plugins automatically/);
});

test("analyze can emit machine-readable JSON", () => {
  const result = runCli(["analyze", "--data", "fixtures/plugins.json", "--format", "json"]);
  const parsed = JSON.parse(result.stdout);

  assert.equal(result.status, 0);
  assert.equal(parsed.ok, true);
  assert.ok(parsed.data.plugins.some((plugin) => plugin.status === "DELETE_RECOMMENDED"));
});

test("weekly leaderboard prints sorted ranks", () => {
  const result = runCli(["leaderboard", "--period", "weekly", "--data", "fixtures/plugins.json"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Coqid-game Leaderboard/);
  assert.match(result.stdout, /Period: weekly/);
  assert.match(result.stdout, /1 \| OpenAI Docs Navigator/);
});

test("monthly leaderboard prints sorted ranks", () => {
  const result = runCli(["leaderboard", "--period", "monthly", "--data", "fixtures/plugins.json"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Coqid-game Leaderboard/);
  assert.match(result.stdout, /Period: monthly/);
  assert.match(result.stdout, /1 \| OpenAI Docs Navigator/);
});

test("invalid fixture returns controlled non-zero error", () => {
  const result = runCli(["analyze", "--data", "fixtures/invalid.json"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Error:/);
  assert.match(result.stderr, /SCHEMA_INVALID/);
});

test("malformed JSON returns controlled invalid-json error", () => {
  const result = runCli(["analyze", "--data", "fixtures/malformed.json"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /INVALID_JSON/);
});

test("missing data file returns controlled file-not-found error", () => {
  const result = runCli(["analyze", "--data", "fixtures/missing.json"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /FILE_NOT_FOUND/);
});

test("empty plugin data returns controlled schema error", () => {
  const result = runCli(["analyze", "--data", "fixtures/empty.json"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /SCHEMA_INVALID/);
});

test("destructive commands are unavailable", () => {
  const result = runCli(["delete", "--data", "fixtures/plugins.json"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /not available in the MVP/);
});
