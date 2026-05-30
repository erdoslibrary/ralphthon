# SPEC/ACCEPTANCE_CRITERIA.md — Coqid-game

## 0. Purpose

This file defines testable completion criteria for Coqid-game.

A feature is complete only when the related acceptance criteria pass validation.

---

## AC-001: Dashboard loads with plugin data

Priority: P0
Related requirement: FR-001

Given sample plugin usage data exists  
When the user opens Coqid-game  
Then the dashboard shows a list of plugins with name, usage count, estimated cost, last used date, survival score placeholder or status area.

Validation:
Smoke / integration test

---

## AC-002: Survival score is calculated deterministically

Priority: P0
Related requirement: FR-002

Given the same plugin usage data  
When the scoring engine runs multiple times  
Then each plugin receives the same survival score every time.

Validation:
Unit test

---

## AC-003: Low-value plugins are deletion recommended

Priority: P0
Related requirement: FR-003

Given a plugin has low usage, high estimated cost, and old last-used date  
When survival scoring runs  
Then the plugin is marked as `DELETION_RECOMMENDED`.

Validation:
Unit / integration test

---

## AC-004: Useful but forgotten plugins are reminder recommended

Priority: P0
Related requirement: FR-004

Given a plugin has useful historical usage but has not been used recently  
When survival scoring runs  
Then the plugin is marked as `REMINDER_RECOMMENDED`.

Validation:
Unit / integration test

---

## AC-005: High-value plugins are safe

Priority: P0
Related requirement: FR-002

Given a plugin has high usage, low estimated cost, and recent activity  
When survival scoring runs  
Then the plugin is marked as `SAFE`.

Validation:
Unit test

---

## AC-006: Weekly leaderboard is sorted correctly

Priority: P0
Related requirement: FR-005

Given multiple plugins have weekly score values  
When the weekly leaderboard is shown  
Then plugins are displayed in descending rank order.

Validation:
Unit / integration test

---

## AC-007: Monthly leaderboard is sorted correctly

Priority: P0
Related requirement: FR-005

Given multiple plugins have monthly score values  
When the monthly leaderboard is shown  
Then plugins are displayed in descending rank order.

Validation:
Unit / integration test

---

## AC-008: Empty plugin data shows safe empty state

Priority: P0
Related requirement: FR-006

Given no plugin data exists  
When the user opens Coqid-game  
Then the app shows a clear empty state and does not crash.

Validation:
Integration / smoke test

---

## AC-009: Malformed plugin data is handled safely

Priority: P0
Related requirement: FR-007

Given plugin data is missing required fields or contains invalid values  
When the app attempts to parse it  
Then the app shows a controlled fallback/error state and does not crash.

Validation:
Unit / integration test

---

## AC-010: Coqid-game never deletes plugins automatically

Priority: P0
Related requirement: FR-008

Given a plugin is marked as Deletion Recommended  
When the user views the recommendation  
Then the app only recommends review/deletion and does not delete, uninstall, disable, or modify the plugin.

Validation:
Static inspection / integration test

---

## AC-011: Demo completes under 2 minutes

Priority: P0
Related requirement: NFR-002

Given the app is running locally  
When the presenter follows docs/DEMO_SCRIPT.md  
Then the core value is demonstrated in under 2 minutes.

Validation:
Manual rehearsal

---

## AC-012: App runs without live Codex API

Priority: P0
Related requirement: NFR-005

Given no live Codex usage API is available  
When the app starts  
Then the product still works using mock/local sample data.

Validation:
Smoke test

---

## Negative Acceptance Criteria

### NAC-001: No destructive deletion

The app must not perform real plugin deletion in MVP.

### NAC-002: No unsupported exact cost claim

The app must label plugin cost as estimated unless a real validated cost source exists.

### NAC-003: No live API dependency for demo

The final demo must not require live Codex telemetry.
