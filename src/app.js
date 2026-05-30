import { malformedPlugins, samplePlugins } from "./data/samplePlugins.js";
import { buildLeaderboard } from "./domain/leaderboard.js";
import { scorePlugins, STATUSES } from "./domain/scoring.js";
import { parsePluginData } from "./domain/validation.js";

const state = {
  rawPlugins: samplePlugins,
  plugins: samplePlugins,
  errors: [],
  scores: [],
  reviewActions: {},
  infoOpen: {},
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
elements.pluginList.addEventListener("click", handleReviewAction);
elements.pluginList.addEventListener("click", handleInfoToggle);

loadData(samplePlugins, true);

function loadData(rows, preserveMessage) {
  const result = parsePluginData(rows);
  state.rawPlugins = rows;
  state.plugins = result.plugins;
  state.errors = result.errors;
  state.scores = [];
  state.reviewActions = {};
  state.infoOpen = {};
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

function handleReviewAction(event) {
  const button = event.target.closest("[data-review-action]");
  if (!button) return;

  const { pluginId, reviewAction } = button.dataset;
  state.reviewActions[pluginId] = getReviewActionLabel(reviewAction);
  renderPlugins();
}

function handleInfoToggle(event) {
  const button = event.target.closest("[data-info-toggle]");
  if (!button) return;

  const { pluginId } = button.dataset;
  state.infoOpen[pluginId] = !state.infoOpen[pluginId];
  renderPlugins();
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
      const reviewNote = state.reviewActions[plugin.id];
      const infoId = `info-${plugin.id}`;
      const isInfoOpen = Boolean(state.infoOpen[plugin.id]);

      return `
        <article class="plugin-card ${status.toLowerCase()}">
          <div class="plugin-card-header">
            <div class="plugin-title-row">
              <h3>${escapeHtml(plugin.name)}</h3>
              <button
                type="button"
                class="info-button"
                aria-label="${escapeHtml(plugin.name)} info"
                aria-expanded="${isInfoOpen}"
                aria-controls="${escapeHtml(infoId)}"
                data-plugin-id="${escapeHtml(plugin.id)}"
                data-info-toggle
              >i</button>
            </div>
            <span class="status-pill">${formatStatus(status)}</span>
          </div>
          ${renderInfoPanel(plugin, infoId, isInfoOpen)}
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
          ${status === STATUSES.DELETION_RECOMMENDED ? renderReviewOnlyActions(plugin.id, reviewNote) : ""}
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
          ${entry.pluginUrl ? `<a href="${escapeHtml(entry.pluginUrl)}" target="_blank" rel="noreferrer">Plugin URL</a>` : ""}
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

function renderReviewOnlyActions(pluginId, reviewNote) {
  return `
    <div class="review-panel">
      <p class="safety-copy">Review only. No deletion action exists in this MVP.</p>
      <div class="review-actions" aria-label="Review-only actions">
        <button type="button" class="secondary" data-plugin-id="${escapeHtml(pluginId)}" data-review-action="reviewed">Mark as Reviewed</button>
        <button type="button" class="secondary" data-plugin-id="${escapeHtml(pluginId)}" data-review-action="keep">Keep for Now</button>
        <button type="button" class="secondary" data-plugin-id="${escapeHtml(pluginId)}" data-review-action="cleanup">Add to Cleanup List</button>
      </div>
      ${reviewNote ? `<p class="review-note" aria-live="polite">${escapeHtml(reviewNote)}</p>` : ""}
    </div>
  `;
}

function renderInfoPanel(plugin, infoId, isOpen) {
  const description = plugin.description ?? "No plugin description is available for this sample row.";

  return `
    <section id="${escapeHtml(infoId)}" class="info-panel${isOpen ? " open" : ""}" ${isOpen ? "" : "hidden"}>
      <strong>Plugin intel</strong>
      <p>${escapeHtml(description)}</p>
      ${plugin.url ? `<a href="${escapeHtml(plugin.url)}" target="_blank" rel="noreferrer">Open plugin reference</a>` : ""}
    </section>
  `;
}

function getReviewActionLabel(action) {
  if (action === "reviewed") return "Marked as reviewed for manual follow-up.";
  if (action === "keep") return "Kept for now. No plugin was changed.";
  if (action === "cleanup") return "Added to local cleanup list for manual review.";
  return "Review note saved locally.";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
