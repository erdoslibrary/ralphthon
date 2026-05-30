# TASK_QUEUE.md — Coqid-game

## 0. Current Phase

Current phase: INITIAL_VALIDATION_PASSED_WITH_MOCK_DATA

Implementation gate: OPEN_WITH_MOCK_DATA

---

## 1. Task Queue

| ID | Task | Owner | Status | Depends On | Validation |
|---|---|---|---|---|---|
| T-001 | Create mock plugin usage data | Builder | VALIDATED | DATA_MODEL.md | npm test / npm run smoke |
| T-002 | Implement scoring engine | Builder | VALIDATED | T-001 | npm test |
| T-003 | Implement status classifier | Builder | VALIDATED | T-002 | npm test |
| T-004 | Implement leaderboard builder | Builder | VALIDATED | T-002 | npm test |
| T-005 | Build dashboard UI | Builder | VALIDATED | T-001,T-002,T-003 | npm run build / npm run smoke |
| T-006 | Add empty/malformed data fallback | Builder | VALIDATED | T-001 | npm test |
| T-007 | Add deletion recommendation UI only | Builder | VALIDATED | T-003 | npm test / npm run smoke |
| T-008 | Add reminder recommendation UI | Builder | VALIDATED | T-003 | npm test |
| T-009 | Add weekly/monthly leaderboard UI | Builder | VALIDATED | T-004 | npm test |
| T-010 | Write demo script | Packager | TODO | T-005 | manual rehearsal |
| T-011 | Document run/test/build commands | Packager | IN_PROGRESS | repo setup | smoke validation |
| T-012 | Final validation | Validator | TODO | all P0 tasks | validation report |
| T-013 | Coordinate `back` branch integration proposal | Coordinator | TODO | API_CONTRACT.md | document review before merge |

---

## 2. Rules

- Do not implement actual deletion.
- Do not require real Codex API.
- Do not add auth/backend unless explicitly moved out of MVP.
- Stop feature work when P0 dashboard + scoring + recommendation + leaderboard work.
