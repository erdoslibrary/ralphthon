export const STATUSES = Object.freeze({
  safe: "SAFE",
  watch: "WATCH",
  remind: "REMIND",
  deleteRecommended: "DELETE_RECOMMENDED"
});

export function analyzePlugins(records, options = {}) {
  const deleteThreshold = Number.isFinite(options.deleteThreshold)
    ? options.deleteThreshold
    : 35;

  return records
    .map((plugin) => scorePlugin(plugin, deleteThreshold))
    .sort((a, b) => b.survivalScore - a.survivalScore || a.name.localeCompare(b.name));
}

export function scorePlugin(plugin, deleteThreshold = 35) {
  const usageScore = Math.min(30, plugin.weeklyUses * 1.4 + plugin.monthlyUses * 0.2);
  const recencyScore = Math.max(0, 20 - plugin.lastUsedDaysAgo * 0.75);
  const efficiencyScore = Math.max(0, 20 - plugin.estimatedCost * 0.65);
  const usefulnessScore = plugin.usefulnessSignal * 25;
  const unusedPenalty = plugin.weeklyUses === 0 ? 10 : 0;
  const highCostLowUsePenalty =
    plugin.weeklyUses <= 2 && plugin.estimatedCost >= 20 ? 12 : 0;

  const rawScore =
    usageScore +
    recencyScore +
    efficiencyScore +
    usefulnessScore -
    unusedPenalty -
    highCostLowUsePenalty;
  const survivalScore = clampScore(Math.round(rawScore));
  const status = determineStatus(plugin, survivalScore, deleteThreshold);
  const reason = buildReason(plugin, survivalScore, status);

  return {
    id: plugin.id,
    name: plugin.name,
    category: plugin.category || "uncategorized",
    weeklyUses: plugin.weeklyUses,
    monthlyUses: plugin.monthlyUses,
    estimatedCost: plugin.estimatedCost,
    lastUsedDaysAgo: plugin.lastUsedDaysAgo,
    usefulnessSignal: plugin.usefulnessSignal,
    survivalScore,
    status,
    reason
  };
}

export function buildLeaderboard(results, period, sort = "score") {
  const ranked = [...results].sort((a, b) => {
    if (sort === "usage") {
      return usageForPeriod(b, period) - usageForPeriod(a, period) || b.survivalScore - a.survivalScore;
    }
    if (sort === "efficiency") {
      return efficiency(b) - efficiency(a) || b.survivalScore - a.survivalScore;
    }
    return b.survivalScore - a.survivalScore || usageForPeriod(b, period) - usageForPeriod(a, period);
  });

  return ranked.map((plugin, index) => ({
    rank: index + 1,
    pluginId: plugin.id,
    name: plugin.name,
    period,
    usageCount: usageForPeriod(plugin, period),
    survivalScore: plugin.survivalScore,
    status: plugin.status
  }));
}

function determineStatus(plugin, score, deleteThreshold) {
  const forgottenButUseful =
    plugin.lastUsedDaysAgo >= 21 &&
    plugin.usefulnessSignal >= 0.7 &&
    plugin.monthlyUses >= 8;

  if (forgottenButUseful) {
    return STATUSES.remind;
  }

  const lowValue =
    score < deleteThreshold ||
    (plugin.weeklyUses <= 1 && plugin.monthlyUses <= 4 && plugin.estimatedCost >= 18);

  if (lowValue) {
    return STATUSES.deleteRecommended;
  }

  if (score >= 70) {
    return STATUSES.safe;
  }

  return STATUSES.watch;
}

function buildReason(plugin, score, status) {
  if (status === STATUSES.safe) {
    return "High survival score from recent usage and useful signals.";
  }
  if (status === STATUSES.remind) {
    return "Historically useful but not used recently; remind before deleting.";
  }
  if (status === STATUSES.deleteRecommended) {
    return "Low usage and weak cost efficiency; deletion recommended only.";
  }
  if (plugin.estimatedCost > 20) {
    return "Moderate value with elevated estimated cost; keep watching.";
  }
  return `Moderate survival score (${score}); revisit after more usage data.`;
}

function usageForPeriod(plugin, period) {
  return period === "weekly" ? plugin.weeklyUses : plugin.monthlyUses;
}

function efficiency(plugin) {
  return plugin.estimatedCost === 0
    ? plugin.survivalScore
    : plugin.survivalScore / plugin.estimatedCost;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}
