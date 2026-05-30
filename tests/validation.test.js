import test from "node:test";
import assert from "node:assert/strict";
import { validatePluginData } from "../src/dataLoader.js";
import { CoqidError } from "../src/errors.js";

test("valid fixture-shaped data passes schema validation", () => {
  assert.doesNotThrow(() =>
    validatePluginData({
      generatedAt: "2026-05-30T00:00:00.000Z",
      plugins: [
        {
          id: "plugin-linter",
          name: "Linter Helper",
          weeklyUses: 18,
          monthlyUses: 64,
          estimatedCost: 12,
          lastUsedDaysAgo: 1,
          usefulnessSignal: 0.9
        }
      ]
    })
  );
});

test("invalid records raise controlled schema errors", () => {
  assert.throws(
    () =>
      validatePluginData({
        plugins: [
          {
            id: "",
            name: "Bad",
            weeklyUses: -1,
            monthlyUses: 2,
            estimatedCost: 1,
            lastUsedDaysAgo: 0,
            usefulnessSignal: 0.4
          }
        ]
      }),
    (error) => error instanceof CoqidError && error.code === "SCHEMA_INVALID"
  );
});
