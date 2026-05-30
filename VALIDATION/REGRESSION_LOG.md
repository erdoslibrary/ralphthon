# VALIDATION/REGRESSION_LOG.md

## 0. Purpose

Track regression tests so once a bug is fixed, it does not silently return.

A failure is not fully resolved until a regression test exists and passes, an existing test covers it, or Validator accepts the risk.

## 1. Status

```txt
Document status: FINAL
Total regression items: 4
Validator decision: PASS
```

## 2. Regression Rules

Critical or High fixed failures need regression protection. Regression tests must be mapped to original failure, related AC, test file/step, command, and evidence.

## 3. Regression Status Values

```txt
NOT_REQUIRED
PLANNED
WRITTEN
VALIDATING
PASS
FAIL
BLOCKED
ACCEPTED_RISK
```

## 4. Regression Table

| Regression ID | Original Failure | Severity | Related AC | Test/Method | Command | Status | Evidence |
|---|---|---|---|---|---|---|---|
| REG-001 | Prevent destructive behavior | Critical | AC-008 | Static inspection + CLI delete rejection | `npm test` | PASS | VALIDATION_REPORT.md V-001 |
| REG-002 | Preserve invalid data handling | High | AC-007 | CLI invalid/malformed/missing/empty tests | `npm test` | PASS | VALIDATION_REPORT.md V-001 |
| REG-003 | Preserve deterministic scoring | High | AC-003 | Unit deterministic scoring test | `npm test` | PASS | VALIDATION_REPORT.md V-001 |
| REG-004 | Preserve demo path | High | AC-009 | Smoke rehearsal | `npm run smoke` | PASS | VALIDATION_REPORT.md V-003/V-004 |

## 5. Regression Item Template

```md
## REG-XXX: [Regression title]

### Status
NOT_REQUIRED / PLANNED / WRITTEN / VALIDATING / PASS / FAIL / BLOCKED / ACCEPTED_RISK

### Original Failure
F-XXX

### Related Acceptance Criteria
AC-XXX

### Why This Regression Exists
...

### Failure That Must Not Return
...

### Regression Strategy
NEW_UNIT_TEST / NEW_INTEGRATION_TEST / NEW_E2E_TEST / NEW_SMOKE_TEST / EXISTING_TEST_COVERAGE / MANUAL_DEMO_VALIDATION / STATIC_INSPECTION / ACCEPTED_RISK

### Test File or Validation Step
...

### Command
```bash
...
```

### Expected Result
...

### Evidence Location
VALIDATION/VALIDATION_REPORT.md V-XXX
```

## 6. Final Regression Review

```txt
[x] All Critical fixed failures have regression protection
[x] All High fixed failures have regression protection or accepted risk
[x] No Critical/High regression item is FAIL
[x] Regression evidence is recorded
[x] TEST_MAPPING.md is updated
[x] FAILED_CASES.md closure status is consistent
```
