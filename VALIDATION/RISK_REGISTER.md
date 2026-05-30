# VALIDATION/RISK_REGISTER.md — Coqid-game CLI

## 0. Purpose

Track risks for the CLI-first Coqid-game MVP.

---

## 1. Active Risks

| Risk ID | Title | Category | Severity | Probability | Status | Mitigation |
|---|---|---|---|---|---|---|
| R-001 | Runtime/package manager not selected | BUILD | Medium | Medium | CLOSED | Node.js/npm selected and documented |
| R-002 | Web implementation drift | SCOPE_CREEP | High | Medium | MITIGATED | CLI-only implementation; no web server required |
| R-003 | Accidental destructive deletion | SAFETY | Critical | Low | MITIGATED | No destructive command; static inspection passes |
| R-004 | Real Codex usage API unavailable | EXTERNAL_API | High | High | MITIGATED | Local fixture data for MVP |
| R-005 | Plugin-level cost unavailable | DATA | High | High | MITIGATED | Use estimatedCost fixture field |
| R-006 | Leaderboard privacy concerns | PRIVACY | Medium | Medium | MITIGATED | Local/sample anonymous data only |
| R-007 | Demo command not linked globally | RUNTIME | Medium | Medium | ACCEPTED | Local `node cli/coqid-game.js` fallback documented |

---

## 2. Critical Risk Policy

```txt
Actual plugin deletion must not be implemented in MVP.
If any destructive operation appears, final readiness is BLOCKED.
```

---

## 3. Mitigations Required Before Final Demo

```txt
[x] CLI-first architecture confirmed
[x] web dashboard absent or explicitly deferred
[x] no delete/remove/purge command exists
[x] local fixture data exists
[x] invalid input tests pass
[x] local run command documented
```
