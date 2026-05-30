# TEST/COVERAGE_REPORT.md — Coqid-game

## 0. Coverage Focus

Coverage priority is behavior coverage, not vanity line coverage.

---

## 1. Required Behavior Coverage

| Area | Required? | Status |
|---|---|---|
| P0 acceptance criteria | YES | PASS_LOCAL_MVP |
| scoring engine | YES | PASS |
| status classifier | YES | PASS |
| deletion recommendation only | YES | PASS |
| reminder recommendation | YES | PASS |
| leaderboard sorting | YES | PASS |
| empty state | YES | PASS |
| malformed data fallback | YES | PASS |
| local run/smoke | YES | PASS |
| actual deletion path | MUST NOT EXIST | PASS_STATIC_INSPECTION |
| review-only deletion actions | YES | PASS_STATIC_AND_BROWSER |
| personal/global visual separation | YES | PASS_SMOKE_AND_BROWSER |

---

## 2. Coverage Gate

Final READY requires:

```txt
[x] all automated P0 AC covered
[x] scoring tests pass
[x] leaderboard tests pass
[x] empty/malformed data tests pass
[x] no actual deletion action exists
[x] local smoke test passes
[x] demo rehearsal passes
```

---

## 3. Known Coverage Gaps

| Gap | Severity | Mitigation |
|---|---|---|
| real Codex API not covered | accepted | out of MVP |
| real cross-user leaderboard not covered | accepted | out of MVP |
| exact token/coin cost not covered | accepted | estimated cost only |
| `back` branch integration not validated | medium | keep out of local MVP readiness until contracts and validation are updated |
