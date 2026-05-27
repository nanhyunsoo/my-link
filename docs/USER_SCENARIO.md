# [USER SCENARIO] MyLink User Scenario

This document defines the normal behavioral flow (Happy Path) and exception situations (Edge Cases) for the two main core users of the MyLink service: the Visitor and the Owner. All modification actions are written based on **Inline Editing**.

---

## 1. Visitor Scenario

### 1.1 Normal Access and Profile Verification
- **The user** enters the shared URL (`my-link.com/displayName`) in the browser address bar **to check** the integrated information of a specific creator or developer.
- **The user** sees the owner's Google profile image, real name (userName), nickname (displayName), and introduction (Bio) at the top of the screen upon accessing the page.

### 1.2 Link Navigation and Redirection
- **The user** scrolls through the link list displayed on the screen **to explore** various online channels (blog, portfolio, SNS, etc.) shared by the owner.
- **The user** visually perceives which service (e.g., GitHub, Velog, Instagram, etc.) each link item connects to through the favicon automatically displayed on the left of each link item.
- **The user** clicks a specific link block **to check** the detailed content of an item of interest. (Clicking opens the corresponding URL in a new tab)

### 1.3 [Exception] Accessing an Invalid Address (404 Error)
- **The user** sees a 'Page Not Found (404)' error screen and a guidance button to return to the main home **to verify** if the address is correct when accessing a non-existent or misspelled MyLink address.

### 1.4 [Exception] Visiting a Profile with No Links
- **The user** sees an 'Empty State' guidance message stating 'No links registered yet' **to perceive** the current state when visiting a page where the owner has only signed up but hasn't added any links yet.

---

## 2. Owner Scenario (Admin)

### 2.1 Login and Initial Setup
- **The user** clicks the 'Sign in with Google' button on the main screen **to create or manage** their MyLink page.
- **The user** sees an Admin screen where the local part of their Google account email is automatically designated as the displayName (URL slug) and their profile picture is applied upon their first login.

### 2.2 [Addition] Sharing My Profile Link (Clipboard Copy)
- **The user** copies their unique address (`my-link.com/displayName`) to the clipboard by clicking the 'Copy My Link' icon (or button) at the top of the screen **to share** their completed MyLink on external channels such as Instagram or a resume.

### 2.3 Inline Modification of Profile Information
- **The user** clicks the displayed displayName text to make it inlined, then types the desired alphanumeric combination and presses Enter (or clicks outside) to save **to change** their nickname (URL address) to be shown to visitors.
- **The user** clicks the corresponding text area to modify it inline and save it immediately **to update** their real name (userName) or introduction (Bio).

### 2.4 [Exception] URL (displayName) Duplication and Validity Check
- **The user** sees a warning message such as 'This address is already in use' or 'Invalid format' and retries from the reverted state **to correct** it if the nickname (displayName) is already being used by someone else or is in an unallowed format (e.g., special characters) after pressing Enter to have their own unique URL.

### 2.5 Adding a Link
- **The user** clicks the 'Add New Link' button on the screen **to register** a new portfolio or SNS address on their page.
- **The user** enters each piece of information by clicking the title and URL fields when an empty link block appears at the top (or bottom) of the list.
- **The user** verifies that the system automatically fetches the favicon for the URL through the Google API and applies it next to the link block as soon as the URL input is complete.

### 2.6 Inline Modification of Link and Validity Check
- **The user** directly clicks the text of the corresponding link block **to modify** the title or address of a previously registered link.
- **The user** reflects the changes immediately without page navigation by modifying the content when the text switches to an input field and pressing Enter. (The favicon is also automatically updated if the URL changes)
- **[Exception] The user** sees an 'Invalid URL format' warning **to enter** the correct address if they accidentally enter an incorrect website address format (e.g., `htt://...`).
- **[Exception] The user** sees a 'Required field' warning or the text automatically reverts to the previous one if they press Enter with an empty field **to prevent** accidentally deleting everything and saving it as a blank space.

### 2.7 Deleting a Link
- **The user** clicks the 'Delete' icon on the right side of the corresponding link block **to remove** a link that is no longer valid or they no longer wish to disclose.
- **The user** completely removes the block from the list by finally approving 'Delete' in the confirmation modal that appears **to prevent** unintended deletion.

### 2.8 Logout
- **The user** clicks the 'Logout' button in the corner of the screen to terminate the session and move to the main home **to safely protect** their administrator account on a public device.
