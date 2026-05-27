import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getUserProfileById, getUserLinks } from "@/lib/user";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { id } = await params;
  
  const userData = await getUserProfileById(id);
  
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
            <div className="text-white/40 font-mono text-sm tracking-widest uppercase">
              @{profile.id}
            </div>
          </div>

          <p className="max-w-[320px] text-lg font-medium leading-tight text-white/80 italic break-keep">
            &quot;{profile.bio}&quot;
          </p>
        </section>

        {/* Link List Section */}
        <section className="w-full flex flex-col gap-5">
          {links.map((link) => (
            <div key={link.id} className="group relative block w-full">
              <div className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
              
              <Card className="relative bg-[#0D0D0D] border-2 border-white rounded-none overflow-hidden z-10">
                <CardContent className="p-5">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      {link.faviconUrl && (
                        <div className="w-10 h-10 bg-white p-1.5 border-2 border-black flex-shrink-0">
                          <Image
                            src={link.faviconUrl}
                            alt={link.title}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain grayscale"
                            unoptimized
                          />
                        </div>
                      )}
                      <span className="text-xl font-bold uppercase tracking-tight text-white truncate">
                        {link.title}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                  </a>
                </CardContent>
              </Card>
            </div>
          ))}

          {links.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-white/10 opacity-30">
              <p className="font-bold uppercase tracking-widest">No links available</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-32 flex flex-col items-center gap-4 opacity-40">
          <div className="w-8 h-[2px] bg-white"></div>
          <p className="text-xs font-black tracking-[0.3em] uppercase">Powered by MyLink</p>
        </footer>
      </main>
    </div>
  );
}
