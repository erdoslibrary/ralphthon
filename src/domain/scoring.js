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
    reasons.push("탈락 선언: 이 플러그인은 삭제 검토 대상입니다. 실제 삭제는 수동으로만 가능합니다.");
    reasons.push(`최종 생존 점수: ${score}점 - 기준(40점) 미달`);
  }
  if (status === STATUSES.SAFE && reasons.length === 0) reasons.push("Balanced usage and cost signals");
  if (status === STATUSES.REMINDER_RECOMMENDED) {
    reasons.push(getDalgonaMissionMessage(score));
  }

  reasons.push(`Deterministic survival score: ${score}`);
  return reasons;
}

function getDalgonaMissionMessage(score) {
  if (score < 50) return "달고나를 완성하세요: 한 번만 더 호출하면 Safe 등급으로 복귀합니다.";
  if (score < 60) return "생존 경고: 활동 신호가 미약합니다. 이번 주가 마지막 기회일 수 있습니다.";
  if (score < 65) return "심사위원 주목: 이 플러그인은 한 번 더 기회가 있습니다.";
  return "달고나 미션 발동: 7일 내 재사용하지 않으면 다음 라운드에서 탈락합니다.";
}
