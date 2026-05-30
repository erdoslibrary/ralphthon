import test from "node:test";
import assert from "node:assert/strict";
import { analyzePlugins, buildLeaderboard, scorePlugin } from "../src/scoring.js";

const fixtureRecords = [
  {
    id: "safe",
    name: "Safe Plugin",
    weeklyUses: 20,
    monthlyUses: 80,
    estimatedCost: 5,
    lastUsedDaysAgo: 1,
    usefulnessSignal: 0.95
  },
  {
    id: "delete",
    name: "Delete Candidate",
    weeklyUses: 0,
    monthlyUses: 2,
    estimatedCost: 28,
    lastUsedDaysAgo: 60,
    usefulnessSignal: 0.1
  },
  {
    id: "remind",
    name: "Reminder Candidate",
    weeklyUses: 1,
    monthlyUses: 12,
    estimatedCost: 6,
    lastUsedDaysAgo: 30,
    usefulnessSignal: 0.8
  }
];

test("scoring is deterministic for the same plugin", () => {
  const first = scorePlugin(fixtureRecords[0]);
  const second = scorePlugin(fixtureRecords[0]);

  assert.deepEqual(first, second);
  assert.equal(first.status, "SAFE");
});

test("recommendation engine marks low-value plugins for deletion recommendation only", () => {
  const result = scorePlugin(fixtureRecords[1]);

  assert.equal(result.status, "DELETE_RECOMMENDED");
  assert.match(result.reason, /recommended only/i);
});

test("forgotten but useful plugins become reminder candidates", () => {
  const result = scorePlugin(fixtureRecords[2]);

  assert.equal(result.status, "REMIND");
});

test("leaderboard sorts by score and assigns ranks", () => {
  const results = analyzePlugins(fixtureRecords);
  const leaderboard = buildLeaderboard(results, "monthly");

  assert.equal(leaderboard[0].rank, 1);
  assert.equal(leaderboard[0].name, "Safe Plugin");
  assert.equal(leaderboard[0].period, "monthly");
  assert.equal(leaderboard[0].usageCount, 80);
});
