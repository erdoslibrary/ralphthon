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
One-line idea: 설치된 Codex 플러그인/스킬을 오징어게임 참가자로 만들어, 사용량이 낮은 것들을 처형하거나 리마인드하는 플러그인 라이프사이클 매니저
Primary user: Codex를 자주 쓰며 플러그인을 여러 개 설치했지만 실제로 다 쓰는지 모르는 개발자
User problem:
  - 설치만 해두고 안 쓰는 플러그인이 쌓임
  - 어떤 플러그인이 유용한지 커뮤니티 기준이 없음
  - 유용한 플러그인을 잊어버리고 안 씀
Core mechanism:
  1. audit — 설치된 플러그인의 7일간 호출 횟수를 스캔
  2. challenge — 미달 플러그인에게 달고나 미션(리마인드) 부여
  3. execute — 미션 실패 시 자동 uninstall + 오징어게임 연출
  4. leaderboard — 로컬/커뮤니티 호출 순위 표시 (주별/월별)
Expected result:
  - 실제로 쓰는 플러그인만 남아서 환경이 깔끔해짐
  - 잊었던 플러그인 기능을 리마인드받아 재사용
  - 커뮤니티 순위로 유망 플러그인 발견
```

## 3. Core Demo Flow

The final demo must be possible in under 2 minutes.

```txt
Step 1: codex @squid-game audit
  → "6개 플러그인 중 2개가 7일간 미사용 — 달고나 라운드 시작"
  → ASCII 오징어게임 연출 출력

Step 2: codex @squid-game challenge --plugin=my-sql-helper
  → "⏳ 미션: SQL 쿼리 최적화 task를 지금 실행하세요. 제한시간 3분!"
  → (미션 실패 시) challenge expired 처리

Step 3: codex @squid-game execute --plugin=my-sql-helper
  → "💀 my-sql-helper 처형 완료. 무궁화 꽃이 피었습니다."
  → 내부적으로 codex plugin uninstall my-sql-helper 자동 실행

Step 4: codex @squid-game leaderboard --mode=community
  → "이번 주 생존율 1위: github-pr-reviewer (전체 호출 342회)"
  → 주별/월별 탭 전환 가능

Final visible result:
  - Codex가 플러그인을 스스로 심사하고, 살릴지/죽일지 결정하는 장면
  - 커뮤니티 기반 플러그인 순위가 실시간으로 보이는 장면
```

## 4. Must-Have Scope

| ID | Must-have | Why required for demo? |
|---|---|---|
| MUST-001 | `audit` 커맨드 (설치 플러그인 호출 횟수 스캔) | 데모 시작점, 없으면 아무것도 안 됨 |
| MUST-002 | `execute` 커맨드 (자동 uninstall + 오징어게임 메시지) | 핵심 차별화 기능, 임팩트 장면 |
| MUST-003 | `leaderboard` 커맨드 (로컬 순위) | 순위 기능 데모에 필수 |
| MUST-004 | `SKILL.md` (Codex 자연어 명령 처리) | 플러그인으로 동작하려면 필수 |
| MUST-005 | `plugin.json` manifest | Codex 플러그인 등록에 필수 |
| MUST-006 | README (설치 방법 + 설정) | 심사 기준 직접 충족 |

## 5. Out of Scope

| ID | Out-of-scope item | Reason |
|---|---|---|
| OUT-001 | 커뮤니티 순위 (Supabase 백엔드) | 시간 여유 있을 때만 추가, 로컬 순위로 대체 가능 |
| OUT-002 | 달고나 미션 타이머 UI | ASCII 출력으로 대체 |
| OUT-003 | 플러그인 마켓 연동 (skills.sh 등) | 스코프 크립 위험 |
| OUT-004 | 웹 대시보드 | 2.5시간 내 불가 |
| OUT-005 | 다중 에이전트 지원 (Gemini CLI 등) | Codex 전용으로 집중 |

## 6. Constraints

```txt
Time limit: 2시간 30분
Tech constraints:
  - Node.js / TypeScript
  - Codex plugin.json manifest 형식 준수
  - 로컬 파일 접근 (~/.codex/ 디렉터리)
External API needed: YES (Supabase — 커뮤니티 순위, optional)
Persistence needed: YES (로컬 usage.json 파일)
Authentication needed: NO (로컬 모드) / YES (Supabase 옵트인 시)
Deployment required: NO (로컬 설치형 플러그인)
```

## 7. Initial Risk Notes

```txt
- Theme ambiguity: "사용량" 측정 방법 — Codex 로그 파일 구조가 버전마다 다를 수 있음
- Demo risk: 실제 codex plugin uninstall 실행 시 데모 환경 복구 필요 (dry-run 모드 준비)
- API/AI risk: Supabase 연결 실패 시 로컬 모드로 자동 fallback
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
