# SPEC/PRD.md — Coqid-game

## 0. Purpose

This PRD defines the MVP for **Coqid-game**, a Codex plugin/skill management dashboard that recommends deletion candidates without performing actual deletion.

---

## 1. Product Summary

Product name: **Coqid-game**

One-line description:
Coqid-game helps Codex users audit installed plugins and skills by ranking them with survival scores and recommending low-value plugins for deletion review.

Product type:
Dashboard-style Codex plugin prototype.

MVP platform:
Local web dashboard using mock/local plugin usage data.

---

## 2. Primary User

Codex users who install multiple plugins, skills, and workflow helpers and want to understand which ones are useful, forgotten, or wasteful.

---

## 3. Problem Definition

Users accumulate Codex plugins and skills over time, but they do not have a fun, clear, evidence-based way to decide which ones deserve to remain installed.

Current alternatives:
- manually inspect installed plugins
- rely on memory
- delete rarely used tools randomly
- keep everything installed forever

Weakness:
Manual review is boring, subjective, and not based on usage/cost signals.

---

## 4. Product Goal

Primary goal:
Help users decide which plugins should be kept, remembered, or considered for deletion.

Secondary goals:
- make plugin cleanup engaging
- show weekly/monthly plugin rankings
- demonstrate cost-efficiency awareness
- avoid destructive automatic deletion

Non-goals:
- real plugin deletion
- automatic uninstall
- real billing-grade token accounting
- real cross-user production leaderboard
- authentication
- cloud deployment requirement

---

## 5. MVP Features

| ID | Feature | Priority | Demo Visible? |
|---|---|---:|---|
| F-001 | Plugin list dashboard | P0 | YES |
| F-002 | Survival score calculation | P0 | YES |
| F-003 | Deletion Recommended status | P0 | YES |
| F-004 | Reminder Recommended status | P0 | YES |
| F-005 | Weekly/monthly leaderboard | P0 | YES |
| F-006 | Empty/malformed data fallback | P0 | YES |
| F-007 | Explanation for score/status | P1 | YES |
| F-008 | Real Codex API sync | P3 | NO |
| F-009 | Actual deletion/uninstall | P3 | NO |

---

## 6. Core User Flow

Happy path:

1. User opens Coqid-game.
2. Dashboard shows installed/sample plugins.
3. User clicks **Run Survival Check**.
4. Each plugin receives a survival score.
5. Plugins are grouped into Safe, Reminder Recommended, and Deletion Recommended.
6. User views weekly and monthly leaderboard.

Final visible result:
A ranked plugin survival dashboard with clear deletion recommendations and leaderboard.

---

## 7. Functional Requirements

| ID | Requirement | Priority | Test Required |
|---|---|---:|---|
| FR-001 | Display plugin/skill list from mock/local data | P0 | YES |
| FR-002 | Calculate deterministic survival score for each plugin | P0 | YES |
| FR-003 | Mark low-value plugins as Deletion Recommended | P0 | YES |
| FR-004 | Mark useful but forgotten plugins as Reminder Recommended | P0 | YES |
| FR-005 | Display weekly and monthly leaderboard sorted by rank | P0 | YES |
| FR-006 | Show safe empty state when no plugin data exists | P0 | YES |
| FR-007 | Show controlled error/fallback for malformed data | P0 | YES |
| FR-008 | Never delete plugins automatically | P0 | YES |

---

## 8. Non-Functional Requirements

| ID | Requirement | Target | Verification |
|---|---|---|---|
| NFR-001 | Local run works | documented command starts app | smoke test |
| NFR-002 | Demo time | under 2 minutes | rehearsal |
| NFR-003 | Deterministic scoring | same input gives same output | unit test |
| NFR-004 | No destructive action | no actual deletion path in MVP | static inspection/test |
| NFR-005 | API-independent demo | mock/local data works without network | smoke test |

---

## 9. Scoring Model

Survival Score should consider:

- weekly usage count
- monthly usage count
- estimated cost level
- last used date
- user reminder potential
- high-cost low-use penalty

Status rules:

```txt
Score >= 70: SAFE
40 <= Score < 70: REMINDER_RECOMMENDED
Score < 40: DELETION_RECOMMENDED
```

The exact formula is defined in DATA_MODEL.md and tested in TEST_MAPPING.md.

---

## 10. Data Requirement

MVP uses mock/local data.

Persistent data required:
Optional. localStorage may be used, but core demo must work from bundled sample data.

---

## 11. API Requirement

API required for MVP:
No.

Reason:
The product can demonstrate value with local/mock plugin usage data.

Future API work:
- real Codex plugin inventory sync
- real usage telemetry
- anonymous leaderboard sync

---

## 12. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-001 | Codex plugin usage API may not exist | use mock/local data |
| R-002 | cost per plugin may be unavailable | label as estimated cost |
| R-003 | deletion action is dangerous | recommend only, never delete |
| R-004 | leaderboard requires user data | use anonymous mock data in MVP |
| R-005 | IP/name risk from survival-game theme | use Coqid-game and avoid direct protected branding |

---

## 13. Scope Freeze

Frozen MVP decision:

```txt
Coqid-game recommends deletion candidates only.
It does not delete, uninstall, disable, or modify real plugins.
```
