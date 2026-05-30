# SPEC/DATA_MODEL.md — Coqid-game CLI Data Model

## 0. Purpose

Define local data structures used by Coqid-game.

---

## 1. Persistence Decision

```txt
Persistent data required: NO for MVP
Storage strategy: local JSON input file + in-memory computed results
Database required: NO
Browser localStorage: NO
```

Reason:

```txt
The CLI MVP can prove value by reading deterministic local fixture data and printing computed recommendations.
```

---

## 2. Storage Strategy

```txt
[x] Local JSON file
[x] In-memory computed state
[ ] Browser localStorage
[ ] Database
[ ] External API
```

---

## 3. Entities

### ENT-001: PluginUsageRecord

Purpose:

```txt
Represents one Codex plugin/skill and its local usage/cost signals.
```

Type definition:

```ts
type PluginUsageRecord = {
  id: string;
  name: string;
  category?: string;
  weeklyUses: number;
  monthlyUses: number;
  estimatedCost: number;
  lastUsedDaysAgo: number;
  usefulnessSignal: number;
};
```

Validation:

```txt
id and name must be non-empty strings.
weeklyUses, monthlyUses, estimatedCost, lastUsedDaysAgo must be numbers >= 0.
usefulnessSignal must be between 0 and 1.
```

---

### ENT-002: SurvivalResult

Purpose:

```txt
Represents computed score and recommendation for one plugin.
```

Type definition:

```ts
type SurvivalResult = {
  id: string;
  name: string;
  survivalScore: number;
  status: "SAFE" | "WATCH" | "REMIND" | "DELETE_RECOMMENDED";
  reason: string;
};
```

Validation:

```txt
survivalScore must be between 0 and 100.
status must be one of the allowed values.
reason must be non-empty.
```

---

### ENT-003: LeaderboardEntry

Purpose:

```txt
Represents a weekly or monthly ranking row.
```

Type definition:

```ts
type LeaderboardEntry = {
  rank: number;
  pluginId: string;
  name: string;
  period: "weekly" | "monthly";
  usageCount: number;
  survivalScore: number;
  status: "SAFE" | "WATCH" | "REMIND" | "DELETE_RECOMMENDED";
};
```

---

## 4. Input Data

| Input ID | Name | Type | Required? | Validation |
|---|---|---|---:|---|
| INPUT-001 | data file path | string | YES | file exists |
| INPUT-002 | plugin usage JSON | object | YES | schema valid |
| INPUT-003 | period | weekly/monthly | leaderboard only | allowed value |
| INPUT-004 | format | table/json | NO | allowed value |

---

## 5. Output Data

| Output ID | Name | Type | Required? | Source |
|---|---|---|---:|---|
| OUTPUT-001 | survival report | table/json | YES | scoring engine |
| OUTPUT-002 | deletion recommendations | table/json | YES | recommendation engine |
| OUTPUT-003 | reminder candidates | table/json | YES | recommendation engine |
| OUTPUT-004 | leaderboard | table/json | YES | leaderboard engine |
| OUTPUT-005 | controlled error | text/json | YES for failures | validator/errors |

---

## 6. Demo Fixture

Recommended fixture path:

```txt
fixtures/plugins.json
```

Minimum fixture must include:

```txt
- at least 1 SAFE plugin
- at least 1 WATCH plugin
- at least 1 REMIND plugin
- at least 1 DELETE_RECOMMENDED plugin
```

---

## 7. Reset Behavior

```txt
Demo reset: NOT_REQUIRED
Reason: CLI reads immutable fixture data and computes results in memory.
```

Test reset:

```txt
Tests use read-only fixtures.
No persistent state remains after test execution.
```

---

## 8. Data Risks

| Risk | Mitigation |
|---|---|
| malformed JSON crashes CLI | schema validation + controlled error |
| estimatedCost misunderstood as real billing | label as estimated cost |
| missing plugin fields | schema error with non-zero exit |
| delete recommendation confused with actual delete | output copy must say recommendation only |
