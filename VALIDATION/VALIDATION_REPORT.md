# VALIDATION/VALIDATION_REPORT.md

## 0. Purpose

Record evidence-based validation results. Prevent false success claims.

A task, feature, test, build, or final delivery is not valid unless this file records what command was run, what result occurred, what passed, what failed, what was not checked, and what risk remains.

## 1. Status

```txt
Document status: FINAL
Current validator: Validator
Current validation phase: FINAL_FREEZE
Final validator decision: PASS
```

## 2. Validator Authority

Only the Validator may mark validation as PASS, FAIL, BLOCKED, or PASS_WITH_ACCEPTED_RISKS.

Builder claim is not evidence. Command output, file inspection, passing test result, and successful demo rehearsal are evidence.

## 3. Command Evidence Table

| Run ID | Purpose | Command | Exit Status | Result | Evidence Notes |
|---|---|---|---:|---|---|
| V-001 | Full automated test suite | `npm test` | 0 | PASS | 18 tests passed, 0 failed |
| V-002 | Build/module check | `npm run build` | 0 | PASS | CLI modules and fixtures present |
| V-003 | Smoke/demo rehearsal | `npm run smoke` | 0 | PASS | help, analyze, leaderboard, invalid input paths passed |
| V-004 | Timed smoke rehearsal | `/usr/bin/time -p npm run smoke` | 0 | PASS | real 2.97 seconds, under 2 minutes |
| V-005 | Package dry-run safety | `npm --cache /private/tmp/npm-cache pack --dry-run --json` | 0 | PASS | package allowlist excludes `.omx/`; 40 expected entries |

## 4. Acceptance Criteria Validation Table

| AC ID | Test/Validation | Result | Evidence | Notes |
|---|---|---|---|---|
| AC-001 | TEST-001 | PASS | `tests/cli.test.js`; `npm test` | help shows analyze/leaderboard |
| AC-002 | TEST-002 | PASS | `tests/cli.test.js`; `npm test` | analyze reads valid fixture |
| AC-003 | TEST-003 | PASS | `tests/scoring.test.js`; `npm test` | deterministic score verified |
| AC-004 | TEST-004 | PASS | `tests/scoring.test.js`, `tests/cli.test.js`; `npm test` | DELETE_RECOMMENDED appears with reason |
| AC-005 | TEST-005 | PASS | `tests/scoring.test.js`, `tests/cli.test.js`; `npm test` | REMIND candidate appears |
| AC-006 | TEST-006/007 | PASS | `tests/cli.test.js`; `npm test` | weekly/monthly leaderboard verified |
| AC-007 | TEST-008/009 | PASS | `tests/cli.test.js`, `tests/validation.test.js`; `npm test` | invalid schema, malformed JSON, missing file, and empty data handled |
| AC-008 | TEST-010 | PASS | `tests/noDeletion.test.js`; `npm test` | no destructive source patterns; delete command unavailable |
| AC-009 | TEST-011 | PASS | `/usr/bin/time -p npm run smoke` | smoke rehearsal completed in 1.66 seconds |

## 5. Final Validation Run V-001 to V-004

Action:
Ran automated tests, build check, smoke rehearsal, and timed smoke rehearsal for the CLI MVP.

Evidence:
`npm test` exited 0 with 18 passing tests, 0 failures, 0 skipped. `npm run build` exited 0. `npm run smoke` exited 0. `git diff --check` exited 0. `npm --cache /private/tmp/npm-cache pack --dry-run --json` exited 0 and excluded `.omx/`. `/usr/bin/time -p npm run smoke` exited 0 with `real 2.97`.

Result:
PASS. All P0 acceptance criteria AC-001 through AC-009 are validated.

Risk:
Raw line coverage is not measured; behavior coverage is complete for P0. Global `coqid-game` binary requires `npm link` or package installation, so docs provide `node cli/coqid-game.js` as the local fallback.

Next:
Use local CLI commands in docs/DEMO_SCRIPT.md for the final demo.

## 6. Validation Run Template

```md
## Validation Run V-XXX: [Title]

### Timestamp
TBD

### Trigger
Task completion / Full validation / Regression check / Final check / Manual demo

### Scope
...

### Related Task
T-XXX

### Related Acceptance Criteria
AC-XXX

### Commands Run
```bash
...
```

### Command Results
- Command:
- Exit status:
- Result:
- Notes:

### Tests Summary
- Total:
- Passed:
- Failed:
- Skipped:
- Not run:

### Build Summary
- Build command:
- Result:

### Runtime / Smoke Summary
- Run command:
- Result:

### Failed Items
-

### Risks
-

### Validator Decision
PASS / FAIL / BLOCKED / PASS_WITH_ACCEPTED_RISKS
```

## 7. Final Decision Rules

PASS requires all P0 AC pass, required tests pass, build/run validation passes, smoke validation passes, demo script works, no unresolved critical risk, and evidence is recorded.
