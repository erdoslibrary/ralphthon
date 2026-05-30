# SPEC/API_CONTRACT.md — Coqid-game

## 0. API Decision

API required for MVP:

```txt
NO
```

Reason:
Coqid-game can demonstrate the full MVP using mock/local plugin usage data. Real Codex plugin usage APIs, token/coin metrics, and cross-user leaderboard sync are out of MVP scope.

---

## 1. No-API Declaration

Data flow:

```txt
Sample plugin data
  -> validation
  -> scoring engine
  -> status classifier
  -> leaderboard builder
  -> dashboard UI
```

No backend endpoint is required for the MVP.

---

## 2. Internal Function Contracts

### FUNC-001: calculateSurvivalScore

Signature:

```ts
calculateSurvivalScore(plugin: PluginUsage): SurvivalScore
```

Input:

```ts
type PluginUsage = {
  id: string;
  name: string;
  weeklyUses: number;
  monthlyUses: number;
  estimatedCost: "low" | "medium" | "high";
  lastUsedDaysAgo: number;
  userRating?: number;
  description?: string;
  url?: string;
};
```

Output:

```ts
type SurvivalScore = {
  pluginId: string;
  score: number;
  status: "SAFE" | "REMINDER_RECOMMENDED" | "DELETION_RECOMMENDED";
  reasons: string[];
};
```

Validation:
- score must be between 0 and 100
- same input must return same output
- invalid values must be rejected or normalized safely
- optional URL values must be limited to http/https

---

### FUNC-002: classifyPluginStatus

Signature:

```ts
classifyPluginStatus(score: number): PluginStatus
```

Rules:

```txt
score >= 70 -> SAFE
40 <= score < 70 -> REMINDER_RECOMMENDED
score < 40 -> DELETION_RECOMMENDED
```

---

### FUNC-003: buildLeaderboard

Signature:

```ts
buildLeaderboard(scores: SurvivalScore[], period: "weekly" | "monthly"): LeaderboardEntry[]
```

Output must be sorted by descending rank score.

---

## 3. Mock Data Contract

Mock data location:

```txt
src/data/samplePlugins.js
```

Required shape:

```json
{
  "id": "plugin-001",
  "name": "Example Plugin",
  "weeklyUses": 12,
  "monthlyUses": 48,
  "estimatedCost": "medium",
  "lastUsedDaysAgo": 3,
  "userRating": 4,
  "description": "Explains what the plugin does in the local demo.",
  "url": "https://example.com/coqid-game/plugins/example-plugin"
}
```

---

## 4. Future API Contracts

Future, not MVP:

| Contract | Purpose | Status |
|---|---|---|
| GET /api/plugins | load real installed plugins | BACKLOG |
| GET /api/usage | load plugin usage telemetry | BACKLOG |
| POST /api/leaderboard | submit anonymous ranking data | BACKLOG |
| DELETE /api/plugins/:id | delete plugin | REJECTED_FOR_MVP |

---

## 5. Critical Constraint

There must be no MVP API contract that deletes, uninstalls, disables, or modifies real plugins.
