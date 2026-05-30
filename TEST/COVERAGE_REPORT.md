# TEST/COVERAGE_REPORT.md — Coqid-game

## 0. Coverage Focus

Coverage priority is behavior coverage, not vanity line coverage.

---

## 1. Required Behavior Coverage

| Area | Required? | Status |
|---|---|---|
| P0 acceptance criteria | YES | PARTIAL_PASS_INITIAL |
| scoring engine | YES | PASS |
| status classifier | YES | PASS |
| deletion recommendation only | YES | PASS |
| reminder recommendation | YES | PASS |
| leaderboard sorting | YES | PASS |
| empty state | YES | PASS |
| malformed data fallback | YES | PASS |
| local run/smoke | YES | PASS_INITIAL |
| actual deletion path | MUST NOT EXIST | PASS_STATIC_INSPECTION |

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
[ ] demo rehearsal passes
```

---

## 3. Known Coverage Gaps

| Gap | Severity | Mitigation |
|---|---|---|
| real Codex API not covered | accepted | out of MVP |
| real cross-user leaderboard not covered | accepted | out of MVP |
| exact token/coin cost not covered | accepted | estimated cost only |
| manual demo rehearsal not run | medium | complete docs/DEMO_SCRIPT.md rehearsal before final freeze |
