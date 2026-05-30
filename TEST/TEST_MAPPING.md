# TEST/TEST_MAPPING.md — Coqid-game

## 0. Purpose

Map Coqid-game acceptance criteria to concrete tests or validation steps.

---

## 1. Mapping Table

| AC | Behavior | Test ID | Type | Status |
|---|---|---|---|---|
| AC-001 | dashboard loads with plugin data | TEST-001 | smoke/integration | PASS_INITIAL |
| AC-002 | deterministic scoring | TEST-002 | unit | PASS |
| AC-003 | low-value plugin deletion recommended | TEST-003 | unit/integration | PASS |
| AC-004 | forgotten useful plugin reminder recommended | TEST-004 | unit/integration | PASS |
| AC-005 | high-value plugin safe | TEST-005 | unit | PASS |
| AC-006 | weekly leaderboard sorted | TEST-006 | unit/integration | PASS |
| AC-007 | monthly leaderboard sorted | TEST-007 | unit/integration | PASS |
| AC-008 | empty data safe state | TEST-008 | integration/smoke | PASS |
| AC-009 | malformed data safe fallback | TEST-009 | unit/integration | PASS |
| AC-010 | no actual deletion | TEST-010 / TEST-013 | static/integration/browser | PASS |
| AC-011 | demo under 2 minutes | TEST-011 | browser rehearsal | PASS_LOCAL |
| AC-012 | app runs without live Codex API | TEST-012 | smoke | PASS_INITIAL |
| UI-001 | plugin info panels visible | TEST-014 | unit/smoke/browser | PASS |
| UI-002 | global arena plugin URLs visible | TEST-015 | unit/smoke/browser | PASS |
| UI-003 | dalgona reminder copy visible | TEST-016 | unit/smoke/browser | PASS |
| UI-004 | expanded leaderboard badges visible | TEST-017 | unit/smoke/browser | PASS |

---

## 2. Proposed Test Files

```txt
tests/scoring.test.js
tests/leaderboard.test.js
tests/validation.test.js
tests/noDeletion.test.js
scripts/smoke.mjs
```

---

## 3. Commands

```bash
npm test
npm run build
npm run dev
npm run smoke
```
