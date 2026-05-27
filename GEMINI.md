# MyLink - Project Instructions

This file defines the structure, technology stack, development conventions, and key workflows for the MyLink project. Refer to this as the primary guide when collaborating with Gemini CLI.

## 1. Project Overview
- **Purpose**: A simple link page service (Linktree clone) that integrates scattered online activities into a single unique URL.
- **Key Features**:
    - **Authentication**: Firebase Auth (Google Login only).
    - **Nickname-based URL**: Unique addresses in `my-link.com/{displayName}` format.
    - **Inline Editing**: Immediate profile and link editing on screen without page navigation.
    - **Link Management (CRUD)**: Title/URL storage and automatic favicon integration via Google Favicon API.
    - **Responsive Profile Page**: Public pages using the ASALDESIGN system (High-contrast minimalism).
- **Documentation**: See `@docs/PRD.md` for detailed requirements.

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, ASALDESIGN System (Black & White)
- **Backend**: Firebase Firestore, Firebase Auth
- **Infrastructure**: Node.js (npm)

## 3. Key Commands
- **Run Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Check**: `npm run lint`
- **Format**: `npm run format` (Prettier)
- **Type Check**: `npm run typecheck`

## 4. Directory Structure
- `@app/`: Pages and layouts (Next.js App Router)
- `@components/`: Reusable UI components and shadcn/ui components
- `@docs/`: Design documents (PRD, User Scenario, Wireframe)
- `@hooks/`: Custom React Hooks
- `@lib/`: Utilities and configuration files
- `@public/`: Static assets (images, favicons, etc.)

## 5. Development Conventions & Principles
- **TypeScript First**: All files must be `.ts` or `.tsx` with strict type checking.
- **Security Rules**: Always update `@firestore.rules` accordingly when the database structure or access patterns change.
- **App Router Usage**: Prefer Server Components; use `'use client'` only for interactions.
- **Inline Editing UX**: Implement all edits using inline editing for better UX (see ✎ icon in `@docs/WIREFRAME.md`).
- **Surgical Updates**: Make precise changes; avoid unnecessary refactoring.
- **Design System**: Follow ASALDESIGN (Black & White high-contrast minimalism) using Tailwind CSS.
- **Commit Messages**: Always write Git commit messages in **English**.
- **File References**: Use the `@filename` format when referring to files in documentation.

## 6. Screen Structure & UI Principles (Refer to `@docs/WIREFRAME.md`)
- **User Flow**: Landing Page -> Google Login -> Onboarding/Dashboard -> Public Profile Page.
- **Main Layouts**:
    - **Main Landing**: Simple intro with Google Login CTA.
    - **Dashboard (Admin)**: Profile area (Avatar, Name, ID, Bio) and Link management area (Link list, Add button). Editable elements show `✎`.
    - **Public Profile (Visitor)**: Read-only page without edit tools. Links are displayed as cards with "Powered by MyLink" branding.
- **Design Details**:
    - High-contrast layout: Background `#0D0D0D` (Black), Content `#FFFFFF` (White).
    - Instant management via Trash icon in link blocks.

## 7. Progress & TODO
- [x] Project initialization (Next.js 16, TS, Tailwind CSS 4)
- [x] Structure and documentation ( `@docs/PRD.md`, `@docs/USER_SCENARIO.md`, `@docs/WIREFRAME.md` )
- [ ] Firebase setup and Auth implementation (Google Login)
- [ ] Dashboard (Admin) development (Inline profile editing)
- [ ] Link CRUD and auto-favicon implementation
- [ ] Public profile page development
- [ ] Deployment and final verification
