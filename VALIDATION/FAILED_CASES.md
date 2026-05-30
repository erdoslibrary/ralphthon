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
| F-001 | Reminder mission test omitted valid score-band copy | Low | UNIT_TEST | AC-004 | npm test | CLOSED | 0 |
| F-002 | Worldwide case empty state text renders vertically | Low | MANUAL_DEMO | AC-006 | UI layout | CLOSED | 0 |

## F-001: Reminder mission test omitted valid score-band copy

### Status
CLOSED

### Severity
Low

### Source Type
UNIT_TEST

### Related Acceptance Criteria
AC-004

### Summary
`npm test` failed after adding score-band reminder mission copy because the test only allowed "달고나" or "생존 경고" text, while the 63-point fixture correctly returns "심사위원 주목".

### Expected Behavior
Reminder recommended plugins should return one of the approved mission/nudge messages for their score band.

### Actual Behavior
The implementation returned a valid score-band message, but the test rejected it.

### Reproduction Command
```bash
npm test
```

### Failure Output / Evidence
```txt
not ok 10 - useful but forgotten plugin becomes REMINDER_RECOMMENDED
assert.ok(score.reasons.some((reason) => reason.includes("달고나") || reason.includes("생존 경고")))
```

### Root Cause
Test expectation did not include the full approved reminder message set.

### Fix Plan
1. Update the unit test to accept any approved reminder mission copy.
2. Re-run `npm test`, `npm run build`, and `npm run smoke`.

### Regression Test Required
YES

### Validator Decision
PASS

## F-002: Worldwide case empty state text renders vertically

### Status
CLOSED

### Severity
Low

### Source Type
MANUAL_DEMO

### Related Acceptance Criteria
AC-006 (Worldwide case separation)

### Summary
The dashboard empty-state message inside the Worldwide Case/Global Arena leaderboard ("Run survival check to reveal rankings.") renders vertically (one word per line).

### Expected Behavior
The empty-state message is displayed horizontally as a normal text run, properly aligned and centered.

### Actual Behavior
Each word wraps onto a new line because the `li.empty-state` element inherits the `display: grid` style from `.leaderboard-list li`, which defines a very narrow first column of `42px`, forcing the single text node to wrap to `42px`.

### Reproduction Command
```bash
# View the initial dashboard UI in a browser before running a survival check.
```

### Failure Output / Evidence
```txt
In the Global Arena section under Worldwide Case:
"Run
survival
check
to
reveal
rankings."
```

### Root Cause
`.leaderboard-list li` has `display: grid` with `grid-template-columns: 42px minmax(0, 1fr) 56px;`. The empty-state `li` is treated as a grid container, placing its sole text node into the first column of `42px` width.

### Fix Plan
1. Add a CSS rule `.leaderboard-list li.empty-state { display: block; text-align: center; }` to override the grid layout for the empty-state list item.
2. Build the app using `npm run build` and verify.

### Regression Test Required
NO

### Validator Decision
PASS

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
