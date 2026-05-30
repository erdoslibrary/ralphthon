import test from "node:test";
import assert from "node:assert/strict";
import { malformedPlugins, samplePlugins } from "../src/data/samplePlugins.js";
import { parsePluginData, validatePlugin } from "../src/domain/validation.js";

test("valid sample rows pass validation", () => {
  assert.equal(validatePlugin(samplePlugins[0]).valid, true);
});

test("empty plugin data returns safe empty result", () => {
  const result = parsePluginData([]);
  assert.deepEqual(result.plugins, []);
  assert.deepEqual(result.errors, []);
});

test("malformed data is rejected without throwing", () => {
  const result = parsePluginData(malformedPlugins);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 2);
});

test("non-array data returns controlled error", () => {
  const result = parsePluginData({ bad: true });
  assert.deepEqual(result.plugins, []);
  assert.equal(result.errors[0], "Plugin data must be an array");
});
