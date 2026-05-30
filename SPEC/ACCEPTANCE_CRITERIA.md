# SPEC/ACCEPTANCE_CRITERIA.md — Coqid-game CLI

## 0. Purpose

Acceptance criteria define what must pass before Coqid-game can be considered complete.

A feature is not complete because the agent says it is complete. It is complete only when these criteria are validated.

---

## 1. Core Acceptance Criteria

### AC-001: CLI entry point works

```txt
Priority: P0
Related PRD Requirement: FR-001, NFR-001
Given Coqid-game is installed or runnable locally
When the user runs `coqid-game --help`
Then the CLI prints available commands and exits successfully.
Validation: CLI smoke test
Status: PASS
```

### AC-002: Analyze command reads local plugin data

```txt
Priority: P0
Related PRD Requirement: FR-002
Given a valid local JSON fixture exists
When the user runs `coqid-game analyze --data ./fixtures/plugins.json`
Then Coqid-game reads and validates the plugin usage records.
Validation: CLI integration test
Status: PASS
```

### AC-003: Survival scores are deterministic

```txt
Priority: P0
Related PRD Requirement: FR-003, NFR-003
Given the same valid plugin usage data
When `analyze` is run multiple times
Then each plugin receives the same survival score and status each time.
Validation: Unit test for scoring engine / CLI snapshot test
Status: PASS
```

### AC-004: Low-value plugins are recommended for deletion

```txt
Priority: P0
Related PRD Requirement: FR-004
Given a plugin has low usage, stale last-used date, and poor estimated efficiency
When the analyze command runs
Then the plugin is marked `DELETE_RECOMMENDED` with a human-readable reason.
Validation: Unit test + CLI integration test
Status: PASS
```

### AC-005: Forgotten but useful plugins are reminder candidates

```txt
Priority: P0
Related PRD Requirement: FR-005
Given a plugin has historically useful signals but low recent usage
When the analyze command runs
Then the plugin is marked `REMIND` instead of `DELETE_RECOMMENDED`.
Validation: Unit test + CLI integration test
Status: PASS
```

### AC-006: Weekly and monthly leaderboard commands work

```txt
Priority: P0
Related PRD Requirement: FR-006
Given valid plugin usage data exists
When the user runs `coqid-game leaderboard --period weekly` or `--period monthly`
Then Coqid-game prints a sorted leaderboard with rank, plugin name, score, and status.
Validation: CLI integration test
Status: PASS
```

### AC-007: Invalid or missing data is handled safely

```txt
Priority: P0
Related PRD Requirement: FR-007, NFR-005
Given the input file is missing, empty, malformed, or invalid
When the user runs analyze or leaderboard
Then Coqid-game prints a controlled error message, exits non-zero, and does not crash.
Validation: CLI error-path tests
Status: PASS
```

### AC-008: Coqid-game never deletes plugins in MVP

```txt
Priority: P0
Related PRD Requirement: FR-008
Given a plugin is marked `DELETE_RECOMMENDED`
When the analyze command completes
Then no plugin file, config, or installation is deleted or modified.
Validation: Static inspection + integration test using fixture directory
Status: PASS
```

### AC-009: Demo completes in under 2 minutes

```txt
Priority: P0
Related PRD Requirement: NFR-002
Given the project is installed and fixture data exists
When the presenter follows docs/DEMO_SCRIPT.md
Then the CLI demo shows help, analysis, deletion recommendations, leaderboard, and error handling in under 2 minutes.
Validation: Manual demo rehearsal
Status: PASS
```

---

## 2. Negative Acceptance Criteria

```txt
NAC-001: Coqid-game must not execute any actual plugin deletion in MVP.
NAC-002: Coqid-game must not require a web server for the MVP demo.
NAC-003: Coqid-game must not require live Codex usage API access for MVP.
NAC-004: Coqid-game must not silently ignore invalid input.
```

---

## 3. Completion Gate

```txt
[x] AC-001 PASS
[x] AC-002 PASS
[x] AC-003 PASS
[x] AC-004 PASS
[x] AC-005 PASS
[x] AC-006 PASS
[x] AC-007 PASS
[x] AC-008 PASS
[x] AC-009 PASS
```
