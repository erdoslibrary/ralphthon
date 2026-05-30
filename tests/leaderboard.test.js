import test from "node:test";
import assert from "node:assert/strict";
import { samplePlugins } from "../src/data/samplePlugins.js";
import { buildLeaderboard } from "../src/domain/leaderboard.js";
import { scorePlugins } from "../src/domain/scoring.js";

test("weekly leaderboard is sorted by descending score", () => {
  const leaderboard = buildLeaderboard(samplePlugins, scorePlugins(samplePlugins), "weekly");
  assert.equal(leaderboard[0].rank, 1);
  assert.deepEqual(
    leaderboard.map((entry) => entry.score),
    leaderboard.map((entry) => entry.score).toSorted((a, b) => b - a)
  );
});

test("monthly leaderboard is sorted by descending score", () => {
  const leaderboard = buildLeaderboard(samplePlugins, scorePlugins(samplePlugins), "monthly");
  assert.equal(leaderboard[0].rank, 1);
  assert.deepEqual(
    leaderboard.map((entry) => entry.score),
    leaderboard.map((entry) => entry.score).toSorted((a, b) => b - a)
  );
});

test("leaderboard entries include plugin URLs", () => {
  const leaderboard = buildLeaderboard(samplePlugins, scorePlugins(samplePlugins), "weekly");
  assert.match(leaderboard[0].pluginUrl, /^https?:\/\//);
});
