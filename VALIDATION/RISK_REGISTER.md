# VALIDATION/RISK_REGISTER.md — Coqid-game

## 0. Active Risks

| ID | Risk | Severity | Status | Mitigation |
|---|---|---|---|---|
| R-001 | Real Codex plugin usage API may be unavailable | High | ACCEPTED | use mock/local data |
| R-002 | Plugin-level exact token/coin cost may be unavailable | High | ACCEPTED | use estimated cost label |
| R-003 | Actual deletion is destructive | Critical | MITIGATED | recommendation only; no delete action |
| R-004 | Cross-user leaderboard needs privacy/backend | High | DEFERRED | use anonymous sample data |
| R-005 | Name/theme may imply protected IP | Medium | MITIGATING | use Coqid-game branding, avoid direct protected claims |
| R-006 | Demo depends on local run | Medium | MITIGATED_INITIAL | documented commands; smoke test passed |
| R-007 | Team `back` branch may add API dependency | Medium | OPEN | require contract/test/risk updates before merge |

---

## 1. Risk Rules

Critical MVP rule:

```txt
Coqid-game must not delete, uninstall, disable, or modify real plugins.
```

If any deletion action is added, final readiness is blocked.

---

## 2. Accepted Risks

Accepted for MVP:
- mock/local data instead of real Codex telemetry
- estimated cost instead of exact token/coin accounting
- sample leaderboard instead of production cross-user leaderboard

Not accepted:
- automatic deletion
- silent modification of user plugins
- live API-only demo
