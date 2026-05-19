# [PRD] 마이링크 (MyLink) - 통합 링크 관리 서비스

## 1. 프로젝트 개요
- **프로젝트명**: 마이링크 (MyLink)
- **목적**: 흩어져 있는 개인의 온라인 활동을 하나의 고유한 URL(닉네임 기반)로 통합하여 보여주는 가장 단순한 링크 페이지 서비스.
- **대상 사용자**: 
  - 복잡한 설정 없이 자신의 링크들을 빠르게 한 페이지에 모으고 싶은 사용자.

## 2. 핵심 기능 목록 (Must-Have)
1. **사용자 인증**: Firebase Auth를 통한 구글 소셜 로그인 전용 인증.
2. **닉네임 기반 URL**: 구글 이메일의 앞부분(ID)을 초기값으로 설정한 **디스플레이 네임(displayName)**이 프로필 페이지의 고유 주소(URL 슬러그)가 됨 (예: `my-link.com/gmail_id`).
3. **인라인 편집 (Inline Editing)**: 디스플레이 네임(displayName), 실제 이름(userName), Bio, 링크 정보 등 모든 수정 사항은 별도의 페이지 이동 없이 화면에서 즉시 편집하고 저장.
4. **링크 관리 (CRUD)**: 
    - 저장 항목: `id`, `title`, `url`, `faviconUrl`.
    - 정렬 및 활성화 토글 기능 없음.
5. **자동 파비콘**: Google Favicon API를 사용하여 입력된 URL의 아이콘을 자동으로 가져와 표시.
6. **프로필 관리**: 디스플레이 네임(displayName), 실제 이름(userName), Bio(소개글) 편집 가능. (이미지 업로드 기능은 없으나, 구글 프로필 이미지를 자동으로 가져와 표시함)
7. **공개 프로필 페이지**: 설정된 디스플레이 네임(displayName) 주소로 접속 시 구글 프로필 이미지, 실제 이름(userName), 디스플레이 네임, Bio, 링크를 보여주는 반응형 페이지. (테마 기능 없음)

## 3. 기능 상세 설명

### 3.1 사용자 계정 및 인증
- **소셜 로그인**: 구글 로그인만 지원하며, 로그인 시 **구글 이메일 주소의 앞부분**을 `displayName`의 초기값으로, `userName`(실제 이름), **프로필 이미지 URL**(`photoURL`)을 자동으로 가져옴.
- **데이터베이스 모델링**: 
    - 사용자 문서: `displayName` (URL 슬러그용), `userName` (실제 이름/표시용), `bio`, `photoURL` (구글 프로필 이미지).
    - 링크 데이터: 사용자 문서 하위의 **Sub-collection** 구조. 각 문서엔 `id`, `title`, `url` 포함.

### 3.2 편집 및 관리
- **인라인 편집**: 텍스트 클릭 시 입력 필드로 전환되어 즉시 수정 가능한 UX 제공.
- **파비콘 연동**: Google의 `https://www.google.com/s2/favicons?domain={URL}` API를 사용하여 아이콘 이미지 제공.

### 3.3 디자인 및 레이아웃
- **ASALDESIGN 시스템**: 블랙 & 화이트 고대비 미니멀리즘 테마 (단일 테마).
- **UI 라이브러리**: shadcn/ui 기반.

## 4. 기술 스택 (Technical Stack)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, ASALDESIGN System
- **Authentication**: Firebase Auth (Google Login)
- **Database**: Firebase Firestore (Sub-collection)
- **External API**: Google Favicon API
- **Infrastructure**: Node.js

## 5. 관련 문서 (Related Documents)
- **사용자 시나리오 (User Scenario)**: `docs/USER_SCENARIO.md` (예정)
- **와이어프레임 (Wireframe)**: `docs/WIREFRAME.md` (예정)
