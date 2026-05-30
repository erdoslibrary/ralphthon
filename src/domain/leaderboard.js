export function buildLeaderboard(plugins, scores, period) {
  const scoreById = new Map(scores.map((score) => [score.pluginId, score]));

  return plugins
    .map((plugin) => {
      const survivalScore = scoreById.get(plugin.id)?.score ?? 0;
      const periodScore = period === "weekly" ? plugin.weeklyUses * 10 + survivalScore : plugin.monthlyUses * 4 + survivalScore;

      return {
        pluginId: plugin.id,
        pluginName: plugin.name,
        pluginUrl: plugin.url ?? "",
        rank: 0,
        period,
        score: periodScore,
        badge: getBadge(plugin, survivalScore)
      };
    })
    .sort((a, b) => b.score - a.score || a.pluginName.localeCompare(b.pluginName))
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
}

function getBadge(plugin, survivalScore) {
  if (survivalScore < 40) return "MOST_ENDANGERED";
  if (plugin.estimatedCost === "low" && plugin.monthlyUses >= 10) return "MOST_EFFICIENT";
  return "MOST_USED";
}
