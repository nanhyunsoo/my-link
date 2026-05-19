import { DUMMY_LINKS } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Share2, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-white selection:text-black">
      {/* Top Navigation / Action Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/10">
        <span className="text-xl font-black tracking-tighter uppercase italic">MyLink</span>
        <Button variant="outline" size="sm" className="rounded-none border-2 border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-tight">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </nav>

      <main className="max-w-2xl mx-auto pt-32 pb-24 px-6 flex flex-col items-center">
        {/* Profile Section - Exaggerated Minimalism */}
        <section className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-white opacity-25 group-hover:opacity-100 transition duration-500 blur-sm rounded-full"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-black flex items-center justify-center">
               <span className="text-4xl font-black italic">ML</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Username
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/60 font-mono text-sm tracking-widest uppercase">
              <span>@displayname_id</span>
              <button className="hover:text-white transition-colors">
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p className="max-w-[280px] text-lg font-medium leading-tight text-white/80 italic">
            &quot;Building the future of web through minimal design and efficient code.&quot;
          </p>
        </section>

        {/* Link List Section - Neo-Brutalism */}
        <section className="w-full flex flex-col gap-5">
          {DUMMY_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full outline-none"
            >
              {/* Neo-brutalist Shadow Effect */}
              <div className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
              
              <Card className="relative bg-[#0D0D0D] border-2 border-white rounded-none overflow-hidden transition-transform active:scale-[0.98] z-10">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    {link.faviconUrl && (
                      <div className="w-10 h-10 bg-white p-1.5 border-2 border-black flex-shrink-0">
                        <Image
                          src={link.faviconUrl}
                          alt={link.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain grayscale"
                        />
                      </div>
                    )}
                    <span className="text-xl font-bold uppercase tracking-tight text-white">
                      {link.title}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </CardContent>
              </Card>
            </a>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-32 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <div className="w-8 h-[2px] bg-white"></div>
          <p className="text-xs font-black tracking-[0.3em] uppercase">Powered by MyLink</p>
        </footer>
      </main>
    </div>
  );
}
