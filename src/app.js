import { malformedPlugins, samplePlugins } from "./data/samplePlugins.js";
import { buildLeaderboard } from "./domain/leaderboard.js";
import { scorePlugins, STATUSES } from "./domain/scoring.js";
import { parsePluginData } from "./domain/validation.js";

const state = {
  rawPlugins: samplePlugins,
  plugins: samplePlugins,
  errors: [],
  scores: [],
  hasRun: false,
  filter: "ALL",
  period: "weekly"
};

const elements = {
  runCheck: document.querySelector("#run-check"),
  loadSample: document.querySelector("#load-sample"),
  loadEmpty: document.querySelector("#load-empty"),
  loadMalformed: document.querySelector("#load-malformed"),
  statusFilter: document.querySelector("#status-filter"),
  weeklyTab: document.querySelector("#weekly-tab"),
  monthlyTab: document.querySelector("#monthly-tab"),
  pluginList: document.querySelector("#plugin-list"),
  leaderboardList: document.querySelector("#leaderboard-list"),
  message: document.querySelector("#state-message"),
  total: document.querySelector("#metric-total"),
  safe: document.querySelector("#metric-safe"),
  reminder: document.querySelector("#metric-reminder"),
  deletion: document.querySelector("#metric-deletion")
};

elements.runCheck.addEventListener("click", runSurvivalCheck);
elements.loadSample.addEventListener("click", () => loadData(samplePlugins, false));
elements.loadEmpty.addEventListener("click", () => loadData([], false));
elements.loadMalformed.addEventListener("click", () => loadData(malformedPlugins, false));
elements.statusFilter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  render();
});
elements.weeklyTab.addEventListener("click", () => setPeriod("weekly"));
elements.monthlyTab.addEventListener("click", () => setPeriod("monthly"));

loadData(samplePlugins, true);

function loadData(rows, preserveMessage) {
  const result = parsePluginData(rows);
  state.rawPlugins = rows;
  state.plugins = result.plugins;
  state.errors = result.errors;
  state.scores = [];
  state.hasRun = false;
  state.filter = "ALL";
  elements.statusFilter.value = "ALL";

  if (!preserveMessage) {
    setMessage(result);
  }

  render();
}

function runSurvivalCheck() {
  elements.message.textContent = "Running survival check...";

  window.setTimeout(() => {
    const result = parsePluginData(state.rawPlugins);
    state.plugins = result.plugins;
    state.errors = result.errors;
    state.scores = scorePlugins(result.plugins);
    state.hasRun = true;
    setMessage(result);
    render();
  }, 160);
}

function setPeriod(period) {
  state.period = period;
  elements.weeklyTab.classList.toggle("active", period === "weekly");
  elements.monthlyTab.classList.toggle("active", period === "monthly");
  renderLeaderboard();
}

function setMessage(result) {
  if (result.plugins.length === 0 && result.errors.length === 0) {
    elements.message.textContent = "No plugins have entered the arena yet. Load sample data to run a survival check.";
    return;
  }

  if (result.errors.length > 0) {
    elements.message.textContent = "Some plugin data could not be scored. Load sample data or check the input format.";
    return;
  }

  elements.message.textContent = state.hasRun
    ? "Survival check complete. Recommendations are ready for review."
    : "Sample plugins loaded. Run the survival check to calculate scores.";
}

function render() {
  renderMetrics();
  renderPlugins();
  renderLeaderboard();
}

function renderMetrics() {
  const counts = {
    [STATUSES.SAFE]: 0,
    [STATUSES.REMINDER_RECOMMENDED]: 0,
    [STATUSES.DELETION_RECOMMENDED]: 0
  };

  state.scores.forEach((score) => {
    counts[score.status] += 1;
  });

  elements.total.textContent = String(state.plugins.length);
  elements.safe.textContent = String(counts[STATUSES.SAFE]);
  elements.reminder.textContent = String(counts[STATUSES.REMINDER_RECOMMENDED]);
  elements.deletion.textContent = String(counts[STATUSES.DELETION_RECOMMENDED]);
}

function renderPlugins() {
  const scoreById = new Map(state.scores.map((score) => [score.pluginId, score]));
  const visiblePlugins = state.plugins.filter((plugin) => {
    if (state.filter === "ALL" || !state.hasRun) return true;
    return scoreById.get(plugin.id)?.status === state.filter;
  });

  if (visiblePlugins.length === 0) {
    elements.pluginList.innerHTML = `<div class="empty-state">No matching plugins. Load sample data or change the filter.</div>`;
    return;
  }

  elements.pluginList.innerHTML = visiblePlugins
    .map((plugin) => {
      const score = scoreById.get(plugin.id);
      const status = score?.status ?? "PENDING";
      const reasons = score?.reasons ?? ["Run Survival Check to calculate a deterministic score."];

      return `
        <article class="plugin-card ${status.toLowerCase()}">
          <div class="plugin-card-header">
            <h3>${escapeHtml(plugin.name)}</h3>
            <span class="status-pill">${formatStatus(status)}</span>
          </div>
          <dl class="plugin-stats">
            <div><dt>Weekly</dt><dd>${plugin.weeklyUses}</dd></div>
            <div><dt>Monthly</dt><dd>${plugin.monthlyUses}</dd></div>
            <div><dt>Cost</dt><dd>Estimated ${plugin.estimatedCost}</dd></div>
            <div><dt>Last used</dt><dd>${plugin.lastUsedDaysAgo} days ago</dd></div>
          </dl>
          <div class="score-row">
            <span>Survival Score</span>
            <strong>${score?.score ?? "--"}</strong>
          </div>
          <ul class="reason-list">
            ${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
          </ul>
          ${status === STATUSES.DELETION_RECOMMENDED ? `<p class="safety-copy">Review only. No deletion action exists in this MVP.</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function renderLeaderboard() {
  if (!state.hasRun || state.plugins.length === 0) {
    elements.leaderboardList.innerHTML = `<li class="empty-state">Run survival check to reveal rankings.</li>`;
    return;
  }

  const entries = buildLeaderboard(state.plugins, state.scores, state.period).slice(0, 5);
  elements.leaderboardList.innerHTML = entries
    .map(
      (entry) => `
        <li>
          <span class="rank">#${entry.rank}</span>
          <span>${escapeHtml(entry.pluginName)}</span>
          <strong>${entry.score}</strong>
          <small>${formatBadge(entry.badge)}</small>
        </li>
      `
    )
    .join("");
}

function formatStatus(status) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function formatBadge(badge) {
  return badge
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
