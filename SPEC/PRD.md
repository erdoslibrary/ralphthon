# SPEC/PRD.md — Coqid-game CLI

## 0. Purpose

This PRD converts the Coqid-game idea into clear, testable, implementation-ready requirements.

---

## 1. PRD Status

```txt
PRD status: FINAL
Source product idea: PRODUCT_IDEA.md
Product name: Coqid-game
Product type: CLI tool / Codex plugin assistant
Frozen: YES
```

---

## 2. Product Summary

```txt
Coqid-game is a CLI-based Codex plugin/skill survival ranking assistant.
It helps Codex users identify low-value installed plugins/skills and recommends deletion candidates without actually deleting anything.
```

Target user:

```txt
Codex users who have installed many plugins/skills and want to know which ones are useful, forgotten, inefficient, or safe to remove.
```

Core value proposition:

```txt
A fast terminal command converts local plugin usage data into clear survival scores, deletion recommendations, reminder candidates, and weekly/monthly rankings.
```

---

## 3. MVP Product Type

```txt
Primary interface: CLI
Web UI: OUT_OF_SCOPE
Backend API: OUT_OF_SCOPE for MVP
Persistence: local JSON input only for MVP
Authentication: OUT_OF_SCOPE
Real deletion: OUT_OF_SCOPE
```

---

## 4. Problem Definition

The user struggles with:

```txt
- too many installed Codex plugins/skills
- unclear usage value
- unclear cost efficiency
- forgotten but potentially useful plugins
- no simple ranking of what to keep or remove
```

Why this matters:

```txt
Plugin clutter increases cognitive load and may increase wasted model/API/tool usage.
```

Current alternative:

```txt
Manual inspection of installed plugins/skills and subjective guessing.
```

Weakness:

```txt
Manual inspection has no scoring, no leaderboard, no reminder logic, and no consistent deletion recommendation criteria.
```

---

## 5. Goals and Non-goals

### Goals

```txt
G-001: Provide a CLI command that analyzes plugin/skill usage data.
G-002: Calculate survival scores deterministically.
G-003: Recommend deletion candidates without deleting anything.
G-004: Recommend reminder candidates for forgotten but useful plugins.
G-005: Show weekly/monthly leaderboard output.
G-006: Handle invalid/missing data safely.
```

### Non-goals

```txt
NG-001: Actually deleting plugins/skills.
NG-002: Web dashboard.
NG-003: Real Codex usage API integration.
NG-004: Real billing/token attribution.
NG-005: User accounts or authentication.
NG-006: Public multi-user backend ranking.
```

---

## 6. Functional Requirements

| ID | Requirement | Priority | Test Required |
|---|---|---:|---|
| FR-001 | CLI exposes help output with available commands | P0 | YES |
| FR-002 | `analyze` reads local JSON plugin usage data | P0 | YES |
| FR-003 | `analyze` calculates deterministic survival scores | P0 | YES |
| FR-004 | `analyze` marks low-value plugins as `DELETE_RECOMMENDED` | P0 | YES |
| FR-005 | `analyze` marks forgotten but useful plugins as `REMIND` | P0 | YES |
| FR-006 | `leaderboard` prints weekly or monthly rankings | P0 | YES |
| FR-007 | CLI handles missing file, empty data, and invalid JSON safely | P0 | YES |
| FR-008 | CLI never deletes plugins/skills in MVP | P0 | YES |
| FR-009 | CLI supports machine-readable JSON output option | P1 | YES |
| FR-010 | CLI can show detailed reason for each recommendation | P1 | YES |

---

## 7. CLI Commands

MVP commands:

```bash
coqid-game --help
coqid-game analyze --data ./fixtures/plugins.json
coqid-game analyze --data ./fixtures/plugins.json --format json
coqid-game leaderboard --period weekly --data ./fixtures/plugins.json
coqid-game leaderboard --period monthly --data ./fixtures/plugins.json
```

No delete command in MVP.

Forbidden command for MVP:

```bash
coqid-game delete
```

---

## 8. Core User Flow

```txt
Step 1: User runs `coqid-game analyze --data ./fixtures/plugins.json`.
Step 2: Coqid-game validates the local JSON file.
Step 3: Coqid-game computes survival scores.
Step 4: Coqid-game prints a ranked table with status and reasons.
Step 5: User sees which plugins are SAFE, WATCH, REMIND, or DELETE_RECOMMENDED.
Step 6: User runs leaderboard command and sees weekly/monthly ranking.
Final result: User gets deletion recommendations and ranking without any plugin being deleted.
```

---

## 9. Non-functional Requirements

| ID | Requirement | Priority |
|---|---|---:|
| NFR-001 | CLI should run locally with documented commands | P0 |
| NFR-002 | Demo should complete in under 2 minutes | P0 |
| NFR-003 | Scoring must be deterministic for the same input | P0 |
| NFR-004 | No live external API required for MVP | P0 |
| NFR-005 | Invalid input must return controlled error and non-zero exit code | P0 |

---

## 10. Acceptance Gate

```txt
[x] CLI command exists
[x] analyze command works with fixture data
[x] deletion candidates are recommended but not deleted
[x] reminder candidates appear
[x] weekly/monthly leaderboard appears
[x] invalid data produces controlled error
[x] P0 tests are mapped
[x] demo can run in under 2 minutes
```
