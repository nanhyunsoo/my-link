import { notFound } from "next/navigation";
import Image from "next/image";
import { getUserProfileById, getUserLinks } from "@/lib/user";
import { LinkCard } from "@/components/link-card";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string }>;
}

const baseUrl = "https://my-link-bay-one.vercel.app";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const userData = await getUserProfileById(username);

  if (!userData) return { title: "User Not Found" };

  const title = `${userData.profile.name} (@${userData.profile.id})`;
  const description = userData.profile.bio || `Check out ${userData.profile.name}'s developer links on MyLink. GitHub, Portfolio, and more.`;

  return {
    title,
    description,
    keywords: [userData.profile.name, userData.profile.id, "developer", "portfolio", "links"],
    openGraph: {
      title: `${title} | MyLink`,
      description,
      url: `${baseUrl}/${username}`,
      siteName: "MyLink",
      locale: "ko_KR",
      type: "profile",
      firstName: userData.profile.name,
      username: userData.profile.id,
      images: [
        {
          url: `${baseUrl}/${username}/opengraph-image?v=5`,
          width: 1200,
          height: 630,
          alt: `${userData.profile.name}'s MyLink Profile`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MyLink`,
      description,
      images: [`${baseUrl}/${username}/opengraph-image?v=5`],
    },
    alternates: {
      canonical: `${baseUrl}/${username}`,
    },
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  
  const userData = await getUserProfileById(username);
  
  if (!userData) {
    notFound();
  }

  const { profile, userId } = userData;
  const links = await getUserLinks(userId);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-white selection:text-black">
      <main className="max-w-2xl mx-auto pt-32 pb-24 px-6 flex flex-col items-center">
        {/* Profile Section */}
        <section className="flex flex-col items-center text-center mb-16 space-y-6 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 bg-white opacity-25 rounded-full"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-black flex items-center justify-center">
               {profile.photoURL ? (
                 <Image 
                   src={profile.photoURL} 
                   alt={profile.name} 
                   fill 
                   className="object-cover"
                   unoptimized
                 />
               ) : (
                 <span className="text-4xl font-black italic">
                   {profile.name.slice(0, 2).toUpperCase()}
                 </span>
               )}
            </div>
          </div>
          
          <div className="space-y-2 relative w-full">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none truncate max-w-[90%] mx-auto">
              {profile.name}
            </h1>
            <div className="text-white/70 font-mono text-sm tracking-widest uppercase">
              @{profile.id}
            </div>
          </div>

          <p className="max-w-[320px] text-lg font-medium leading-tight text-white italic break-keep">
            &quot;{profile.bio}&quot;
          </p>
        </section>

        {/* Link List Section */}
        <section className="w-full flex flex-col gap-5">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} userId={userId} />
          ))}

          {links.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-white/30 opacity-60">
              <p className="font-bold uppercase tracking-widest text-white/70">No links available</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-32 flex flex-col items-center gap-4 opacity-70">
          <div className="w-8 h-[2px] bg-white"></div>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-white">Powered by MyLink</p>
        </footer>
      </main>
    </div>
  );
}
