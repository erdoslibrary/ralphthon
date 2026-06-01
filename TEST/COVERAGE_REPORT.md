# TEST/COVERAGE_REPORT.md — Coqid-game CLI

## 0. Purpose

Track whether the important CLI behaviors are actually validated.

---

## 1. Coverage Summary

```txt
Acceptance Criteria Coverage: PASS
Core CLI Demo Coverage: PASS
Failure Case Coverage: PASS
No-deletion Safety Coverage: PASS
Regression Coverage: PASS
Raw Line Coverage: NOT_MEASURED
```

---

## 2. Required Behavior Coverage

| Area | Required? | Test | Status |
|---|---:|---|---|
| CLI help output | YES | TEST-001 | PASS |
| Valid analyze command | YES | TEST-002 | PASS |
| Deterministic scoring | YES | TEST-003 | PASS |
| Delete recommendation logic | YES | TEST-004 | PASS |
| Reminder logic | YES | TEST-005 | PASS |
| Weekly leaderboard | YES | TEST-006 | PASS |
| Monthly leaderboard | YES | TEST-007 | PASS |
| Missing file error | YES | TEST-008 | PASS |
| Invalid JSON/schema error | YES | TEST-009 | PASS |
| No actual deletion | YES | TEST-010 | PASS |
| Under-2-minute demo | YES | TEST-011 | PASS |
| Package excludes local runtime state | YES | PACK-001 | PASS |
| Interactive rank details and quit flow | YES | TEST-012 | PASS |
| `coquid-game` typo-safe alias | YES | TEST-013 | PASS |

---

## 3. Critical Coverage Gaps

| Gap ID | Gap | Severity | Required Action |
|---|---|---|---|
| CG-001 | Runtime/test command not selected yet | High | CLOSED: Node.js/npm documented |
| CG-002 | No-deletion safety not validated yet | Critical | CLOSED: `tests/noDeletion.test.js` PASS |
| CG-003 | Fixture data not created yet | High | CLOSED: fixtures created |

---

## 4. Final Coverage Gate

```txt
[x] AC-001 through AC-009 covered
[x] invalid input covered
[x] no-deletion safety covered
[x] demo flow covered
[x] build/run covered or not applicable
[x] no critical coverage gap remains
```
