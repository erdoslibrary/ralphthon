# docs/RUNBOOK.md

## 0. Purpose

Operational recovery manual. When something goes wrong, agents must follow this runbook instead of improvising.

## 1. General Recovery Rule

```txt
1. Stop new feature work.
2. Read STATUS.md.
3. Read VALIDATION/VALIDATION_REPORT.md.
4. Record/update VALIDATION/FAILED_CASES.md.
5. Identify failure type.
6. Fix smallest root cause.
7. Add regression test if applicable.
8. Re-run validation.
9. Update STATUS.md.
```

Forbidden: blindly retrying, adding features while critical failure is open, silently changing PRD, weakening AC, deleting tests, manually patching production code outside the loop.

## 2. Failure Types and Responses

### Requirements unclear

Stop implementation, update `SPEC/AMBIGUITY_REPORT.md`, clarify PRD/AC, recalculate Ambiguity Score, resume only if score <= 0.10.

### Tests fail

Record failure, link AC/test, decide whether test or implementation is wrong, fix smallest cause, add regression if real bug, re-run targeted and P0 validation.

### Build fails

Stop feature work, record failure, inspect first build error, fix import/type/dependency/config, run build again. If failure repeats twice, create recovery task.

### App does not start

Confirm run command, record output, check env vars/port/runtime errors, fix smallest cause, re-run smoke test.

### Demo fails

Identify demo step, link AC, record failure, fix/simplify/fallback, update DEMO_SCRIPT.md, rehearse again.

### External API fails

Switch to mock/demo data, record risk/failure if P0 affected, validate fallback path.

### AI output unstable

Validate schema, avoid exact wording tests, use mocked AI output for tests, add deterministic fallback.

### Scope expands

Stop expansion, record idea in BACKLOG.md, accept only P0 demo-critical changes.

### Parallel work conflicts

Stop parallel work, return control to Coordinator, define canonical implementation, run integration tests. If conflicts happen twice, disable parallelization.

## 3. Retry Policy

```txt
Same failure may be retried at most 2 times.
After retry count reaches 2:
1. Stop direct fix attempts.
2. Create recovery task in TASK_QUEUE.md.
3. Record repeated failure analysis.
4. Consider rollback or scope reduction.
```

## 4. Time-Based Rules

```txt
60 minutes remaining: stop adding new features.
30 minutes remaining: only validation, bug fixes, packaging, and demo.
10 minutes remaining: freeze production code unless demo cannot run.
5 minutes remaining: only update demo instructions/final status.
```

## 5. Recovery Task Template

```md
## Recovery Task R-XXX: [Failure title]

### Trigger
...

### Last Known Passing State
...

### Failing Command or Step
```bash
...
```

### Related Failure
F-XXX

### Related Risk
R-XXX

### Recovery Plan
1.
2.
3.

### Scope Reduction Option
...

### Exit Criteria
- [ ] failure reproduced
- [ ] root cause isolated
- [ ] fix or scope reduction applied
- [ ] regression test added or risk accepted
- [ ] targeted validation passes
- [ ] STATUS.md updated
```
