# COST_OPTIMIZATION_REPORT.md — Coqid-game CLI

## 0. Purpose

Track cost and loop efficiency decisions for Coqid-game.

---

## 1. Cost Decisions

```txt
Live Codex API calls in MVP: NO
Live billing/cost API calls in MVP: NO
Cloud backend in MVP: NO
Web dashboard in MVP: NO
Local fixture data: YES
CLI demo: YES
Runtime dependencies: NONE beyond Node.js
Automated tests: local only
Final cost risk: LOW
```

---

## 2. Optimization Rationale

```txt
CLI-first implementation minimizes UI, backend, deployment, and API risk.
Mock/local data avoids expensive and unreliable live integration loops.
Recommendation-only behavior avoids destructive-operation validation burden.
```

---

## 3. Guardrails

Cost optimization must not weaken:

```txt
- no-deletion safety test
- scoring determinism tests
- invalid input tests
- CLI demo validation
```

---

## 4. Deferred Costly Work

| Item | Reason |
|---|---|
| Web dashboard | not needed for CLI MVP |
| live Codex API | uncertain and costly to debug |
| public leaderboard backend | privacy/backend/auth burden |
| actual deletion | high safety risk |
| cloud deployment | not needed for CLI demo |

---

## 5. Final Decision

```txt
Decision: PASS
Rationale: The CLI uses deterministic local fixture data and no live Codex usage or billing APIs.
Validation: npm test, npm run build, npm run smoke
```
