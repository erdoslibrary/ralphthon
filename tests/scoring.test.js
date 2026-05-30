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
  assert.ok(score.reasons.some((reason) => reason.includes("탈락 선언")));
  assert.ok(score.reasons.some((reason) => reason.includes("실제 삭제는 수동으로만 가능합니다")));
});

test("useful but forgotten plugin becomes REMINDER_RECOMMENDED", () => {
  const score = calculateSurvivalScore(samplePlugins.find((plugin) => plugin.id === "plugin-presentations"));
  const reminderCopy = ["달고나", "생존 경고", "심사위원 주목"];

  assert.equal(score.status, STATUSES.REMINDER_RECOMMENDED);
  assert.ok(score.reasons.some((reason) => reminderCopy.some((copy) => reason.includes(copy))));
});

test("classifier thresholds match contract", () => {
  assert.equal(classifyPluginStatus(70), STATUSES.SAFE);
  assert.equal(classifyPluginStatus(40), STATUSES.REMINDER_RECOMMENDED);
  assert.equal(classifyPluginStatus(39), STATUSES.DELETION_RECOMMENDED);
});
