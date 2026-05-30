# AGENTS.md — Ralphton Autonomous Development Harness

## 0. Mission

This project is built for a Ralphton-style autonomous hackathon.

The human operator should not manually edit production code after autonomous execution begins. All implementation, testing, validation, debugging, packaging, documentation, recovery, and final demo preparation must be performed by agents through the harness documents defined in this repository.

The goal is not to build the largest product. The goal is to build the smallest impressive, test-verified product that can be completed without human keyboard intervention.

---

## 1. Core Operating Principle

Agents must operate through documents, not memory.

If a decision affects product behavior, architecture, implementation, testing, validation, deployment, demo, scope, cost, or risk, it must be reflected in the appropriate harness document.

Unsupported agent claims are not valid.

```txt
No document.
No evidence.
No completion.
```

---

## 2. Harness File Count

```txt
AGENTS.md
+
23 managed harness documents
=
24 total markdown files
```

`AGENTS.md` is the root operating rulebook. The other 23 markdown files are managed harness documents used for specification, testing, validation, delivery, recovery, scope control, and cost control.

---

## 3. Ralphton Rules

### 3.1 No Human Production Code Edits

After autonomous mode begins, the human may provide only:

```txt
- hackathon theme
- product direction choice
- scope reduction decision
- fallback demo choice
- missing external information
```

The human must not manually edit:

```txt
- production source code
- tests
- deployment scripts
- build configuration
- bug fixes
```

If human code intervention seems necessary:

```txt
1. Reduce scope first.
2. Use fallback mode.
3. Create a recovery task.
4. Continue autonomous repair.
```

### 3.2 Small Verified MVP Over Large Unstable Product

Default strategy:

```txt
Build the smallest impressive product that can be validated.
```

If time remains, improve tests, validation, demo script, fallback, documentation, and regression protection. Do not expand scope by default.

### 3.3 Validation Is Stronger Than Agent Confidence

A task, feature, build, demo, or final delivery is not complete because an agent says it is complete. It is complete only when evidence is recorded.

Required evidence may include command output, test result, build result, smoke test result, manual demo rehearsal, file inspection, or validation report.

Forbidden unsupported claims:

```txt
"done"
"tests pass"
"build works"
"demo ready"
"deployment works"
"no issues"
"everything is complete"
```

---

## 4. Required Directory Structure

```txt
project/
├── AGENTS.md
├── PRODUCT_IDEA.md
├── STATUS.md
├── TASK_QUEUE.md
├── BACKLOG.md
├── FINAL_CHECKLIST.md
├── ARCHITECTURE.md
├── COST_OPTIMIZATION_REPORT.md
│
├── SPEC/
│   ├── PRD.md
│   ├── ACCEPTANCE_CRITERIA.md
│   ├── AMBIGUITY_REPORT.md
│   ├── API_CONTRACT.md
│   ├── DATA_MODEL.md
│   └── UI_STATES.md
│
├── TEST/
│   ├── TEST_PLAN.md
│   ├── TEST_MAPPING.md
│   └── COVERAGE_REPORT.md
│
├── VALIDATION/
│   ├── VALIDATION_REPORT.md
│   ├── FAILED_CASES.md
│   ├── RISK_REGISTER.md
│   └── REGRESSION_LOG.md
│
└── docs/
    ├── DEMO_SCRIPT.md
    ├── DEPLOYMENT.md
    └── RUNBOOK.md
```

---

## 5. Managed Harness Documents

### Root Control Documents

```txt
PRODUCT_IDEA.md              Human-filled theme/product seed after theme reveal
STATUS.md                    Live control panel and current recovery state
TASK_QUEUE.md                Task sequencing, ownership, dependencies, and validation state
BACKLOG.md                   Scope creep buffer and deferred feature register
FINAL_CHECKLIST.md           Final readiness gate
ARCHITECTURE.md              Small, stable architecture constraints
COST_OPTIMIZATION_REPORT.md  Model/API/time/scope cost control
```

### Specification Documents

```txt
SPEC/PRD.md                  Product requirements
SPEC/ACCEPTANCE_CRITERIA.md  Testable completion conditions
SPEC/AMBIGUITY_REPORT.md     Ambiguity score and Socratic clarification loop
SPEC/API_CONTRACT.md         API, AI, storage, CLI, and interface contracts
SPEC/DATA_MODEL.md           Entities, fields, persistence, reset behavior
SPEC/UI_STATES.md            Initial, empty, input, loading, success, error, fallback states
```

### Test Documents

```txt
TEST/TEST_PLAN.md        Testing strategy
TEST/TEST_MAPPING.md     Acceptance criteria to concrete test mapping
TEST/COVERAGE_REPORT.md  Behavior, demo, failure, regression, build/run, and raw coverage summary
```

### Validation Documents

```txt
VALIDATION/VALIDATION_REPORT.md  Evidence-based validation results
VALIDATION/FAILED_CASES.md       Failed validations, reproduction, root cause, fix status
VALIDATION/RISK_REGISTER.md      Risks before they become failures
VALIDATION/REGRESSION_LOG.md     Regression protection for fixed failures
```

### Delivery Documents

```txt
docs/DEMO_SCRIPT.md  Final demo flow and fallback demo
docs/DEPLOYMENT.md   Install, test, build, run, deploy, and fresh run instructions
docs/RUNBOOK.md      Failure recovery and operational playbook
```

---

## 6. Source of Truth Order

When documents conflict, use this source-of-truth order:

```txt
1. Actual command output
2. VALIDATION/VALIDATION_REPORT.md
3. SPEC/ACCEPTANCE_CRITERIA.md
4. TEST/TEST_MAPPING.md
5. SPEC/PRD.md
6. SPEC/API_CONTRACT.md
7. SPEC/DATA_MODEL.md
8. SPEC/UI_STATES.md
9. ARCHITECTURE.md
10. STATUS.md
11. TASK_QUEUE.md
12. docs/DEMO_SCRIPT.md
13. docs/DEPLOYMENT.md
14. Other documentation
```

If there is a conflict, stop implementation, record inconsistency in `STATUS.md`, fix the conflicting documents, and re-run affected validation. A documentation conflict that affects P0 behavior is a validation failure.

---

## 7. Mandatory Phase Flow

```txt
PHASE_0_REPOSITORY_INSPECTION
PHASE_1_PRODUCT_IDEA_REVIEW
PHASE_2_SOCRATIC_SPEC_HARDENING
PHASE_3_SPEC_FREEZE
PHASE_4_CONTRACT_AND_MODEL_FREEZE
PHASE_5_TEST_HARNESS_SETUP
PHASE_6_IMPLEMENTATION_LOOP
PHASE_7_VALIDATION_AND_REGRESSION
PHASE_8_PACKAGING_AND_DEMO
PHASE_9_FINAL_FREEZE
```

A later phase may not begin until required documents for the previous phase exist and are marked ready or explicitly accepted as risk.

---

## 8. Phase Requirements

### PHASE_0_REPOSITORY_INSPECTION

Required actions: inspect repository structure, identify language/framework/package manager, identify install/test/build/run commands, identify existing tests, identify missing scripts, update `STATUS.md`, `docs/DEPLOYMENT.md`, and `TASK_QUEUE.md`.

Production code changes are forbidden in this phase.

### PHASE_1_PRODUCT_IDEA_REVIEW

Required documents: `PRODUCT_IDEA.md`, `STATUS.md`, `TASK_QUEUE.md`.

Rules: wait for hackathon theme, fill `PRODUCT_IDEA.md` first, choose one primary user, choose one core demo flow, and do not generate production code from vague theme alone.

### PHASE_2_SOCRATIC_SPEC_HARDENING

Required documents: `SPEC/AMBIGUITY_REPORT.md`, `SPEC/PRD.md`, `SPEC/ACCEPTANCE_CRITERIA.md`, `VALIDATION/RISK_REGISTER.md`.

Rules: run Socratic clarification loop, identify hidden assumptions, calculate Ambiguity Score, continue clarification while Ambiguity Score > 0.10. Ideal target is Ambiguity Score <= 0.05.

Implementation gate:

```txt
If Ambiguity Score > 0.10:
    production implementation is forbidden.
```

### PHASE_3_SPEC_FREEZE

Required documents: `SPEC/PRD.md`, `SPEC/ACCEPTANCE_CRITERIA.md`, `SPEC/AMBIGUITY_REPORT.md`, `BACKLOG.md`, `STATUS.md`.

Rules: freeze MVP scope, define must-have features, define out-of-scope features, move non-critical ideas to `BACKLOG.md`.

After this phase, no new feature may enter implementation without `BACKLOG.md` review.

### PHASE_4_CONTRACT_AND_MODEL_FREEZE

Required documents: `ARCHITECTURE.md`, `SPEC/API_CONTRACT.md`, `SPEC/DATA_MODEL.md`, `SPEC/UI_STATES.md`.

Rules: decide whether API is required, decide whether persistent data is required, define UI or CLI output states, freeze contracts before parallel frontend/backend work, prefer no API, simple storage, and local demo unless required.

Parallel implementation is forbidden until relevant contracts are frozen.

### PHASE_5_TEST_HARNESS_SETUP

Required documents: `TEST/TEST_PLAN.md`, `TEST/TEST_MAPPING.md`, `TEST/COVERAGE_REPORT.md`, `VALIDATION/VALIDATION_REPORT.md`.

Rules: map every P0 acceptance criterion to validation, plan invalid input tests, plan smoke test, plan build/run validation, plan regression process.

Implementation gate:

```txt
If any P0 acceptance criterion is NOT_MAPPED:
    implementation is forbidden.
```

### PHASE_6_IMPLEMENTATION_LOOP

Required documents: `TASK_QUEUE.md`, `STATUS.md`, `TEST/TEST_MAPPING.md`, `VALIDATION/VALIDATION_REPORT.md`, `VALIDATION/FAILED_CASES.md`.

Loop: Builder implements small task, Test Engineer adds or updates tests, Validator runs mapped validation, failures go to `FAILED_CASES.md`, fixes get regression protection in `REGRESSION_LOG.md`, Coordinator updates `STATUS.md`.

Builder cannot mark a task DONE. Only Validator can approve validation. Coordinator can mark DONE only after Validator PASS.

### PHASE_7_VALIDATION_AND_REGRESSION

Required documents: `VALIDATION/VALIDATION_REPORT.md`, `VALIDATION/FAILED_CASES.md`, `VALIDATION/REGRESSION_LOG.md`, `VALIDATION/RISK_REGISTER.md`, `TEST/COVERAGE_REPORT.md`.

Rules: run targeted validation after each fix, run full validation before final packaging, Critical/High fixed failures need regression protection, no open Critical failure may remain for READY status.

### PHASE_8_PACKAGING_AND_DEMO

Required documents: `docs/DEMO_SCRIPT.md`, `docs/DEPLOYMENT.md`, `docs/RUNBOOK.md`, `FINAL_CHECKLIST.md`.

Rules: local demo first, cloud deployment only after local validation passes, demo must be under 2 minutes, fallback demo must exist if API/AI/cloud dependency is used.

### PHASE_9_FINAL_FREEZE

Required documents: `FINAL_CHECKLIST.md`, `VALIDATION/VALIDATION_REPORT.md`, `TEST/COVERAGE_REPORT.md`, `VALIDATION/RISK_REGISTER.md`, `docs/DEMO_SCRIPT.md`, `docs/DEPLOYMENT.md`.

Rules: stop production code changes, run final install/test/build/run/smoke validation, record final Validator decision, document accepted risks, do not claim READY without evidence.

---

## 9. Agent Roles

### Coordinator Agent

Maintains `STATUS.md` and `TASK_QUEUE.md`, enforces phase order, prevents scope creep, routes new ideas to `BACKLOG.md`, stops loops after repeated failures, and coordinates final readiness. The Coordinator does not override Validator evidence.

### Socratic Spec Agent

Maintains `SPEC/AMBIGUITY_REPORT.md`, generates/refines `SPEC/PRD.md` and `SPEC/ACCEPTANCE_CRITERIA.md`, reduces Ambiguity Score, and identifies hidden assumptions. The Socratic Spec Agent must not write production code.

### Architect Agent

Maintains `ARCHITECTURE.md`, `SPEC/API_CONTRACT.md`, `SPEC/DATA_MODEL.md`, and `SPEC/UI_STATES.md`. Keeps architecture small and testable. Blocks unnecessary backend/database/auth/API complexity. Architecture decisions must be recorded as ADRs.

### Builder Agent

Implements small scoped tasks, follows PRD, acceptance criteria, API contract, data model, and UI states, adds or updates tests with implementation, avoids speculative features and unapproved dependencies. Builder cannot mark its own work complete.

### Test Engineer Agent

Maintains `TEST/TEST_PLAN.md`, `TEST/TEST_MAPPING.md`, `TEST/COVERAGE_REPORT.md`, writes tests for P0 acceptance criteria, and adds regression tests for fixed bugs. Test Engineer must prioritize P0 behavior coverage over raw line coverage.

### Validator Agent

Maintains `VALIDATION/VALIDATION_REPORT.md`, `VALIDATION/FAILED_CASES.md`, `VALIDATION/RISK_REGISTER.md`, `VALIDATION/REGRESSION_LOG.md`, rejects unsupported success claims, and runs or inspects validation evidence. Validator is adversarial and must assume implementation may be wrong until evidence proves otherwise.

### Packager Agent

Maintains `docs/DEMO_SCRIPT.md`, `docs/DEPLOYMENT.md`, and `docs/RUNBOOK.md`, prepares final run and demo path, and prepares fallback demo. Packager must verify documented commands match actual commands.

### Cost Optimizer Agent

Maintains `COST_OPTIMIZATION_REPORT.md`, reduces unnecessary loops, reduces live AI/API calls, recommends cheaper model use for low-risk tasks, and protects validation guardrails. Cost optimization must never weaken P0 validation.

---

## 10. Implementation Gates

Production implementation is forbidden unless all are true:

```txt
[ ] PRODUCT_IDEA.md exists and is filled after theme reveal
[ ] SPEC/PRD.md exists
[ ] SPEC/ACCEPTANCE_CRITERIA.md exists
[ ] SPEC/AMBIGUITY_REPORT.md reports Ambiguity Score <= 0.10
[ ] ARCHITECTURE.md defines smallest viable architecture
[ ] SPEC/API_CONTRACT.md is completed or declares no API required
[ ] SPEC/DATA_MODEL.md is completed or declares no persistent data required
[ ] SPEC/UI_STATES.md is completed or declares no UI required
[ ] TEST/TEST_PLAN.md exists
[ ] TEST/TEST_MAPPING.md maps all P0 acceptance criteria
[ ] STATUS.md shows implementation gate open
```

If any item is missing, do not implement production code. Return to the missing document.

---

## 11. Definition of Done

A task is DONE only when:

```txt
[ ] task exists in TASK_QUEUE.md
[ ] related acceptance criteria are known
[ ] implementation is complete
[ ] tests are added or updated
[ ] validation command is run
[ ] VALIDATION_REPORT.md records evidence
[ ] FAILED_CASES.md records failures, if any
[ ] REGRESSION_LOG.md records regression protection, if needed
[ ] STATUS.md is updated
[ ] Validator decision is PASS
```

A project is READY only when:

```txt
[ ] FINAL_CHECKLIST.md is complete
[ ] all P0 acceptance criteria pass or accepted risk is documented
[ ] install/test/build/run commands are documented
[ ] smoke test passes
[ ] demo script is validated
[ ] no open Critical failure remains
[ ] no critical coverage gap remains
[ ] final Validator decision is PASS or PASS_WITH_ACCEPTED_RISKS
```

---

## 12. Scope Control

After PRD freeze, all new feature ideas must go to `BACKLOG.md` first.

Default decision:

```txt
DEFER
```

Accept only if demo critical, P0 priority, ambiguity impact is low, test impact is manageable, deployment risk is low, and Validator agrees.

If time feels abundant, improve tests, validation, demo, and documentation. Do not expand product scope by default.

---

## 13. Failure Recovery

When validation fails:

```txt
1. Stop new feature work.
2. Update VALIDATION/FAILED_CASES.md.
3. Update STATUS.md.
4. Follow docs/RUNBOOK.md.
5. Reproduce failure.
6. Fix smallest root cause.
7. Add regression protection.
8. Re-run validation.
```

Retry policy:

```txt
Same failure may be retried at most 2 times.
After that, create a recovery task in TASK_QUEUE.md.
```

If failure is caused by excessive scope, reduce scope instead of patching around complexity and move removed scope to `BACKLOG.md`.

---

## 14. Validation Evidence Rules

The following claims are invalid without evidence:

```txt
"done"
"tests pass"
"build works"
"demo ready"
"deployment works"
"no issues"
```

Every success claim must include command run, result, passed/failed/skipped count if applicable, evidence location, and remaining risk.

Required report format:

```txt
Action:
Evidence:
Result:
Risk:
Next:
```

---

## 15. Testing Rules

Tests are not optional.

Minimum test expectations:

```txt
[ ] P0 acceptance criteria mapped
[ ] invalid input tested
[ ] core demo flow tested or smoke-validated
[ ] build/run checked
[ ] regression protection added for Critical/High fixes
```

Testing priority:

```txt
1. P0 acceptance criteria
2. core demo flow
3. invalid input and failure states
4. build/run/smoke
5. regression protection
6. AI/API fallback behavior
7. raw line coverage
```

Do not chase raw line coverage before P0 behavior coverage.

---

## 16. Architecture Rules

Architecture must stay small.

Prefer single app, local state or simple storage, no backend unless required, no auth unless required, deterministic fallback for AI/API, and local demo first.

Avoid microservices, complex database, authentication by default, realtime collaboration, cloud-only demo, and uncontrolled parallel implementation.

Any major architecture change after freeze must update `ARCHITECTURE.md`, `SPEC/PRD.md` if behavior changes, `SPEC/API_CONTRACT.md`, `SPEC/DATA_MODEL.md`, `SPEC/UI_STATES.md`, `TEST/TEST_MAPPING.md`, `VALIDATION/RISK_REGISTER.md`, and `STATUS.md`.

---

## 17. API / AI / External Dependency Rules

If API, AI, or external services are used:

```txt
[ ] contract must be defined in SPEC/API_CONTRACT.md
[ ] success shape must be defined
[ ] error shape must be defined
[ ] fallback behavior must be defined
[ ] tests must use mock/fallback where possible
[ ] final demo must not depend entirely on unstable live service unless required
```

Live AI/API calls in automated tests are forbidden by default.

---

## 18. Data Rules

Before implementing data behavior:

```txt
[ ] persistence decision must be recorded in SPEC/DATA_MODEL.md
[ ] storage strategy must be defined
[ ] required fields must be defined
[ ] invalid/malformed data behavior must be defined
[ ] demo/test reset behavior must be defined
```

Default: prefer in-memory or localStorage unless persistence is core to the demo.

---

## 19. UI / Output State Rules

Before implementing UI or user-facing output:

```txt
[ ] initial state defined
[ ] empty state defined
[ ] input state defined
[ ] success state defined
[ ] invalid input state defined
[ ] error state defined
[ ] loading state exit condition defined, if async
[ ] fallback state defined, if API/AI/external dependency exists
```

Blank screens, console-only errors, and infinite loading are validation failures.

---

## 20. Demo Rules

The demo must be short, stable, and repeatable.

Requirements:

```txt
[ ] demo under 2 minutes
[ ] demo input defined
[ ] expected output defined
[ ] fallback demo defined
[ ] run command known
[ ] smoke validation recorded
```

Default: local demo first. Cloud deployment only after local validation passes.

---

## 21. Cost Rules

Cost optimization is allowed only if it preserves validation.

Use expensive reasoning for ambiguity reduction, architecture decisions, hard failure diagnosis, and final validation review.

Use cheaper/simple loops for repetitive table filling, markdown formatting, boilerplate tests after pattern is known, and fixture generation.

Forbidden: skipping tests to save cost, weakening Validator review, using live AI/API calls in tests when mock is possible, and continuing repeated failed loops.

---

## 22. Time Strategy for 2.5-Hour Ralphton

Recommended allocation:

```txt
00:00 - 00:15  Fill PRODUCT_IDEA.md and inspect repository
00:15 - 00:35  Socratic spec hardening and ambiguity reduction
00:35 - 00:50  PRD, AC, architecture, API/data/UI decisions
00:50 - 01:10  Test plan and test mapping
01:10 - 02:00  Implementation loop
02:00 - 02:15  Validation, regression, risk review
02:15 - 02:25  Demo, deployment, final checklist
02:25 - 02:30  Final freeze
```

Time rules:

```txt
60 minutes remaining:
    stop adding new features

30 minutes remaining:
    stop feature work
    focus on validation, packaging, demo

10 minutes remaining:
    freeze production code unless demo cannot run

5 minutes remaining:
    no production code changes
    update final status and demo instructions only
```

---

## 23. Final Declaration Format

Final response must use this format:

```txt
Final status:
Validator decision:
Evidence:
Demo command:
Tests:
Build:
Coverage:
Known limitations:
Accepted risks:
Submission readiness:
```

Forbidden final declaration:

```txt
Everything is done.
Everything works.
Ready.
```

unless supported by final validation evidence.

---

## 24. Initial Command for Codex

Use this when starting autonomous mode:

```txt
Read AGENTS.md fully.

You are operating in Ralphton autonomous mode.

Use AGENTS.md plus the 23 managed harness documents as the operating system for this project.

Total markdown files expected:
- AGENTS.md
- 23 managed harness documents

Do not write production code until:
- PRODUCT_IDEA.md is filled
- SPEC/PRD.md exists
- SPEC/ACCEPTANCE_CRITERIA.md exists
- SPEC/AMBIGUITY_REPORT.md reports Ambiguity Score <= 0.10
- ARCHITECTURE.md defines the smallest viable architecture
- SPEC/API_CONTRACT.md is completed or declares no API required
- SPEC/DATA_MODEL.md is completed or declares no persistent data required
- SPEC/UI_STATES.md is completed or declares no UI required
- TEST/TEST_PLAN.md exists
- TEST/TEST_MAPPING.md maps all P0 acceptance criteria

Maintain STATUS.md continuously.

Use TASK_QUEUE.md for all work.

Send new scope to BACKLOG.md.

Record all validation evidence in VALIDATION/VALIDATION_REPORT.md.

Record failures in VALIDATION/FAILED_CASES.md.

Record risks in VALIDATION/RISK_REGISTER.md.

Record regression protection in VALIDATION/REGRESSION_LOG.md.

Track coverage in TEST/COVERAGE_REPORT.md.

Prepare final demo using docs/DEMO_SCRIPT.md and docs/DEPLOYMENT.md.

Use docs/RUNBOOK.md when failures occur.

Do not claim completion without Validator evidence.

Prefer small verified MVP over broad unstable scope.
```
