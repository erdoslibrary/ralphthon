# BACKLOG.md — Coqid-game Deferred Scope

## 0. Purpose

Prevent scope creep during the CLI-first MVP.

---

## 1. Deferred Features

| ID | Feature | Reason Deferred | Priority Later |
|---|---|---|---|
| BL-001 | Actual plugin deletion | Too risky for MVP; recommendation only | P1/P2 |
| BL-002 | Web dashboard | User wants CLI plugin; web is out of scope | P2 |
| BL-003 | Real Codex usage API integration | API availability uncertain | P1 |
| BL-004 | Real token/coin attribution per plugin | Billing data may not be exposed per plugin | P2 |
| BL-005 | Public weekly/monthly multi-user leaderboard backend | Needs privacy/auth/backend | P2 |
| BL-006 | Authentication/accounts | Not needed for local CLI MVP | P3 |
| BL-007 | Cloud deployment | CLI local demo is enough | P3 |
| BL-008 | Squid Game-branded public UI | IP risk; keep survival metaphor generic | P3 |

---

## 2. Scope Rule

```txt
If a feature is not needed for the under-2-minute CLI demo, keep it in BACKLOG.md.
```
