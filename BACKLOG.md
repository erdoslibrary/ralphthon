# BACKLOG.md — Coqid-game

## 0. Purpose

This backlog protects the Coqid-game MVP from scope creep.

---

## Deferred Features

| ID | Feature | Reason Deferred | Risk if Added Now |
|---|---|---|---|
| BL-001 | Real Codex plugin usage API sync | API availability uncertain | blocks demo |
| BL-002 | Real plugin deletion/uninstall | destructive and unsafe | high risk |
| BL-003 | Production cross-user leaderboard | needs backend/auth/privacy | high scope |
| BL-004 | Authentication | not needed for MVP | high scope |
| BL-005 | Cloud database | not needed for mock demo | deployment risk |
| BL-006 | Exact token/coin accounting per plugin | may not be available | false claims |
| BL-007 | Public marketplace ranking | beyond MVP | large backend |
| BL-008 | Plugin auto-reminder notifications | extra integration | scope creep |
| BL-009 | Real cost optimization suggestions | needs real telemetry | uncertain data |

---

## MVP Boundary

Allowed in MVP:
- local/mock plugin data
- deterministic scoring
- deletion recommendation only
- reminder recommendation
- weekly/monthly sample leaderboard
- local demo

Forbidden in MVP:
- actual deletion
- automatic uninstall
- live API dependency
- required auth
- production multi-user analytics
