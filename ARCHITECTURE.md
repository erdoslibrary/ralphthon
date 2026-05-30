# ARCHITECTURE.md — Coqid-game CLI Architecture

## 0. Purpose

Define the smallest stable CLI-first architecture for Coqid-game.

The previous web-dashboard direction is rejected for MVP. Coqid-game must be implemented as a CLI-based plugin assistant.

---

## 1. Architecture Status

```txt
Document status: FINAL
Product type: CLI tool / Codex plugin assistant
Architecture frozen: YES
Validator decision: PASS
```

---

## 2. Architecture Decision

```txt
Selected product type: CLI tool
Web app: OUT_OF_SCOPE
Backend API: OUT_OF_SCOPE for MVP
Cloud deployment: OUT_OF_SCOPE for MVP
Local fixture data: REQUIRED
Actual deletion: FORBIDDEN for MVP
```

---

## 3. High-Level Architecture

```txt
User terminal
  -> coqid-game CLI entry point
  -> argument parser
  -> data loader
  -> schema validator
  -> scoring engine
  -> recommendation engine
  -> leaderboard engine
  -> terminal reporter / JSON reporter
  -> exit code
```

---

## 4. Recommended Module Structure

```txt
cli/
  coqid-game.js

src/
  cli.js
  dataLoader.js
  scoring.js
  formatters.js
  errors.js

fixtures/
  plugins.json
  invalid.json
  empty.json

tests/
  scoring.test.js
  validation.test.js
  cli.test.js
  noDeletion.test.js
```

---

## 5. Core Modules

| Module | Responsibility | Required? | Tests |
|---|---|---:|---|
| CLI entry | Parse command and route to subcommands | YES | smoke/integration |
| Data loader | Load local JSON file | YES | unit/integration |
| Schema validator | Reject malformed data | YES | unit |
| Scoring engine | Compute deterministic survival score | YES | unit |
| Recommendation engine | Assign SAFE/WATCH/REMIND/DELETE_RECOMMENDED | YES | unit |
| Leaderboard engine | Sort weekly/monthly ranking | YES | unit/integration |
| Terminal reporter | Print readable table/output | YES | snapshot/manual |
| JSON reporter | Machine-readable output | P1 | integration |
| Delete executor | Actually delete plugin | NO / FORBIDDEN | static inspection |

---

## 6. ADRs

### ADR-001: CLI-first, no web dashboard

```txt
Status: ACCEPTED
Decision: Implement Coqid-game as CLI-first tool.
Reason: User explicitly wants plugin/CLI workflow, not web dashboard.
Tradeoff: Less visual than web UI, but faster, more plugin-like, and easier to validate.
```

### ADR-002: Recommendation only, no actual deletion

```txt
Status: ACCEPTED
Decision: Coqid-game only recommends deletion candidates.
Reason: Actual deletion is risky and not needed for MVP demo.
Validation: Static inspection must confirm no delete command or destructive file operation is present.
```

### ADR-003: Local fixture data for MVP

```txt
Status: ACCEPTED
Decision: Use local JSON fixture or manually exported data.
Reason: Real Codex plugin usage/cost API availability is uncertain.
Validation: CLI integration tests use fixtures/plugins.json.
```

### ADR-004: No backend/API for MVP

```txt
Status: ACCEPTED
Decision: No HTTP API or cloud backend for MVP.
Reason: CLI can prove value locally.
Validation: DEPLOYMENT.md must not require server startup for demo.
```

---

## 7. Architecture Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Web implementation drift | High | Lock product type as CLI; web is backlog |
| Deletion accidentally implemented | Critical | Static inspection + no delete command |
| Real Codex data unavailable | High | Local fixture schema |
| Runtime choice delayed | Medium | Decide during repository inspection |

---

## 8. Freeze Gate

```txt
[x] Runtime selected
[x] CLI commands defined
[x] Data schema defined
[x] Scoring engine defined
[x] Test mapping defined
[x] Destructive deletion forbidden
[x] Deployment commands documented
```
