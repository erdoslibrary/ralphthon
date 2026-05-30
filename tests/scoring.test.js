import test from "node:test";
import assert from "node:assert/strict";
import { samplePlugins } from "../src/data/samplePlugins.js";
import { calculateSurvivalScore, classifyPluginStatus, STATUSES } from "../src/domain/scoring.js";

test("same input produces deterministic survival score", () => {
  const plugin = samplePlugins[0];
  assert.deepEqual(calculateSurvivalScore(plugin), calculateSurvivalScore(plugin));
});

test("high-use low-cost recent plugin becomes SAFE", () => {
  const score = calculateSurvivalScore(samplePlugins.find((plugin) => plugin.id === "plugin-browser"));
  assert.equal(score.status, STATUSES.SAFE);
  assert.ok(score.score >= 70);
});

test("low-use high-cost old plugin becomes DELETION_RECOMMENDED", () => {
  const score = calculateSurvivalScore(samplePlugins.find((plugin) => plugin.id === "plugin-old-expensive"));
  assert.equal(score.status, STATUSES.DELETION_RECOMMENDED);
  assert.ok(score.reasons.some((reason) => reason.includes("Review only")));
});

test("useful but forgotten plugin becomes REMINDER_RECOMMENDED", () => {
  const score = calculateSurvivalScore(samplePlugins.find((plugin) => plugin.id === "plugin-presentations"));
  assert.equal(score.status, STATUSES.REMINDER_RECOMMENDED);
});

test("classifier thresholds match contract", () => {
  assert.equal(classifyPluginStatus(70), STATUSES.SAFE);
  assert.equal(classifyPluginStatus(40), STATUSES.REMINDER_RECOMMENDED);
  assert.equal(classifyPluginStatus(39), STATUSES.DELETION_RECOMMENDED);
});
