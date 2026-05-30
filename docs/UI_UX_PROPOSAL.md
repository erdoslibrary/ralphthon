# Coqid-game 개선 아이디어 제안서

> 현재 코드베이스(`src/styles.css`, `src/app.js`, `src/domain/*.js`)를 기반으로 작성된 구체적 제안입니다.

---

## 1. UI/UX — 오징어게임 테마 Visual Excellence

### 1-1. 컬러 팔레트 전환

제안 팔레트:

```css
:root {
  color-scheme: dark;
  --page: #0a0a0f;
  --panel: #12121a;
  --ink: #f0e6d3;
  --muted: #7a7a8a;
  --line: #2a2a3a;
  --accent: #e31060;
  --accent-strong: #ff1e78;
  --gold: #f5c518;
  --teal: #00e5b8;
  --safe-bg: #001f15;
  --reminder-bg: #1f1600;
  --danger-bg: #1f0005;
  --safe-border: #00e5b8;
  --reminder-border: #f5c518;
  --danger-border: #e31060;
}
```

효과:
- 어두운 배경과 형광 액센트로 survival-game 분위기 강화
- 검정 제복, 네온 핑크, 달고나 황금색, 생존자 민트 톤 반영

### 1-2. 헤더 그라데이션 타이틀

제안:
- `h1`에 핑크/골드/핑크 그라데이션 텍스트 적용
- `.topbar`에 상단 다크 그라데이션과 accent 보더 적용

### 1-3. 달고나 미션 카드 애니메이션

`REMINDER_RECOMMENDED` 카드:
- 황금 테두리 pulse 애니메이션
- hover 시 황금 glow 강조
- 모션 비선호 사용자는 애니메이션 비활성화

### 1-4. 삭제 추천 카드 위험 신호

`DELETION_RECOMMENDED` 카드:
- pink-red 보더
- 미세 flicker 애니메이션
- 모션 비선호 사용자는 애니메이션 비활성화

### 1-5. Survival Check 버튼 스타일

`#run-check`:
- pink-red 그라데이션
- uppercase
- glow shadow
- hover lift

### 1-6. 리더보드 1위 황금 강조

Global Arena 첫 번째 항목:
- gold border
- dark/gold gradient background
- rank를 gold로 강조

### 1-7. 접근성 보장

`prefers-reduced-motion: reduce`에서 reminder/deletion 애니메이션과 leaderboard fade를 끕니다.

---

## 2. 미션 및 시나리오 보강

### 2-1. 달고나 미션(Reminder) 문구 개선

`REMINDER_RECOMMENDED` 상태는 점수 구간별 문구를 사용합니다.

| Score | Message Tone |
|---:|---|
| 40-49 | 마지막 기회 강조 |
| 50-59 | 활동 신호 경고 |
| 60-64 | 심사위원 주목 |
| 65-69 | 부드러운 달고나 넛지 |

문구 후보:
- 달고나 미션 발동: 7일 내 재사용하지 않으면 다음 라운드에서 탈락합니다.
- 심사위원 주목: 이 플러그인은 한 번 더 기회가 있습니다.
- 생존 경고: 활동 신호가 미약합니다. 이번 주가 마지막 기회일 수 있습니다.
- 달고나를 완성하세요: 한 번만 더 호출하면 Safe 등급으로 복귀합니다.

### 2-2. 삭제 추천 문구 강화

`DELETION_RECOMMENDED` 상태:
- 탈락 선언 스타일 문구
- 실제 삭제는 수동으로만 가능하다는 안전 문구
- 기준점 미달 설명

### 2-3. 리더보드 정규화 및 뱃지 확장

정규화 공식:

```js
const periodScore =
  period === "weekly"
    ? Math.min(plugin.weeklyUses * 10, 60) + survivalScore * 0.4
    : Math.min(plugin.monthlyUses * 3, 60) + survivalScore * 0.4;
```

뱃지 확장:
- `ELIMINATED`
- `SURVIVOR`
- `EFFICIENT_SURVIVOR`
- `WEEKLY_CHAMPION`
- `MONTHLY_CHAMPION`
- `ACTIVE`

탭 전환:
- Weekly/Monthly 전환 시 leaderboard fade 애니메이션

---

## 3. 2분 데모 스크립트 개선안

### 오프닝 (0:00 ~ 0:15)

"안녕하세요. 저희 팀은 Codex 플러그인 관리를 오징어게임으로 만들었습니다.
설치만 해두고 안 쓰는 플러그인, 다들 있으시죠?
Coqid-game이 그 플러그인들을 심사합니다."

### Act 1 — Survival Check 실행 (0:15 ~ 0:45)

"먼저 Run Survival Check 버튼을 누릅니다.
각 플러그인의 주간 사용량, 월간 사용량, 비용, 마지막 사용일을 조합해서 생존 점수를 계산합니다.
70점 이상은 Safe. 40~69점은 달고나 미션, 40점 미만은 삭제 검토 권고입니다."

### Act 2 — 달고나 미션 카드 (0:45 ~ 1:05)

"달고나 미션 대상 플러그인을 보면 넛지 메시지가 뜹니다.
잊었던 플러그인을 다시 쓰게 만드는 신호입니다.
실제 삭제는 절대 하지 않습니다. 추천만 합니다."

### Act 3 — 리더보드 (1:05 ~ 1:30)

"오른쪽에 이번 주 생존 순위가 있습니다.
Monthly 탭을 누르면 월간 순위로 전환됩니다.
1위 플러그인에는 황금 테두리가 붙고, Survivor, Weekly Champion 같은 뱃지가 붙습니다."

### Act 4 — 엣지 케이스 (1:30 ~ 1:45)

"빈 데이터나 잘못된 형식을 넣으면 앱이 깨지지 않고 오류 메시지를 보여줍니다."

### 클로징 (1:45 ~ 2:00)

"Coqid-game은 플러그인을 심사해서 유용한 것은 살리고, 잊힌 것은 리마인드하고, 불필요한 것은 검토 대상으로 표시합니다.
실제 삭제는 없습니다. 선택은 개발자가 합니다."

### 데모 리허설 체크리스트

| 항목 | 확인 |
|---|---|
| Safe / Reminder / Deletion 각 1개 이상 | [ ] |
| 달고나 카드 애니메이션 육안 확인 | [ ] |
| Weekly -> Monthly 탭 전환 순위 변화 육안 확인 | [ ] |
| Load Malformed -> 앱 미충돌 확인 | [ ] |
| 전체 발화 1회 타이머 측정 | [ ] |
| 화면 해상도 / 폰트 크기 시인성 확인 | [ ] |

---

## 4. 구현 우선순위

| 순위 | 항목 | 예상 소요 | 임팩트 |
|---|---|---:|---|
| 1 | CSS 변수 팔레트 교체 | 5분 | 전체 분위기 즉시 변환 |
| 2 | 달고나 카드 pulse 애니메이션 | 5분 | 데모 핵심 시각 요소 |
| 3 | 달고나 문구 교체 | 10분 | 스토리텔링 완성 |
| 4 | 리더보드 뱃지 확장 | 10분 | 데모 Act 3 강화 |
| 5 | 타이틀 그라데이션 | 5분 | 비주얼 폴리시 |
| 6 | Survival Check 버튼 스타일 | 5분 | 클릭 유도 강화 |
| 7 | 탭 전환 fade 애니메이션 | 5분 | 데모 전환 스무스 |
