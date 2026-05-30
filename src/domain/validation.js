const allowedCosts = new Set(["low", "medium", "high"]);

export function validatePlugin(plugin) {
  const errors = [];

  if (!plugin || typeof plugin !== "object") errors.push("Plugin row must be an object");
  if (!plugin?.id || typeof plugin.id !== "string") errors.push("id is required");
  if (!plugin?.name || typeof plugin.name !== "string") errors.push("name is required");
  if (!Number.isInteger(plugin?.weeklyUses) || plugin.weeklyUses < 0) errors.push("weeklyUses must be >= 0");
  if (!Number.isInteger(plugin?.monthlyUses) || plugin.monthlyUses < 0) errors.push("monthlyUses must be >= 0");
  if (!allowedCosts.has(plugin?.estimatedCost)) errors.push("estimatedCost must be low, medium, or high");
  if (!Number.isInteger(plugin?.lastUsedDaysAgo) || plugin.lastUsedDaysAgo < 0) {
    errors.push("lastUsedDaysAgo must be >= 0");
  }
  if (
    plugin?.userRating !== undefined &&
    (!Number.isInteger(plugin.userRating) || plugin.userRating < 1 || plugin.userRating > 5)
  ) {
    errors.push("userRating must be 1-5 when present");
  }
  if (plugin?.description !== undefined && (typeof plugin.description !== "string" || plugin.description.trim() === "")) {
    errors.push("description must be a non-empty string when present");
  }
  if (plugin?.url !== undefined && !isSafeHttpUrl(plugin.url)) {
    errors.push("url must be an http or https URL when present");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function parsePluginData(rows) {
  if (!Array.isArray(rows)) {
    return {
      plugins: [],
      errors: ["Plugin data must be an array"]
    };
  }

  const plugins = [];
  const errors = [];

  rows.forEach((row, index) => {
    const result = validatePlugin(row);
    if (result.valid) {
      plugins.push(row);
    } else {
      errors.push(`Row ${index + 1}: ${result.errors.join(", ")}`);
    }
  });

  return { plugins, errors };
}

function isSafeHttpUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
