export function formatAnalyzeTable(results) {
  const lines = [
    "Coqid-game Survival Report",
    "Summary",
    `Plugins analyzed: ${results.length}`,
    `Deletion recommendations: ${results.filter((item) => item.status === "DELETE_RECOMMENDED").length}`,
    `Reminder candidates: ${results.filter((item) => item.status === "REMIND").length}`,
    "",
    "Plugin Rankings",
    formatResultTable(results),
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
    "Safety Notice: Recommendation only. Coqid-game does not delete plugins automatically.",
    "Interactive: enter a rank number for details, or type quit to exit."
  ];

  return `${lines.join("\n")}\n`;
}

export function formatLeaderboardTable(entries, period) {
  const lines = [
    "Coqid-game Leaderboard",
    `Period: ${period}`,
    formatLeaderboardRows(entries),
    "",
    "Safety Notice: Recommendation only. Coqid-game does not delete plugins automatically."
  ];

  return `${lines.join("\n")}\n`;
}

export function formatPluginDetail(plugin, rank) {
  return [
    "",
    `Plugin Detail #${rank}`,
    `Name: ${plugin.name}`,
    `Role: ${plugin.category}`,
    `Status: ${plugin.status}`,
    `Survival Score: ${plugin.survivalScore}`,
    `Weekly Uses: ${plugin.weeklyUses}`,
    `Monthly Uses: ${plugin.monthlyUses}`,
    `Estimated Cost: ${plugin.estimatedCost}`,
    `Last Used: ${plugin.lastUsedDaysAgo}d ago`,
    `Usefulness Signal: ${plugin.usefulnessSignal}`,
    `Reason: ${plugin.reason}`,
    "",
    "Deletion Choice",
    deletionGuidance(plugin),
    "Type delete to mark this plugin as a recommendation-only deletion choice.",
    "Type keep to keep it in this session.",
    "Type another rank number for details, or quit to exit.",
    ""
  ].join("\n");
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

function formatResultTable(results) {
  const rows = results.map((item, index) => ({
    "#": String(index + 1),
    Plugin: item.name,
    Weekly: String(item.weeklyUses),
    Monthly: String(item.monthlyUses),
    Cost: String(item.estimatedCost),
    Last: `${item.lastUsedDaysAgo}d`,
    Score: String(item.survivalScore),
    Status: item.status
  }));

  return formatRows(["#", "Plugin", "Weekly", "Monthly", "Cost", "Last", "Score", "Status"], rows);
}

function formatLeaderboardRows(entries) {
  const rows = entries.map((entry) => ({
    Rank: String(entry.rank),
    Plugin: entry.name,
    Usage: String(entry.usageCount),
    Score: String(entry.survivalScore),
    Status: entry.status
  }));

  return formatRows(["Rank", "Plugin", "Usage", "Score", "Status"], rows);
}

function formatRows(columns, rows) {
  const widths = Object.fromEntries(
    columns.map((column) => [
      column,
      Math.max(column.length, ...rows.map((row) => String(row[column]).length))
    ])
  );
  const render = (row) => columns.map((column) => String(row[column]).padEnd(widths[column])).join(" | ");
  const separator = columns.map((column) => "-".repeat(widths[column])).join("-|-");

  return [
    render(Object.fromEntries(columns.map((column) => [column, column]))),
    separator,
    ...rows.map(render)
  ].join("\n");
}

function deletionGuidance(plugin) {
  if (plugin.status === "DELETE_RECOMMENDED") {
    return "Recommendation: delete candidate. Coqid-game will not delete files automatically.";
  }
  if (plugin.status === "REMIND") {
    return "Recommendation: remind before deleting; this plugin still has useful signals.";
  }
  if (plugin.status === "SAFE") {
    return "Recommendation: keep. Strong usage and value signals.";
  }
  return "Recommendation: watch. Revisit after more usage data before deleting.";
}
