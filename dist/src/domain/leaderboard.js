export function buildLeaderboard(plugins, scores, period) {
  const scoreById = new Map(scores.map((score) => [score.pluginId, score]));

  return plugins
    .map((plugin) => {
      const survivalScore = scoreById.get(plugin.id)?.score ?? 0;
      const periodScore =
        period === "weekly"
          ? Math.min(plugin.weeklyUses * 10, 60) + survivalScore * 0.4
          : Math.min(plugin.monthlyUses * 3, 60) + survivalScore * 0.4;

      return {
        pluginId: plugin.id,
        pluginName: plugin.name,
        pluginUrl: plugin.url ?? "",
        rank: 0,
        period,
        score: Math.round(periodScore),
        badge: getBadge(plugin, survivalScore, period)
      };
    })
    .sort((a, b) => b.score - a.score || a.pluginName.localeCompare(b.pluginName))
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
}

function getBadge(plugin, survivalScore, period) {
  if (survivalScore < 40) return "ELIMINATED";
  if (survivalScore >= 85) return "SURVIVOR";
  if (plugin.estimatedCost === "low" && plugin.monthlyUses >= 10) return "EFFICIENT_SURVIVOR";
  if (period === "weekly" && plugin.weeklyUses >= 8) return "WEEKLY_CHAMPION";
  if (period === "monthly" && plugin.monthlyUses >= 20) return "MONTHLY_CHAMPION";
  return "ACTIVE";
}
