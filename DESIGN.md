---
name: ASALDESIGN
colors:
  bg: "#0D0D0D"
  on-bg: "#FFFFFF"
  on-bg-muted: "#AAAAAA"
  surface: "#FFFFFF"
  on-surface: "#0D0D0D"
  on-surface-muted: "#666666"
  border: "rgba(255,255,255,0.12)"
  badge-dark: "#0D0D0D"
  badge-soft: "#EFEFEF"
typography:
  hero:
    fontFamily: Neue Haas Grotesk
    fontSize: clamp(64px, 12vw, 128px)
    fontWeight: 900
    letterSpacing: -0.02em
  section:
    fontFamily: Neue Haas Grotesk
    fontSize: clamp(32px, 5vw, 56px)
    fontWeight: 800
  body:
    fontFamily: Neue Haas Grotesk
    fontSize: 12px
    fontWeight: 400
rounded:
  card: 16px
  card-lg: 20px
  thumb: 12px
  pill: 9999px
---

# Design System

## Overview

검정 위의 흰 글자. 흰 위의 검정 글자. 그게 전부다.

ASALDESIGN은 UI 디자이너의 포트폴리오다. 여기서 시각적으로 가장 화려한 건 **작업물 자체**여야 한다. 그래서 레이아웃 크롬은 철저히 침묵한다. 배경은 어둡고 무겁고, 그 위에 흰 타이포그래피가 쾅 내려앉는다. 색은 거의 없다. 대신 무게가 있다.

**한 줄로**: 디자이너가 직접 타이포그래피로 찍은 도장.

핵심 원칙은 세 가지:
1. **타이포그래피가 디자인이다** — 레이아웃 장식 없이 글자 크기와 굵기만으로 위계를 만든다
2. **검정과 흰색, 둘만 존재한다** — 색은 프로젝트 썸네일 안에서만 허용된다
3. **카드는 대비로 떠오른다** — 그림자가 아니라 어두운 배경 위의 흰 면으로 공간감을 만든다

## Colors

### 시그널 컬러 (Signal — 의미가 있는 색)

- **On-bg `#FFFFFF`**: 헤딩, 버튼 텍스트, 아이콘. 어두운 캔버스 위 유일한 발화
- **Surface `#FFFFFF`**: 프로젝트 카드, 어치브먼트 카드. 다크 배경 위에 놓인 흰 면

### 베이스 컬러 (Base — 침묵하는 색)

- **BG `#0D0D0D`**: 메인 캔버스. 완전한 검정보다 살짝 따뜻하다. grain texture와 조합해서 숨을 붙인다
- **On-bg Muted `#AAAAAA`**: 바이오, 설명문. 흰색보다 두 단계 내려온 자리. 읽히지만 튀지 않는다
- **On-surface Muted `#666666`**: 카드 내부 설명. 흰 카드 위에서 본문보다 뒤로 물러나는 텍스트
- **Border `rgba(255,255,255,0.12)`**: 내비 하단 라인, 바이오 컬럼 구분선. 거의 보이지 않는 게 맞다

### 프로젝트 Accent (썸네일 전용 — 레이아웃에 절대 쓰지 않는다)

- **Music Player**: `#6D28D9 → #C4B5FD` (보라 그라디언트)
- **Games Streaming**: `#1A0A0A` (딥 다크)
- **Task Management**: `#F97316` (오렌지)
- **Real Estate**: `#3B82F6` (블루)

이 색들은 **작업물의 색**이지 시스템의 색이 아니다. 내비, 버튼, 텍스트, 어디에도 꺼내 쓰지 않는다.

### 컬러 사용 비율

```
검정 (BG)        ████████████████████████████████  65%
흰색 (Surface)   ████████████░░░░░░░░░░░░░░░░░░░░  25%
회색 (Muted)     ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  8%
Accent (thumb)   █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  2%
```

Accent가 2%인 게 의도적이다. 프로젝트 썸네일 밖에서 색이 보이면 무언가 잘못된 것이다.

## Typography

**Neue Haas Grotesk 단일 패밀리**. 울트라 볼드부터 레귤러까지, 같은 폰트가 위계 전체를 담당한다.

### 위계

- **Hero (clamp 64–128px / 900)**: 브랜드 이름 "ASALDESIGN", 섹션 클로저 "GET IN TOUCH". 이 타이틀이 레이아웃의 가장 큰 시각 요소다
- **Section (clamp 32–56px / 800)**: "FEATURED PROJECTS", "ACHIEVEMENT". 섹션 전환을 글자 크기로 알린다
- **Card Title (18px / 800)**: 어치브먼트 카드 헤딩. Uppercase, 카드 안에서 가장 크다
- **Project Title (15px / 700)**: 프로젝트 카드 제목. 카드 내 위계의 최상단
- **Subtitle (clamp 11–15px / 500)**: 히어로 섹션 태그라인. Uppercase, 자간 0.04em
- **Body (12px / 400)**: 바이오 컬럼, 카드 설명. 읽히되 시선을 잡지 않는다
- **Nav / Label (11px / 400–500)**: 내비게이션, 푸터 링크. Uppercase, 자간 0.06em

### 미세 조정

- 히어로 타이틀은 `letter-spacing: -0.02em`. 큰 글자는 좁혀야 단단해 보인다
- 다크 배경 Body는 `#AAAAAA`. 풀 화이트를 본문에 쓰면 배경과 대비가 너무 강해 피로해진다
- Weight 400 미만은 사용 금지. 어두운 배경에서 씬 폰트는 가독성이 무너진다
- Uppercase는 버튼·서브타이틀·라벨에만. 본문 Uppercase는 쓰지 않는다

## Components

### Buttons

- **Outline**: 투명 배경 + 흰 1.5px 보더 + 흰 텍스트. Dribbble, Instagram, LinkedIn 같은 외부 링크용
- **Solid**: 흰 배경 + 검정 텍스트. "Contact Me", "See More", 활성 탭. 한 섹션에 하나만
- **Card CTA**: 검정 배경 + 흰 텍스트. "View Design", "View Full Here". 카드 안에서 쓴다
- 모든 버튼은 `border-radius: 9999px`. 예외 없음

> 버튼이 보라색도 파란색도 아닌 이유: 색이 없어야 작업물이 돋보인다. 버튼의 무게는 채도가 아니라 명도 대비에서 온다. Outline은 섬세하게, Solid는 무겁게. 둘의 차이가 위계를 만든다.

```
padding:        12px 28px
border-radius:  9999px
font-size:      13px
font-weight:    600
letter-spacing: 0.06em
text-transform: uppercase
transition:     all 0.2s ease
```

**States**
- `hover` Outline → 흰색으로 채워지고 텍스트는 검정으로 반전
- `focus` → `outline: 2px solid #FFFFFF; outline-offset: 3px`
- `disabled` → `opacity: 0.38`

### Tab Filter

```
활성: 흰 배경 + 검정 텍스트 + pill 라운드
비활성: 배경 없음 + 흰 텍스트
```

"Exploration / Case Study" 필터에만 등장. 버튼이 아니라 선택 상태 표시자다.

### Project Cards

흰 카드가 어두운 배경 위에 놓인다. 그림자가 아니라 배경과의 대비가 카드를 공간에서 떠오르게 한다.

```
background:    #FFFFFF
border-radius: 20px
overflow:      hidden
```

| 영역 | 스펙 |
|---|---|
| 썸네일 | 높이 200px, overflow hidden, 배경은 프로젝트별 accent |
| 콘텐츠 패딩 | 16px |
| 프로젝트 타이틀 | 15px / 700 / `#0D0D0D` |
| 설명 | 12px / 400 / `#666666` |
| View 링크 | 12px / 500 / `#0D0D0D` + ↗ 아이콘 |
| 그리드 | 2열, gap 20px |

카드 안에 카드를 넣지 말 것. 중첩은 즉시 답답해진다.

### Achievement Cards

```
background:    #FFFFFF
border-radius: 16px
padding:       20px
```

**배지 행 (카드 상단)**

| 배지 유형 | 배경 | 텍스트 | 예시 |
|---|---|---|---|
| 순위 | `#0D0D0D` | `#FFFFFF` | 1st Place, 3rd Place |
| 카테고리 | `#EFEFEF` | `#333333` | Design Challenge |

배지는 모두 pill. 카드 내 가장 작은 요소지만 정보 위계의 시작점이다.

레이아웃: 2열 캐러셀, 하단에 `< >` 네비게이션.

### Navbar

```
height:         56px
background:     transparent
layout:         3열 flex (좌: 역할, 중앙: 이름, 우: 브랜드)
border-bottom:  1px solid rgba(255,255,255,0.12)
font:           11px / 400 / #FFFFFF
```

Navbar는 존재감이 없어야 한다. 경계선 하나로 구역만 나누고 사라진다.

### Background Texture

grain/noise 오버레이가 전체 어두운 섹션에 깔린다.

```
opacity:    0.04
blend-mode: overlay
```

이게 없으면 배경이 죽은 검정이 된다. 있으면 배경이 숨을 쉰다. 보이지 않아야 하는데 없으면 이상하다는 걸 아는 디테일이다.

## Do's and Don'ts

### ✅ Do

- **배경은 `#0D0D0D` 하나** — 틴트도, 변형도 없다. 어두운 영역은 전부 같은 검정이다
- **흰 카드는 어두운 배경 위에서만** — 라이트 배경 위의 흰 카드는 이 시스템과 맞지 않는다
- **모든 버튼은 pill** — 컴포넌트마다 라운드 값이 달라지는 순간 시스템이 흔들린다
- **Accent 색은 썸네일 안에서만** — 버튼, 텍스트, 배경에 꺼내 쓰는 순간 작업물이 배경으로 밀린다
- **grain texture는 항상** — 없애고 싶어도 없애지 말 것. 배경이 너무 납작해진다

### ❌ Don't

- **텍스트에 그림자 쓰지 말 것** — 그림자는 카드 컨테이너의 것이다
- **pill과 non-pill을 한 뷰에서 섞지 말 것** — 라운드 혼용은 시스템 붕괴 신호다
- **Accent 색을 내비, 버튼, 레이아웃 크롬에 끌어오지 말 것** — Accent는 작업물의 언어다
- **`#AAAAAA`보다 밝은 색으로 muted 표현하지 말 것** — 다크 테마 응집력이 무너진다
- **한 섹션에 Solid 버튼 두 개 이상 두지 말 것** — Solid는 한 화면에 한 번만 눌러야 하는 버튼이다

## Voice & Tone (시각적 톤)

이 디자인이 사람이라면:
- 자기 소개를 90px 폰트로 한다
- 그런데 이상하게 시끄럽지 않다
- 화려하게 꾸미지 않는다. 작업물이 스스로 말하게 둔다

UI에서 이걸 어떻게 구현하나:
- 여백이 많아 보여도 줄이지 말 것. 타이포가 크면 주변 공간도 크게 필요하다
- 아이콘은 최소화. 화살표(↗)와 캐러셀 화살표(< >) 정도면 충분하다
- 애니메이션은 `0.2s ease`. 빠르지도 느리지도 않게. 검정 포트폴리오에 bounce는 없다

## Creative Latitude (창작 시 허용 범위)

이 시스템 위에서 새로운 화면을 만들 때, 다음은 **자유롭게 결정해도 된다**:

- 카드 내부 레이아웃 — 그리드, 리스트, 풀블리드 이미지 등
- 프로젝트 썸네일 내부 구성 — 단, Accent 색은 해당 프로젝트의 것만
- hover 마이크로 인터랙션 세부 — `translateY(-4px)` 대신 살짝 다른 값도 허용
- 빈 상태(empty state) 텍스트 톤 — 단, 폰트와 색은 시스템 그대로
- 섹션 순서 — 단, Navbar와 "GET IN TOUCH" 클로저 위치는 고정

다음은 **건드리지 말 것**:

- 배경색 변형 추가 (`#0D0D0D` 외 다크 틴트 신규 도입 금지)
- 폰트 패밀리 추가 (serif, rounded 계열 혼용 금지)
- 라운드 스케일 변경 (pill / 20px / 16px / 12px 외 신규 값 금지)
- 그림자 농도 강화 (카드는 배경 대비로 뜨는 것이지 그림자로 뜨는 게 아니다)
- Accent 색의 레이아웃 크롬 침범

## When to use this MD vs JSON

- **JSON (`design.json`) 사용**: 정확한 색상값·픽셀값을 개발에 적용할 때, 디자인 QA 체크리스트로 쓸 때, 빌드 시스템에 토큰으로 주입할 때
- **MD (`design.md`) 사용**: 새 섹션이나 화면을 설계할 때, "왜 이렇게 만들었는지" 팀에 공유할 때, AI에게 이 포트폴리오 스타일로 새 화면 만들어달라 요청할 때 컨텍스트로 첨부할 때