import { DUMMY_LINKS } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center py-12 px-4">
      {/* Profile Section (Based on @docs/WIREFRAME.md) */}
      <div className="flex flex-col items-center mb-10 gap-4">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#0D0D0D] text-2xl font-bold">
          ML
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Username</h1>
          <p className="text-[#AAAAAA]">@displayname_id</p>
          <p className="text-[#AAAAAA] mt-2 max-w-xs">
            Frontend Developer @TechCorp
          </p>
        </div>
      </div>

      {/* Link List Section */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {DUMMY_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform active:scale-95 hover:scale-[1.02]"
          >
            <Card className="bg-white border-none shadow-lg overflow-hidden cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                {link.faviconUrl && (
                  <div className="w-8 h-8 flex-shrink-0 relative">
                    <Image
                      src={link.faviconUrl}
                      alt={link.title}
                      width={32}
                      height={32}
                      className="rounded-sm"
                    />
                  </div>
                )}
                <span className="flex-grow font-semibold text-[#0D0D0D] text-center mr-8">
                  {link.title}
                </span>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Footer Branding */}
      <footer className="mt-auto pt-12 text-[#666666] text-sm">
        Powered by MyLink
      </footer>
    </div>
  );
}
