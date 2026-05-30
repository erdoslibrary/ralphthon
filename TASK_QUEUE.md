# TASK_QUEUE.md — Coqid-game CLI

## 0. Purpose

Task sequencing for the CLI-first Coqid-game MVP.

---

## 1. Active Task Queue

| Task ID | Title | Owner | Phase | Status | Related AC | Validation |
|---|---|---|---|---|---|---|
| T-001 | Select CLI runtime and package manager | Coordinator | PHASE_0 | DONE | AC-001 | Node.js/npm documented in DEPLOYMENT.md |
| T-002 | Create CLI project skeleton | Builder | PHASE_6 | DONE | AC-001 | `npm run smoke` PASS |
| T-003 | Create fixture data files | Builder/Test Engineer | PHASE_6 | DONE | AC-002 | `fixtures/plugins.json`, `invalid.json`, `empty.json` |
| T-004 | Implement data loader and schema validator | Builder | PHASE_6 | DONE | AC-002/AC-007 | `npm test` PASS |
| T-005 | Implement survival scoring engine | Builder | PHASE_6 | DONE | AC-003 | `tests/scoring.test.js` PASS |
| T-006 | Implement recommendation engine | Builder | PHASE_6 | DONE | AC-004/AC-005 | `tests/scoring.test.js`, `tests/cli.test.js` PASS |
| T-007 | Implement leaderboard engine | Builder | PHASE_6 | DONE | AC-006 | `tests/scoring.test.js`, `tests/cli.test.js` PASS |
| T-008 | Implement analyze CLI command | Builder | PHASE_6 | DONE | AC-002~AC-005 | `tests/cli.test.js` PASS |
| T-009 | Implement leaderboard CLI command | Builder | PHASE_6 | DONE | AC-006 | weekly/monthly CLI tests PASS |
| T-010 | Implement controlled error handling | Builder | PHASE_6 | DONE | AC-007 | invalid/missing/empty data tests PASS |
| T-011 | Add no-deletion safety inspection | Test Engineer | PHASE_7 | DONE | AC-008 | `tests/noDeletion.test.js` PASS |
| T-012 | Run demo rehearsal | Packager | PHASE_8 | DONE | AC-009 | `npm run smoke` under 2 minutes |
| T-FINAL | Final validation | Validator | PHASE_9 | DONE | All P0 | FINAL_CHECKLIST.md PASS |

---

## 2. Forbidden Tasks for MVP

```txt
- implement web dashboard
- implement actual plugin deletion
- implement user authentication
- implement live Codex API sync
- implement cloud leaderboard backend
```

---

## 3. Implementation Rule

```txt
No task can be marked DONE until Validator records PASS evidence in VALIDATION/VALIDATION_REPORT.md.
```
