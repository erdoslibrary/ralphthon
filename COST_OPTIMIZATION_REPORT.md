# COST_OPTIMIZATION_REPORT.md — Coqid-game

## 0. Cost Strategy

Coqid-game should avoid expensive live API/model loops during MVP.

---

## 1. Cost Decisions

| Decision | Status | Reason |
|---|---|---|
| Use mock/local plugin data | ACCEPTED | avoids live API uncertainty |
| Avoid live Codex telemetry | ACCEPTED | not required for demo |
| Avoid backend leaderboard | ACCEPTED | reduces build/deploy cost |
| Avoid actual deletion | ACCEPTED | avoids destructive risk |
| Test scoring deterministically | ACCEPTED | cheap and reliable |

---

## 2. Forbidden Cost Cuts

Do not reduce cost by:
- skipping scoring tests
- skipping no-deletion check
- skipping malformed data test
- skipping demo rehearsal

---

## 3. Live API Budget

Live Codex API calls in MVP:

```txt
0 required
```

Fallback:
Bundled sample data.
