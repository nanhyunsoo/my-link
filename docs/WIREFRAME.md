# [WIREFRAME] 마이링크 (MyLink) 와이어프레임

본 문서는 사용자가 제공한 스크린샷 설계안을 바탕으로, ASALDESIGN 시스템(고대비 미니멀리즘)이 적용된 마이링크의 화면 구조와 흐름을 시각화합니다.

---

## 1. 서비스 흐름 (User Flow)

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

## 2. 화면별 와이어프레임

### 2.1 메인 랜딩 (Landing Page)
심플하고 강렬한 인상을 주는 서비스 진입 페이지입니다.

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

### 2.2 대시보드 / 마이페이지 (Dashboard - Admin)
소유자가 자신의 프로필과 링크를 관리하는 핵심 화면입니다.

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

### 2.3 공개 프로필 (Public Profile - Visitor)
방문자가 보게 될 읽기 전용 페이지입니다. 편집 도구 없이 깔끔하게 표시됩니다.

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

## 3. 주요 설계 원칙

1.  **인라인 편집 표시**: 관리자 뷰에서 텍스트 옆의 `✎` (연필 아이콘)는 클릭 시 즉시 수정이 가능함을 나타냅니다.
2.  **고대비 레이아웃**: 배경은 어둡게, 주요 콘텐츠 카드와 버튼은 밝게 설정하여 시각적 대비를 극대화합니다 (ASALDESIGN 시스템).
3.  **심플한 삭제**: 링크 블록 내의 쓰레기통 아이콘`(Trash)`을 통해 즉각적인 삭제 피드백을 제공합니다.
4.  **브랜딩**: 하단에 "Powered by MyLink"를 배치하여 서비스의 정체성을 유지합니다.
