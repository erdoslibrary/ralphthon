import { readFile } from "node:fs/promises";
import { CoqidError } from "./errors.js";

export async function loadPluginData(filePath) {
  if (!filePath) {
    throw new CoqidError(
      "INVALID_INPUT",
      "Missing required --data option.",
      "Pass --data fixtures/plugins.json."
    );
  }

  let raw;
  try {
    raw = await readFile(filePath, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new CoqidError(
        "FILE_NOT_FOUND",
        `Data file not found: ${filePath}`,
        "Check the path and try again."
      );
    }
    throw error;
  }

  if (raw.trim().length === 0) {
    throw new CoqidError(
      "INVALID_INPUT",
      "Data file is empty.",
      "Provide a JSON object with a plugins array."
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new CoqidError(
      "INVALID_JSON",
      "Data file is not valid JSON.",
      "Fix the JSON syntax and try again."
    );
  }

  validatePluginData(parsed);
  return parsed;
}

export function validatePluginData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw schemaError("Root value must be an object.");
  }

  if (!Array.isArray(data.plugins)) {
    throw schemaError("Root object must include a plugins array.");
  }

  if (data.plugins.length === 0) {
    throw schemaError("plugins array must contain at least one plugin.");
  }

  data.plugins.forEach((plugin, index) => validatePlugin(plugin, index));
}

function validatePlugin(plugin, index) {
  if (!plugin || typeof plugin !== "object" || Array.isArray(plugin)) {
    throw schemaError(`plugins[${index}] must be an object.`);
  }

  requireNonEmptyString(plugin.id, `plugins[${index}].id`);
  requireNonEmptyString(plugin.name, `plugins[${index}].name`);
  requireNonNegativeNumber(plugin.weeklyUses, `plugins[${index}].weeklyUses`);
  requireNonNegativeNumber(plugin.monthlyUses, `plugins[${index}].monthlyUses`);
  requireNonNegativeNumber(plugin.estimatedCost, `plugins[${index}].estimatedCost`);
  requireNonNegativeNumber(plugin.lastUsedDaysAgo, `plugins[${index}].lastUsedDaysAgo`);

  if (
    typeof plugin.usefulnessSignal !== "number" ||
    Number.isNaN(plugin.usefulnessSignal) ||
    plugin.usefulnessSignal < 0 ||
    plugin.usefulnessSignal > 1
  ) {
    throw schemaError(`plugins[${index}].usefulnessSignal must be between 0 and 1.`);
  }
}

function requireNonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw schemaError(`${field} must be a non-empty string.`);
  }
}

function requireNonNegativeNumber(value, field) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    throw schemaError(`${field} must be a number >= 0.`);
  }
}

function schemaError(message) {
  return new CoqidError(
    "SCHEMA_INVALID",
    message,
    "Match the schema documented in SPEC/DATA_MODEL.md."
  );
}
