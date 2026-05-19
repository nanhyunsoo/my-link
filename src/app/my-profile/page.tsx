import React from 'react';

const MyProfilePage = () => {
  // Mock data aligned with ASALDESIGN structure
  const profileData = {
    name: "LEESOO",
    role: "FULL-STACK DEVELOPER",
    brand: "MYLINK",
    tagline: "BUILDING DIGITAL EXPERIENCES WITH PRECISION AND MINIMALISM.",
    bio: [
      "새로운 기술을 배우고 적용하는 것을 즐기는 개발자입니다. 사용자 중심의 서비스를 만드는 것에 가치를 둡니다.",
      "ASALDESIGN의 미니멀리즘 철학을 존중하며, 복잡한 문제를 단순하고 명확한 솔루션으로 풀어내는 것을 목표로 합니다.",
      "현재 Next.js 16과 Tailwind CSS 4를 활용한 다양한 프로젝트를 진행 중입니다."
    ],
    contact: {
      email: "hyunsoo@example.com",
      socials: [
        { label: "GITHUB", url: "https://github.com/leehyunsoo" },
        { label: "BLOG", url: "https://velog.io/@leehyunsoo" },
        { label: "LINKEDIN", url: "https://linkedin.com/in/leehyunsoo" }
      ]
    },
    experiences: [
      {
        company: "VIBE CODING",
        role: "FRONTEND ENGINEER INTERN",
        period: "2024.01 - 2024.06",
        description: "React와 Next.js를 활용한 웹 서비스 고도화 및 UI/UX 개선. 대규모 트래픽 처리를 위한 성능 최적화 수행."
      },
      {
        company: "ALGORITHM SOCIETY",
        role: "CORE MEMBER",
        period: "2023.03 - 2023.12",
        description: "매주 알고리즘 문제 풀이 세션 진행 및 내부 코딩 테스트 문제 출제."
      }
    ],
    projects: [
      {
        title: "MYLINK SERVICE",
        description: "Next.js 16과 Tailwind CSS 4를 활용한 통합 링크 관리 서비스. 반응형 웹 디자인과 드래그 앤 드롭 기능을 제공합니다.",
        accent: "#3B82F6", // Real Estate Blue from DESIGN.md
        link: "#"
      },
      {
        title: "MUSIC PLAYER UI",
        description: "보라색 그라디언트를 강조한 실험적인 뮤직 플레이어 인터페이스 디자인 및 구현.",
        accent: "linear-gradient(to bottom right, #6D28D9, #C4B5FD)", // Music Purple from DESIGN.md
        link: "#"
      }
    ],
    achievements: [
      {
        title: "CAMPUS HACKATHON",
        award: "1ST PLACE",
        category: "DESIGN CHALLENGE",
        description: "사용자 경험을 극대화한 혁신적인 솔루션으로 교내 해커톤에서 우승하였습니다."
      },
      {
        title: "GOOGLE SOLUTION CHALLENGE",
        award: "TOP 100",
        category: "GLOBAL COMPETITION",
        description: "전 세계 대학생 대상 솔루션 챌린지에서 상위 100대 팀에 선정되었습니다."
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-white selection:bg-white selection:text-[#0D0D0D] font-sans overflow-x-hidden">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[9999] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Navbar */}
      <nav className="sticky top-0 h-[56px] border-b border-[rgba(255,255,255,0.12)] bg-[#0D0D0D]/80 backdrop-blur-sm z-50 px-[clamp(24px,6vw,80px)] flex items-center justify-between">
        <span className="text-[11px] font-normal tracking-[0.01em] uppercase hidden sm:block">{profileData.role}</span>
        <span className="text-[11px] font-normal tracking-[0.01em] uppercase absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">{profileData.name}</span>
        <span className="text-[11px] font-normal tracking-[0.01em] uppercase">{profileData.brand}</span>
      </nav>

      <main className="px-[clamp(24px,6vw,80px)] pb-32">
        {/* Hero Section */}
        <section className="pt-20 pb-32 flex flex-col items-center text-center">
          <div className="w-10 h-10 mb-8 flex items-center justify-center">
            {/* Simple Logo Placeholder */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="20" fill="white"/>
              <rect x="10" y="15" width="20" height="10" fill="#0D0D0D"/>
            </svg>
          </div>
          <h1 className="text-[clamp(64px,12vw,128px)] font-black leading-[0.9] tracking-[-0.02em] uppercase mb-8">
            {profileData.name}
          </h1>
          <p className="max-w-[600px] text-[clamp(11px,1.4vw,15px)] font-medium leading-[1.6] tracking-[0.04em] uppercase text-[#DDDDDD] mb-12">
            {profileData.tagline}
          </p>
          
          <div className="w-full flex flex-col sm:flex-row gap-8 border-t border-[rgba(255,255,255,0.12)] pt-6 text-left">
            {profileData.bio.map((paragraph, i) => (
              <p key={i} className="flex-1 text-[12px] font-normal leading-[1.6] text-[#AAAAAA]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button className="px-7 py-3 rounded-full bg-white text-[#0D0D0D] text-[13px] font-semibold tracking-[0.06em] uppercase hover:bg-[#EFEFEF] transition-all duration-200">
              CONTACT ME
            </button>
            {profileData.contact.socials.map((social, i) => (
              <a 
                key={i}
                href={social.url}
                target="_blank"
                className="px-7 py-3 rounded-full border-[1.5px] border-white text-white text-[13px] font-semibold tracking-[0.06em] uppercase hover:bg-white hover:text-[#0D0D0D] transition-all duration-200"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>

        {/* Featured Projects (Grid) */}
        <section className="mb-32">
          <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.0] tracking-[-0.01em] uppercase mb-12">
            FEATURED PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profileData.projects.map((project, i) => (
              <div key={i} className="group bg-white rounded-[20px] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                <div 
                  className="h-[200px] w-full" 
                  style={{ background: project.accent }}
                ></div>
                <div className="p-4 bg-white">
                  <h3 className="text-[15px] font-bold text-[#0D0D0D] mb-2">{project.title}</h3>
                  <p className="text-[12px] font-normal leading-[1.5] text-[#666666] mb-4">
                    {project.description}
                  </p>
                  <a href={project.link} className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0D0D0D] hover:underline">
                    VIEW DESIGN <span className="text-[14px]">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievement Cards */}
        <section className="mb-32">
          <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.0] tracking-[-0.01em] uppercase mb-12">
            ACHIEVEMENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profileData.achievements.map((ach, i) => (
              <div key={i} className="bg-white rounded-[16px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.10)]">
                <div className="flex gap-2 mb-3">
                  <span className="px-[10px] py-1 bg-[#0D0D0D] text-white text-[10px] font-semibold rounded-full uppercase">
                    {ach.award}
                  </span>
                  <span className="px-[10px] py-1 bg-[#EFEFEF] text-[#333333] text-[10px] font-medium rounded-full uppercase">
                    {ach.category}
                  </span>
                </div>
                <h3 className="text-[18px] font-extrabold text-[#0D0D0D] uppercase mb-2">{ach.title}</h3>
                <p className="text-[11px] font-normal leading-[1.6] text-[#666666] mb-4">
                  {ach.description}
                </p>
                <button className="px-4 py-2 bg-[#0D0D0D] text-white text-[11px] font-medium rounded-full uppercase">
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Get in Touch */}
        <section className="pt-20 text-center">
          <h2 className="text-[clamp(64px,12vw,128px)] font-black leading-[0.9] tracking-[-0.02em] uppercase mb-4">
            GET IN TOUCH
          </h2>
          <p className="text-[12px] font-normal text-[#AAAAAA] tracking-[0.04em] uppercase mb-8">
            AVAILABLE FOR NEW PROJECTS AND COLLABORATIONS.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-[11px] font-medium text-[#888888] tracking-[0.06em] uppercase">
            {profileData.contact.socials.map((social, i) => (
              <a key={i} href={social.url} target="_blank" className="hover:text-white transition-colors">
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-16 text-center text-[11px] font-normal text-[#555555] tracking-[0.04em] uppercase">
        <p>© 2026 {profileData.name}. BUILT WITH {profileData.brand}</p>
      </footer>
    </div>
  );
};

export default MyProfilePage;
