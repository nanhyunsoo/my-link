# [PRD] MyLink - Integrated Link Management Service

## 1. Project Overview
- **Project Name**: MyLink
- **Purpose**: The simplest link page service that integrates scattered personal online activities into a single unique URL (nickname-based).
- **Target Users**:
  - Users who want to quickly gather their links on one page without complex settings.

## 2. Core Feature List (Must-Have)
1. **User Authentication**: Social login only via Google through Firebase Auth.
2. **Nickname-based URL**: The **displayName**, initially set as the local part of the Google email address (ID), becomes the unique address (URL slug) for the profile page (e.g., `my-link.com/gmail_id`).
3. **Inline Editing**: All modifications including displayName, userName, bio, and link information are edited and saved immediately on the screen without separate page navigation.
4. **Link Management (CRUD)**:
    - Stored items: `id`, `title`, `url`, `faviconUrl`, `clicks`.
    - No sorting or activation toggle features.
5. **Automatic Favicon**: Automatically fetch and display icons for entered URLs using the Google Favicon API.
6. **Profile Management**: Editable displayName, userName, and Bio (introduction). (No image upload feature, but automatically fetches and displays the Google profile image).
7. **Public Profile Page**: A responsive page showing the Google profile image, userName, displayName, Bio, and links when accessed through the set displayName address. (No theme features).

## 3. Detailed Feature Description

### 3.1 User Account and Authentication
- **Social Login**: Supports Google Login only. Upon login, automatically fetches the **local part of the Google email** as the initial `displayName`, `userName` (real name), and **profile image URL** (`photoURL`).
- **Database Modeling**:
    - User Document: `displayName` (for URL slug), `userName` (display name), `bio`, `photoURL` (Google profile image).
    - Link Data: **Sub-collection** structure under the user document. Each document includes `id`, `title`, `url`, `faviconUrl`, `clicks`.

### 3.2 Editing and Management
- **Inline Editing**: Provides a UX where clicking text switches it to an input field for immediate modification.
- **Favicon Integration**: Provides icon images using Google's `https://www.google.com/s2/favicons?domain={URL}` API.

### 3.3 Design and Layout
- **ASALDESIGN System**: Black & White high-contrast minimalism theme (single theme).
- **UI Library**: Based on shadcn/ui.

## 4. Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, ASALDESIGN System
- **Authentication**: Firebase Auth (Google Login)
- **Database**: Firebase Firestore (Sub-collection)
- **External API**: Google Favicon API
- **Infrastructure**: Node.js

## 5. Related Documents
- **User Scenario**: `docs/USER_SCENARIO.md`
- **Wireframe**: `docs/WIREFRAME.md`
