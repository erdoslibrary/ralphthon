# PRODUCT_IDEA.md

## 0. Purpose

This document is the human-filled product seed after the hackathon theme is revealed. Do not implement production code before this file is completed.

## 1. Hackathon Theme

```txt
Theme: Track 1 — Codex Plugin
Theme constraints:
  - Codex에 직접 연결해 쓸 수 있는 확장 기능
  - 단순 프롬프트 모음이 아닌 tool / skill / workflow 형태
  - 설치 방법, 설정 파일, README 포함
  - 데모에서 Codex가 플러그인을 호출하고 결과를 만드는 장면 필수
Judging criteria:
  - 실제 반복 업무 감소 여부
  - 다른 참가자가 바로 따라 설치 가능 여부
  - 재사용 가능한 형태(tool/skill/workflow)
  - 데모 완성도
```

## 2. Product Candidate

```txt
Product name: Codex Squid Game (오징어게임 플러그인 관리자)
One-line idea: 설치된 Codex 플러그인/스킬을 생존 게임 참가자로 만들어, 사용량이 낮은 것들을 삭제 검토 대상으로 추천하거나 리마인드하는 플러그인 라이프사이클 매니저
Primary user: Codex를 자주 쓰며 플러그인을 여러 개 설치했지만 실제로 다 쓰는지 모르는 개발자
User problem:
  - 설치만 해두고 안 쓰는 플러그인이 쌓임
  - 어떤 플러그인이 유용한지 커뮤니티 기준이 없음
  - 유용한 플러그인을 잊어버리고 안 씀
Core mechanism:
  1. audit — 설치된 플러그인의 7일간 호출 횟수를 스캔
  2. challenge — 미달 플러그인에게 달고나 미션(리마인드) 부여
  3. recommend — 미션 실패/저점 플러그인을 삭제 검토 대상으로 표시하되 실제 삭제는 하지 않음
  4. leaderboard — 로컬 샘플 호출 순위 표시 (주별/월별)
Expected result:
  - 실제로 쓰는 플러그인만 남아서 환경이 깔끔해짐
  - 잊었던 플러그인 기능을 리마인드받아 재사용
  - 로컬 순위로 유망 플러그인 발견
```

## 3. Core Demo Flow

The final demo must be possible in under 2 minutes.

```txt
Step 1: Open local Coqid-game dashboard
  → sample plugins appear as contestants
  → no live Codex API required

Step 2: Click Run Survival Check
  → each plugin receives deterministic survival score
  → statuses appear: Safe / Reminder Recommended / Deletion Recommended

Step 3: Review deletion recommendation
  → "Coqid-game only recommends review. It does not delete plugins automatically."
  → no uninstall, delete, disable, or file modification occurs

Step 4: View leaderboard
  → "이번 주 생존율 1위" style ranking appears from local sample data
  → 주별/월별 탭 전환 가능

Final visible result:
  - Coqid-game이 플러그인을 심사하고 삭제 검토/리마인드/안전 상태를 보여주는 장면
  - 로컬 샘플 기반 플러그인 순위가 보이는 장면
```

## 4. Must-Have Scope

| ID | Must-have | Why required for demo? |
|---|---|---|
| MUST-001 | 로컬 대시보드에서 샘플 플러그인 목록 표시 | 데모 시작점, 없으면 아무것도 안 됨 |
| MUST-002 | 생존 점수 계산 및 상태 분류 | 핵심 차별화 기능 |
| MUST-003 | 삭제 검토 추천 표시, 실제 삭제 없음 | 안전한 임팩트 장면 |
| MUST-004 | 리마인드 추천 표시 | 잊힌 유용한 플러그인 재사용 유도 |
| MUST-005 | 주간/월간 로컬 리더보드 | 순위 기능 데모에 필수 |
| MUST-006 | README/배포 문서에 설치, 실행, 검증 방법 기록 | 심사 기준 직접 충족 |

## 5. Out of Scope

| ID | Out-of-scope item | Reason |
|---|---|---|
| OUT-001 | 커뮤니티 순위 (Supabase 백엔드) | 로컬 순위로 대체 |
| OUT-002 | 달고나 미션 타이머 UI | ASCII 출력으로 대체 |
| OUT-003 | 플러그인 마켓 연동 (skills.sh 등) | 스코프 크립 위험 |
| OUT-004 | 실제 Codex 플러그인 uninstall/disable | 파괴적 동작이며 MVP 안전 규칙 위반 |
| OUT-005 | 다중 에이전트 지원 (Gemini CLI 등) | Codex 전용으로 집중 |

## 6. Constraints

```txt
Time limit: 2시간 30분
Tech constraints:
  - Node.js
  - 단일 로컬 웹 대시보드
  - mock/local sample data
External API needed: NO
Persistence needed: NO (optional localStorage only)
Authentication needed: NO
Deployment required: NO (local demo)
```

## 7. Initial Risk Notes

```txt
- Theme ambiguity: "사용량" 측정 방법 — MVP에서는 mock/local sample data로 해결
- Demo risk: 실제 삭제는 하지 않고 삭제 검토 추천만 표시
- API/AI risk: live API 없음
- Deployment risk: 없음 (배포 불필요, git clone + codex plugin install로 충분)
- 경쟁자 리스크: CodexBar와 차별화 명확 (조회 vs 액션), 직접 경쟁자 없음
```

## 8. Completion Gate

```txt
[x] Theme is recorded
[x] Primary user is selected
[x] Core problem is clear
[x] Core demo flow exists
[x] Must-have scope exists
[x] Out-of-scope items exist
```
