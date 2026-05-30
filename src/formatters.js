export function formatAnalyzeTable(results) {
  const lines = [
    "Coqid-game Survival Report",
    "Summary",
    `Plugins analyzed: ${results.length}`,
    `Deletion recommendations: ${results.filter((item) => item.status === "DELETE_RECOMMENDED").length}`,
    `Reminder candidates: ${results.filter((item) => item.status === "REMIND").length}`,
    "",
    "Plugin Rankings",
    "Plugin | Weekly | Monthly | Est. Cost | Last Used | Survival Score | Status | Reason",
    ...results.map((item) =>
      [
        item.name,
        item.weeklyUses,
        item.monthlyUses,
        item.estimatedCost,
        `${item.lastUsedDaysAgo}d ago`,
        item.survivalScore,
        item.status,
        item.reason
      ].join(" | ")
    ),
    "",
    "Deletion Recommendations",
    ...sectionRows(results, "DELETE_RECOMMENDED"),
    "",
    "Reminder Candidates",
    ...sectionRows(results, "REMIND"),
    "",
    "Leaderboard Summary",
    ...results.slice(0, 3).map((item, index) => `${index + 1}. ${item.name} (${item.survivalScore})`),
    "",
    "Safety Notice: Recommendation only. Coqid-game does not delete plugins automatically."
  ];

  return `${lines.join("\n")}\n`;
}

export function formatLeaderboardTable(entries, period) {
  const lines = [
    "Coqid-game Leaderboard",
    `Period: ${period}`,
    "Rank | Plugin | Usage | Survival Score | Status",
    ...entries.map((entry) =>
      [
        entry.rank,
        entry.name,
        entry.usageCount,
        entry.survivalScore,
        entry.status
      ].join(" | ")
    ),
    "",
    "Safety Notice: Recommendation only. Coqid-game does not delete plugins automatically."
  ];

  return `${lines.join("\n")}\n`;
}

export function formatError(error, format = "table") {
  if (format === "json") {
    return `${JSON.stringify({
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        hint: error.hint
      }
    }, null, 2)}\n`;
  }

  return [
    `Error: ${error.message}`,
    `Code: ${error.code}`,
    `Hint: ${error.hint}`,
    ""
  ].join("\n");
}

function sectionRows(results, status) {
  const rows = results.filter((item) => item.status === status);
  if (rows.length === 0) {
    return ["None"];
  }
  return rows.map((item) => `- ${item.name}: ${item.reason}`);
}
