import test from "node:test";
import assert from "node:assert/strict";
import { malformedPlugins, samplePlugins } from "../src/data/samplePlugins.js";
import { parsePluginData, validatePlugin } from "../src/domain/validation.js";

test("valid sample rows pass validation", () => {
  assert.equal(validatePlugin(samplePlugins[0]).valid, true);
});

test("plugin info metadata uses safe shapes", () => {
  const plugin = samplePlugins[0];
  assert.equal(typeof plugin.description, "string");
  assert.equal(plugin.description.length > 0, true);
  assert.match(plugin.url, /^https?:\/\//);
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

test("invalid plugin info URL is rejected", () => {
  const result = validatePlugin({
    ...samplePlugins[0],
    url: "javascript:alert(1)"
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes("url must be an http or https URL when present"));
});

test("non-array data returns controlled error", () => {
  const result = parsePluginData({ bad: true });
  assert.deepEqual(result.plugins, []);
  assert.equal(result.errors[0], "Plugin data must be an array");
});
