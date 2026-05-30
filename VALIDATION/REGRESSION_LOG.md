# VALIDATION/REGRESSION_LOG.md

## 0. Purpose

Track regression tests so once a bug is fixed, it does not silently return.

A failure is not fully resolved until a regression test exists and passes, an existing test covers it, or Validator accepts the risk.

## 1. Status

```txt
Document status: DRAFT
Total regression items: 0
Validator decision: NOT_RUN
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
| REG-XXX | F-XXX | TBD | AC-XXX | TBD | TBD | PLANNED | VALIDATION_REPORT.md |

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
[ ] All Critical fixed failures have regression protection
[ ] All High fixed failures have regression protection or accepted risk
[ ] No Critical/High regression item is FAIL
[ ] Regression evidence is recorded
[ ] TEST_MAPPING.md is updated
[ ] FAILED_CASES.md closure status is consistent
```
