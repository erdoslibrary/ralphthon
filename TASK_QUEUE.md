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
| T-010 | Write demo script | Packager | VALIDATED | T-005 | browser rehearsal |
| T-011 | Document run/test/build commands | Packager | VALIDATED | repo setup | npm run smoke |
| T-012 | Final validation | Validator | VALIDATED_LOCAL_MVP | all P0 tasks | validation report V-005 |
| T-013 | Coordinate `back` branch integration proposal | Coordinator | TODO | API_CONTRACT.md | document review before merge |
| T-014 | Add review-only actions for deletion recommendations | Builder | VALIDATED | T-007,UI_STATES.md | npm test / npm run build / npm run smoke / browser rehearsal |
| T-015 | Apply survival-game visual theme and separate personal/global views | Builder | VALIDATED | T-005,T-009,UI_STATES.md | npm test / npm run build / npm run smoke / browser rehearsal V-006 |

---

## 2. Rules

- Do not implement actual deletion.
- Do not require real Codex API.
- Do not add auth/backend unless explicitly moved out of MVP.
- Stop feature work when P0 dashboard + scoring + recommendation + leaderboard work.
