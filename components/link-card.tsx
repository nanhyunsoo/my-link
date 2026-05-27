"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type Link } from "@/data/links";
import { useIncrementClick } from "@/hooks/use-links";

interface LinkCardProps {
  link: Link;
  userId: string;
}

export function LinkCard({ link, userId }: LinkCardProps) {
  const incrementClick = useIncrementClick();

  const handleClick = () => {
    incrementClick.mutate({ userId, linkId: link.id });
  };

  return (
    <div className="group relative block w-full">
      <div className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
      
      <Card className="relative bg-[#0D0D0D] border-2 border-white rounded-none overflow-hidden z-10">
        <CardContent className="p-5">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
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
  );
}
