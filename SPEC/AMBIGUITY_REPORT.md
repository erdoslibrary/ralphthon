# SPEC/AMBIGUITY_REPORT.md — Coqid-game

## 0. Current Ambiguity Status

Product idea: Coqid-game

Current Ambiguity Score: 0.08
Target Score: <= 0.10
Ideal Score: <= 0.05
Implementation Gate: OPEN_WITH_MOCK_DATA
Validator Decision: PASS_WITH_NOTED_RISKS

Reason:
The MVP is clear if implemented with mock/local plugin usage data and deletion recommendation only. Real Codex API access remains uncertain and is explicitly out of MVP scope.

---

## 1. Key Decisions Resolved

| Decision | Resolution |
|---|---|
| Product name | Coqid-game |
| Actual deletion? | NO. Recommendation only. |
| Data source for MVP | Mock/local plugin usage data |
| Real Codex usage API required? | NO |
| Real token/coin cost required? | NO. Use estimated cost labels. |
| Leaderboard source | Sample/anonymous mock data for MVP |
| Backend required? | NO for MVP |
| Primary UI | Local dashboard |

---

## 2. Remaining Ambiguities

| ID | Ambiguity | Severity | Decision / Mitigation |
|---|---|---|---|
| A-001 | Real Codex plugin usage API availability | High | Out of MVP; use mock/local data |
| A-002 | Exact plugin-level token/coin cost availability | High | Use estimated cost only |
| A-003 | Real cross-user leaderboard privacy | Medium | Use anonymous mock data in MVP |
| A-004 | Product name/IP tone | Medium | Use Coqid-game; avoid direct protected IP claims |
| A-005 | Plugin deletion capability | Low | Explicitly no deletion in MVP |

---

## 3. Socratic Questions and Answers

### Q001

Question: What is the product?

Answer:
Coqid-game is a Codex plugin/skill survival dashboard that scores installed plugins and recommends low-value plugins for deletion review.

Impact: Reduced ambiguity.

---

### Q002

Question: Does the product delete plugins?

Answer:
No. Coqid-game only recommends deletion candidates. It never deletes, uninstalls, disables, or modifies plugins in the MVP.

Impact: Strongly reduced risk and ambiguity.

---

### Q003

Question: What data source is required for MVP?

Answer:
Mock/local plugin usage data is enough for MVP.

Impact: Reduced API risk.

---

### Q004

Question: What is the core demo?

Answer:
Show plugin list -> run survival check -> display Safe / Reminder Recommended / Deletion Recommended -> show weekly/monthly leaderboard.

Impact: Reduced demo ambiguity.

---

### Q005

Question: What should be cut if time is short?

Answer:
Cut leaderboard polish first, then reminder explanations. Never cut scoring, deletion recommendation, empty/malformed data handling, or local demo.

Impact: Reduced scope risk.

---

## 4. Scoring Table

| Category | Score | Reason |
|---|---:|---|
| Theme alignment | 0.05 | Codex plugin management aligns with AI tooling |
| Target user clarity | 0.05 | Codex users with many plugins |
| Problem clarity | 0.05 | plugin clutter and forgotten tools |
| Core demo flow clarity | 0.05 | dashboard + scoring + leaderboard |
| Must-have feature clarity | 0.05 | P0 features identified |
| Out-of-scope clarity | 0.05 | no deletion, no real API required |
| Functional requirement clarity | 0.05 | PRD defined |
| Acceptance criteria clarity | 0.05 | P0 AC defined |
| Data model clarity | 0.10 | exact real data source unknown, but mock path clear |
| UI state clarity | 0.05 | core states defined |
| API / integration clarity | 0.10 | real API out of MVP |
| Failure handling clarity | 0.05 | fallback required |
| Test strategy clarity | 0.05 | scoring and leaderboard testable |
| Deployment / run clarity | 0.10 | depends on final stack |
| Scope stability | 0.05 | deletion removed from MVP |

Final Ambiguity Score: 0.08

---

## 5. Gate Decision

Gate decision: OPEN_IMPLEMENTATION_WITH_MOCK_DATA

Allowed next phase:
Contract/model/test setup and implementation.

Blocked items:
- real Codex API sync
- actual plugin deletion
- production cross-user leaderboard
