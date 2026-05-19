# MyLink (마이링크) - 프로젝트 지침서

이 파일은 MyLink 프로젝트의 구조, 기술 스택, 개발 컨벤션 및 주요 워크플로우를 정의합니다. Gemini CLI와 협업할 때 이 지침을 최우선으로 참고합니다.

## 1. 프로젝트 개요
- **목적**: 흩어져 있는 개인의 온라인 활동을 하나의 고유한 URL(닉네임 기반)로 통합하여 보여주는 가장 단순한 링크 페이지 서비스 (Linktree 클론).
- **주요 기능**:
    - **사용자 인증**: Firebase Auth (구글 로그인 전용).
    - **닉네임 기반 URL**: `my-link.com/{displayName}` 형식의 고유 주소 제공.
    - **인라인 편집 (Inline Editing)**: 별도 이동 없이 화면에서 즉시 프로필 및 링크 수정.
    - **링크 관리 (CRUD)**: 제목, URL 저장 및 자동 파비콘(Google Favicon API) 연동.
    - **반응형 프로필 페이지**: ASALDESIGN 시스템(고대비 미니멀리즘)이 적용된 공개 페이지.

## 2. 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, ASALDESIGN System (Black & White)
- **Backend**: Firebase Firestore, Firebase Auth
- **Infrastructure**: Node.js (npm 사용)

## 3. 주요 명령어
- **개발 서버 실행**: `npm run dev`
- **빌드**: `npm run build`
- **프로덕션 서버 시작**: `npm run start`
- **린트 체크**: `npm run lint`
- **코드 포맷팅**: `npm run format` (Prettier)
- **타입 체크**: `npm run typecheck`

## 4. 디렉토리 구조
- `app/`: Next.js App Router 기반의 페이지 및 레이아웃
- `components/`: 재사용 가능한 UI 컴포넌트 및 shadcn/ui 컴포넌트
- `docs/`: PRD, 사용자 시나리오, 와이어프레임 등 설계 문서
- `hooks/`: 커스텀 React Hooks
- `lib/`: 유틸리티 함수 및 설정 파일
- `public/`: 정적 자산 (이미지, 파비콘 등)

## 5. 개발 컨벤션 및 원칙
- **TypeScript 우선**: 모든 파일은 `.ts` 또는 `.tsx`로 작성하며 엄격한 타입 체크를 준수합니다.
- **App Router 활용**: 서버 컴포넌트를 기본으로 사용하고 상호작용이 필요한 경우에만 `'use client'`를 사용합니다.
- **인라인 편집 중심 UX**: 사용자 편의를 위해 모든 수정 사항은 인라인 편집 방식으로 구현합니다.
- **Surgical Updates**: 코드 수정 시 필요한 부분만 정확하게 수정하며, 불필요한 리팩토링은 지양합니다.
- **디자인 시스템 준수**: ASALDESIGN (Black & White 고대비 미니멀리즘) 스타일을 Tailwind CSS로 구현합니다.
- **커밋 메시지**: Git 커밋 메시지는 항상 **한글**로 작성합니다.

## 6. 진행 상황 및 TODO
- [x] 프로젝트 초기화 (Next.js 16, TS, Tailwind CSS 4)
- [x] 프로젝트 구조 설정 및 문서화 (PRD, Scenario, Wireframe)
- [ ] Firebase 설정 및 인증 기능 구현 (Google Login)
- [ ] 대시보드(Admin) 화면 개발 (프로필 인라인 편집)
- [ ] 링크 CRUD 및 자동 파비콘 기능 구현
- [ ] 공개 프로필 페이지 개발
- [ ] 배포 및 최종 검증
