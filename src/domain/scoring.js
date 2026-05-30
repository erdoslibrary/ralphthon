export const STATUSES = {
  SAFE: "SAFE",
  REMINDER_RECOMMENDED: "REMINDER_RECOMMENDED",
  DELETION_RECOMMENDED: "DELETION_RECOMMENDED"
};

const costPenalty = {
  low: 0,
  medium: 8,
  high: 18
};

export function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function classifyPluginStatus(score) {
  if (score >= 70) return STATUSES.SAFE;
  if (score >= 40) return STATUSES.REMINDER_RECOMMENDED;
  return STATUSES.DELETION_RECOMMENDED;
}

export function calculateSurvivalScore(plugin) {
  const weeklySignal = Math.min(plugin.weeklyUses * 3, 25);
  const monthlySignal = Math.min(plugin.monthlyUses, 20);
  const ratingSignal = plugin.userRating ? plugin.userRating * 4 : 12;
  const recencySignal = getRecencySignal(plugin.lastUsedDaysAgo);
  const expensiveDormantPenalty =
    plugin.estimatedCost === "high" && plugin.weeklyUses <= 1 && plugin.monthlyUses < 5 ? 12 : 0;

  const rawScore =
    35 +
    weeklySignal +
    monthlySignal +
    ratingSignal +
    recencySignal -
    costPenalty[plugin.estimatedCost] -
    expensiveDormantPenalty;

  const score = clampScore(rawScore);
  const status = classifyPluginStatus(score);

  return {
    pluginId: plugin.id,
    score,
    status,
    reasons: buildReasons(plugin, score, status)
  };
}

export function scorePlugins(plugins) {
  return plugins.map(calculateSurvivalScore);
}

function getRecencySignal(lastUsedDaysAgo) {
  if (lastUsedDaysAgo <= 7) return 15;
  if (lastUsedDaysAgo <= 30) return 8;
  if (lastUsedDaysAgo <= 90) return 0;
  return -10;
}

function buildReasons(plugin, score, status) {
  const reasons = [];

  if (plugin.weeklyUses >= 5) reasons.push("Strong weekly usage");
  if (plugin.monthlyUses >= 12 && plugin.weeklyUses <= 1) reasons.push("Useful history but low recent use");
  if (plugin.estimatedCost === "high") reasons.push("High estimated cost");
  if (plugin.lastUsedDaysAgo > 90) reasons.push("Not used recently");
  if (status === STATUSES.DELETION_RECOMMENDED) {
    reasons.push("Review only: no automatic deletion is performed");
  }
  if (status === STATUSES.SAFE && reasons.length === 0) reasons.push("Balanced usage and cost signals");
  if (status === STATUSES.REMINDER_RECOMMENDED && !reasons.includes("Useful history but low recent use")) {
    reasons.push("Worth revisiting before removal");
  }

  reasons.push(`Deterministic survival score: ${score}`);
  return reasons;
}
