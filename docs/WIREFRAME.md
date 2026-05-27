# [WIREFRAME] MyLink Wireframe

This document visualizes the screen structure and flow of MyLink, to which the ASALDESIGN system (high-contrast minimalism) is applied, based on the screenshot design plan provided by the user.

---

## 1. User Flow

```mermaid
graph LR
    Start([Main Landing]) --> Login[Login with Google]
    Login --> Auth{Auth Process}
    Auth -- New User --> Onboarding[Onboarding / Init Profile]
    Auth -- Existing User --> Dashboard[Dashboard / My Page]
    Onboarding --> Dashboard
    Dashboard --> Public[Public Profile Page]
    Public --> External([External Sites])
```

---

## 2. Wireframe by Screen

### 2.1 Landing Page
A simple and powerful service entry page.

```mermaid
graph TD
    subgraph Landing_Page [Landing Page Layout]
        direction TB
        Nav["[Logo] MyLink . . . . . . . . . . . [Login/Signup]"]
        
        Content["<br/>Development in One Link.<br/>Showcase your git, blog, and more.<br/><br/>"]
        
        CTA["[ G  Continue with Google ]"]
        
        Nav --- Content
        Content --- CTA
    end

    style Landing_Page fill:#0D0D0D,stroke:#FFFFFF,color:#FFFFFF
    style Nav fill:none,stroke:none,color:#FFFFFF
    style Content fill:none,stroke:none,color:#FFFFFF,font-size:20px,font-weight:bold
    style CTA fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D,font-weight:bold
```

### 2.2 Dashboard / My Page (Dashboard - Admin)
The core screen where the owner manages their profile and links.

```mermaid
graph TD
    subgraph Admin_View [Dashboard Layout]
        direction TB
        
        AdminNav["[Logo] . . . . . . . . . . . . . . . [↗ View Page]"]
        
        subgraph Profile_Area [Profile Section]
            AvatarAdmin((" ( 0 ) <br/>Google Photo"))
            EditName["Username ✎"]
            EditID["@displayname_id"]
            EditBio["Frontend Developer @TechCorp ✎"]
        end
        
        subgraph Link_List [Link Management]
            Link1["[ (Favicon)  My GitHub Blog . . . . . ✎ ]<br/>[ https://github.com/... . . . . (Trash) ]"]
            Link2["[ (Favicon)  Portfolio Site . . . . . . ✎ ]<br/>[ https://kim.dev/... . . . . . (Trash) ]"]
            AddBtn["[ + Add New Link ]"]
        end
        
        AdminNav --> Profile_Area
        Profile_Area --> Link_List
    end

    style Admin_View fill:#0D0D0D,stroke:#FFFFFF,color:#FFFFFF
    style AdminNav fill:none,stroke:none,color:#FFFFFF
    style Profile_Area fill:none,stroke:none
    style AvatarAdmin fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D
    style EditName fill:none,stroke:none,color:#FFFFFF,font-weight:bold
    style EditID fill:none,stroke:none,color:#AAAAAA
    style EditBio fill:none,stroke:none,color:#AAAAAA
    style Link_List fill:none,stroke:none
    style Link1 fill:#1A1A1A,stroke:#333333,color:#FFFFFF
    style Link2 fill:#1A1A1A,stroke:#333333,color:#FFFFFF
    style AddBtn fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D,font-weight:bold
```

### 2.3 Public Profile (Public Profile - Visitor)
The read-only page that visitors will see. It is displayed cleanly without editing tools.

```mermaid
graph TD
    subgraph Visitor_View [Public Profile Layout]
        direction TB
        
        Avatar((" ( 0 ) "))
        
        V_Name["Username"]
        V_ID["@displayname_id"]
        V_Bio["Frontend Developer @TechCorp"]
        
        subgraph V_Links [Link Cards]
            V_Link1["[ (Icon)  My GitHub Blog ]"]
            V_Link2["[ (Icon)  Portfolio Site ]"]
            V_Link3["[ (Icon)  Youtube Channel ]"]
        end
        
        V_Footer["Powered by MyLink"]

        Avatar --> V_Name
        V_Name --> V_ID
        V_ID --> V_Bio
        V_Bio --> V_Links
        V_Links --> V_Footer
    end

    style Visitor_View fill:#0D0D0D,stroke:#FFFFFF,color:#FFFFFF
    style Avatar fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D
    style V_Name fill:none,stroke:none,color:#FFFFFF,font-weight:bold,font-size:20px
    style V_ID fill:none,stroke:none,color:#AAAAAA
    style V_Bio fill:none,stroke:none,color:#AAAAAA
    style V_Links fill:none,stroke:none
    style V_Link1 fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D
    style V_Link2 fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D
    style V_Link3 fill:#FFFFFF,stroke:#FFFFFF,color:#0D0D0D
    style V_Footer fill:none,stroke:none,color:#666666
```

---

## 3. Key Design Principles

1.  **Inline Editing Indication**: In the admin view, the `✎` (pencil icon) next to text indicates that it can be modified immediately upon clicking.
2.  **High-Contrast Layout**: Maximize visual contrast by setting the background dark and major content cards and buttons bright (ASALDESIGN system).
3.  **Simple Deletion**: Provides immediate deletion feedback via the trash icon `(Trash)` within the link block.
4.  **Branding**: Maintains service identity by placing "Powered by MyLink" at the bottom.
