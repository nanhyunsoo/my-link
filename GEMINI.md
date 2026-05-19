# MyLink (마이링크) - Project Instructions

이 파일은 MyLink 프로젝트의 구조, 기술 스택, 개발 컨벤션 및 주요 워크플로우를 정의합니다. Gemini CLI와 협업할 때 이 지침을 최우선으로 참고합니다.

## 1. 프로젝트 개요
- **목적**: 여러 링크를 하나의 프로필 페이지로 통합 관리하고 공유하는 링크트리(Linktree) 클론 서비스.
- **주요 기능**:
    - 사용자 계정 관리 (회원가입/로그인)
    - 링크 블록 CRUD 및 드래그 앤 드롭 정렬
    - 프로필 이미지 및 바이오 관리
    - 고유 URL을 통한 마이링크 페이지 공개 (반응형 웹 최적화)
- **문서**: 상세 요구사항은 `docs/PRD.md`를 참고하세요.

## 2. 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React (Client Components)
- **Infrastructure**: Node.js (npm 사용)

## 3. 주요 명령어
- **개발 서버 실행**: `npm run dev` (기본 포트: 3000)
- **빌드**: `npm run build`
- **프로덕션 서버 시작**: `npm run start`
- **린트 체크**: `npm run lint`

## 4. 디렉토리 구조
- `src/app/`: App Router 기반의 페이지 및 레이아웃 정의
- `src/components/`: 재사용 가능한 UI 컴포넌트 (추가 예정)
- `public/`: 정적 자산 (이미지, 폰트 등)
- `docs/`: PRD 및 설계 문서

## 5. 개발 컨벤션 및 원칙
- **TypeScript 우선**: 모든 새로운 파일은 `.ts` 또는 `.tsx`로 작성하며, 엄격한 타입 체크(`strict: true`)를 준수합니다.
- **App Router 활용**: 서버 컴포넌트(Server Components)를 기본으로 사용하고, 상호작용이 필요한 경우에만 `'use client'`를 사용하여 클라이언트 컴포넌트로 분리합니다.
- **Tailwind CSS 스타일링**: 인라인 스타일 대신 Tailwind 유틸리티 클래스를 사용하여 디자인을 구현합니다.
- **Surgical Updates**: 코드 수정 시 변경이 필요한 부분만 정확하게 수정하며, 불필요한 리팩토링은 지양합니다.
- **문서화**: 새로운 기능 추가 시 `docs/` 폴더 내 관련 문서를 업데이트하거나 `GEMINI.md`에 반영합니다.
- **커밋 메시지**: Git 커밋 메시지는 항상 한글로 작성합니다.

## 6. 진행 상황 및 TODO
- [x] 프로젝트 초기화 (Next.js, TS, Tailwind)
- [x] 개발 환경 설정 및 서버 실행 확인
- [ ] 사용자 계정 관리 기능 구현
- [ ] 링크 관리 CRUD 구현
- [ ] 프로필 설정 및 퍼블리싱 페이지 구현
