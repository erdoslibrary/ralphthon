# SPEC/DATA_MODEL.md — Coqid-game

## 0. Data Decision

Persistent data required for MVP:

```txt
NO, optional localStorage only
```

Reason:
The core demo can run using bundled sample plugin data.

---

## 1. Storage Strategy

MVP storage:

```txt
Bundled mock data + runtime state
```

Optional:

```txt
localStorage for user-selected filter or demo state
```

No cloud database is required.

---

## 2. Entity Summary

| Entity | Required? | Purpose |
|---|---|---|
| PluginUsage | YES | raw usage/cost/recent activity data |
| SurvivalScore | YES | calculated score and recommendation |
| LeaderboardEntry | YES | weekly/monthly ranking row |
| UserAnonymousProfile | NO/P1 | future cross-user leaderboard |

---

## 3. PluginUsage

```ts
type PluginUsage = {
  id: string;
  name: string;
  weeklyUses: number;
  monthlyUses: number;
  estimatedCost: "low" | "medium" | "high";
  lastUsedDaysAgo: number;
  userRating?: number;
};
```

Validation:
- id is required
- name is required
- weeklyUses >= 0
- monthlyUses >= 0
- estimatedCost is low/medium/high
- lastUsedDaysAgo >= 0
- userRating, if present, must be 1-5

---

## 4. SurvivalScore

```ts
type SurvivalScore = {
  pluginId: string;
  score: number;
  status: "SAFE" | "REMINDER_RECOMMENDED" | "DELETION_RECOMMENDED";
  reasons: string[];
};
```

Rules:
- score must be 0-100
- status must match score threshold
- reasons must explain the recommendation

Status threshold:

```txt
SAFE: score >= 70
REMINDER_RECOMMENDED: 40 <= score < 70
DELETION_RECOMMENDED: score < 40
```

---

## 5. LeaderboardEntry

```ts
type LeaderboardEntry = {
  pluginId: string;
  pluginName: string;
  rank: number;
  period: "weekly" | "monthly";
  score: number;
  badge: "MOST_USED" | "MOST_EFFICIENT" | "MOST_ENDANGERED";
};
```

Rules:
- rank starts at 1
- rows are sorted by score descending unless showing most endangered
- period must be weekly or monthly

---

## 6. Empty Data Behavior

If no plugin data exists:

```txt
Show empty state:
"No plugins have entered the arena yet. Load sample data to run a survival check."
```

The app must not crash.

---

## 7. Malformed Data Behavior

If plugin data is malformed:

```txt
Reject invalid row or show fallback error state.
Do not crash.
Do not produce fake deletion recommendation from invalid data.
```

---

## 8. Demo Data

Demo data required:
YES

Demo data source:
Bundled sample data.

Must include examples of:
- SAFE plugin
- REMINDER_RECOMMENDED plugin
- DELETION_RECOMMENDED plugin
- high-cost low-use plugin
- leaderboard winner

---

## 9. Reset Behavior

Demo reset:
Refresh page or reload bundled sample data.

Test reset:
Use deterministic fixtures.
