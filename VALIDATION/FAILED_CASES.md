# VALIDATION/FAILED_CASES.md

## 0. Purpose

Track all failed validation cases to prevent repeated failures and false success.

A failure is resolved only when Validator confirms the fix with evidence.

## 1. Status

```txt
Document status: DRAFT
Open failures: 0
Critical failures: 0
Repeated failures: 0
Validator decision: PASS_NO_OPEN_FAILURES
```

## 2. Rules

Every failed validation must be recorded. Do not retry blindly. Same failure retry limit is 2. Critical failures block new feature work. Fixed Critical/High failures require regression protection.

## 3. Severity Values

```txt
Critical: Blocks final demo/build/run/P0 AC/autonomous execution
High: Major behavior broken but fallback may exist
Medium: Non-core behavior broken
Low: Minor polish/docs issue
```

## 4. Active Failed Cases

| Failure ID | Title | Severity | Source Type | Related AC | Related Test | Status | Retry Count |
|---|---|---|---|---|---|---|---|
| F-XXX | TBD | TBD | TBD | TBD | TBD | OPEN | 0 |

## 5. Failure Template

```md
## F-XXX: [Failure title]

### Status
OPEN / REPRODUCED / DIAGNOSING / FIX_IN_PROGRESS / FIXED_PENDING_VALIDATION / CLOSED / ACCEPTED_RISK / WONT_FIX

### Severity
Critical / High / Medium / Low

### Source Type
UNIT_TEST / INTEGRATION_TEST / E2E_TEST / SMOKE_TEST / BUILD_CHECK / INSTALL_CHECK / RUN_CHECK / MANUAL_DEMO / STATIC_INSPECTION / ACCEPTANCE_CRITERION / DEPLOYMENT / AI_OUTPUT / EXTERNAL_API / DOCS / UNKNOWN

### Related Acceptance Criteria
AC-XXX

### Summary
...

### Expected Behavior
...

### Actual Behavior
...

### Reproduction Command
```bash
...
```

### Failure Output / Evidence
```txt
...
```

### Root Cause
...

### Fix Plan
1.
2.
3.

### Regression Test Required
YES / NO

### Validator Decision
PASS / FAIL / BLOCKED / ACCEPTED_RISK / NOT_RUN
```

## 6. Closure Checklist

```txt
[ ] Failure reproduced or evidence sufficient
[ ] Root cause identified or isolated
[ ] Fix implemented
[ ] Regression test added or exception documented
[ ] Targeted validation passes
[ ] Related AC passes if applicable
[ ] VALIDATION_REPORT.md updated
[ ] STATUS.md updated
[ ] Validator PASS
```
