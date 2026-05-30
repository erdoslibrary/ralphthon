# TEST/TEST_PLAN.md — Coqid-game

## 0. Test Strategy

Coqid-game testing focuses on deterministic scoring, safe recommendation behavior, and demo reliability.

---

## 1. P0 Test Areas

| Area | Test Type | Priority |
|---|---|---:|
| scoring engine | unit | P0 |
| status classification | unit | P0 |
| deletion recommendation only | unit/static/integration | P0 |
| review-only recommendation actions | static/browser | P0 |
| reminder recommendation | unit/integration | P0 |
| leaderboard sorting | unit/integration | P0 |
| empty data state | integration/smoke | P0 |
| malformed data fallback | unit/integration | P0 |
| local demo startup | smoke | P0 |

---

## 2. Required Tests

1. High-use low-cost plugin becomes SAFE.
2. Low-use high-cost old plugin becomes DELETION_RECOMMENDED.
3. Historically useful but recently unused plugin becomes REMINDER_RECOMMENDED.
4. Same input produces same score.
5. Weekly leaderboard sorts correctly.
6. Monthly leaderboard sorts correctly.
7. Empty plugin data does not crash.
8. Malformed plugin data does not crash.
9. Deletion recommended status does not trigger actual deletion/uninstall.
10. Deletion recommended UI exposes review-only actions without changing plugins.
11. App runs without live Codex API.

---

## 3. Mock Data Policy

Automated tests must use deterministic fixtures.

Live Codex API calls are not required and should not be used in MVP tests.

---

## 4. Final Validation Commands

To be filled after stack is created:

```bash
# install
npm install

# test
npm test

# build
npm run build

# run
npm run dev

# smoke
npm run smoke
```
