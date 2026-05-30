# PRODUCT_IDEA.md — Coqid-game

## 0. Purpose

This document is the product seed for the Ralphton autonomous build.

Production code must not begin until this file is complete and reflected in the PRD, acceptance criteria, architecture, data model, CLI contract, and test mapping.

---

## 1. Product Identity

```txt
Product name: Coqid-game
Product type: CLI-based Codex plugin / skill management assistant
Primary interface: CLI
Graphical web UI: NO for MVP
Real deletion: NO for MVP
MVP action: deletion recommendation only
```

One-line idea:

```txt
Coqid-game is a CLI plugin that ranks installed Codex plugins/skills by usage and estimated cost efficiency, then recommends which low-value plugins should be deleted or remembered.
```

---

## 2. Target User

```txt
Primary user:
Codex users who install many plugins or skills and later forget which ones are actually useful.
```

User problem:

```txt
Users accumulate Codex plugins/skills, but they cannot easily tell which ones are useful, unused, expensive, or worth keeping.
```

Core value:

```txt
Coqid-game turns plugin/skill usage data into a survival-style ranking and recommends deletion candidates without deleting anything automatically.
```

---

## 3. MVP Scope

### Must-have

| ID | Must-have | Why required for demo? |
|---|---|---|
| MUST-001 | CLI command runs successfully | Proves plugin can be used without web UI |
| MUST-002 | Reads local/mock plugin usage data | Avoids dependence on unavailable Codex usage API |
| MUST-003 | Calculates survival score | Core product mechanism |
| MUST-004 | Shows deletion recommendation candidates | Main user value |
| MUST-005 | Shows reminder candidates | Helps users rediscover forgotten but useful plugins |
| MUST-006 | Shows weekly/monthly leaderboard | Preserves ranking/competition concept |
| MUST-007 | Handles missing/invalid data safely | Required for autonomous validation |

### Explicit non-goals for MVP

| ID | Out-of-scope item | Reason |
|---|---|---|
| OUT-001 | Actually deleting plugins/skills | Too risky; recommendation only |
| OUT-002 | Real Codex plugin usage API integration | API availability uncertain |
| OUT-003 | Real token/coin billing integration | Plugin-level cost attribution uncertain |
| OUT-004 | Authentication/accounts | Not needed for CLI MVP |
| OUT-005 | Web dashboard | User requested CLI-based plugin |
| OUT-006 | Public multi-user data collection | Privacy/ranking infrastructure not needed for MVP |
| OUT-007 | IP-specific Squid Game branding | Avoid public IP risk; use survival-game metaphor only |

---

## 4. Core CLI Demo Flow

The final demo must be possible in under 2 minutes.

```txt
Step 1: Run `coqid-game --help` to show CLI entry point.
Step 2: Run `coqid-game analyze --data ./fixtures/plugins.json`.
Step 3: CLI prints plugin survival scores, SAFE/WATCH/DELETE_RECOMMENDED statuses, and reasons.
Step 4: Run `coqid-game leaderboard --period weekly --data ./fixtures/plugins.json`.
Step 5: CLI prints weekly leaderboard sorted by survival score or usage.
Step 6: Run invalid/missing data case to show controlled error.
Final visible result: Terminal output clearly shows deletion recommendations, reminder candidates, and leaderboard.
```

---

## 5. Scoring Concept

```txt
Survival Score = usage frequency score + recency score + efficiency score + usefulness signal - unused penalty - high-cost low-use penalty
```

Statuses:

```txt
SAFE: high score, keep recommended
WATCH: medium score, monitor/revisit
REMIND: low recent use but useful enough to remind
DELETE_RECOMMENDED: low usage and/or poor efficiency, deletion recommended
```

Important safety rule:

```txt
Coqid-game never deletes plugins automatically.
It only prints recommendations and reasons.
```

---

## 6. Data Source Decision

```txt
Real Codex usage data required for MVP: NO
MVP data source: local JSON fixture or manually exported usage data
Fallback data: fixtures/plugins.json
```

Reason:

```txt
A CLI MVP can prove value with deterministic local data. Real Codex usage and cost integration can be backlog work.
```

---

## 7. Initial Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Real Codex usage API may not exist | High | Use local/mock JSON data for MVP |
| Plugin-level cost may be impossible to measure | High | Use estimatedCost field in fixture |
| Deletion is risky | Critical | Recommendation only, no delete command in MVP |
| Web UI drift | Medium | Architecture locked to CLI-first |
| Leaderboard privacy | Medium | Use local/sample anonymous data for MVP |

---

## 8. Completion Gate

```txt
[x] Product name selected: Coqid-game
[x] CLI-first product type selected
[x] Real deletion removed from MVP
[x] Mock/local data accepted for MVP
[x] Core demo flow defined
[x] Must-have scope exists
[x] Out-of-scope items exist
```
