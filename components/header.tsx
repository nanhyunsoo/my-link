"use client";

import React from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Share2, LogOut, LogIn, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useProfile } from "@/hooks/use-profile";

export function Header() {
  const { user, login, logout, loading } = useAuth();
  const { data: profile } = useProfile(user);

  const copyToClipboard = () => {
    if (profile) {
      const url = `${window.location.origin}/${profile.id}`;
      navigator.clipboard.writeText(url);
      toast.success("링크가 클립보드에 복사되었습니다.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/10">
      <Link href="/" className="text-xl font-black tracking-tighter uppercase italic">
        MyLink
      </Link>
      
      <div className="flex items-center gap-4">
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-3">
                {profile && (
                  <Button
                    variant="outline"
                    size="sm"
                    render={
                      <Link href={`/${profile.id}`}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        My Page
                      </Link>
                    }
                    className="hidden sm:flex rounded-none border-2 border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-tight"
                  />
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                  <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    {profile?.photoURL ? (
                      <Image 
                        src={profile.photoURL} 
                        alt={profile.name || "User"} 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-sm font-black italic">
                        {profile?.name?.slice(0, 2).toUpperCase() || user.displayName?.slice(0, 2).toUpperCase() || "ML"}
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {profile && (
                    <DropdownMenuItem
                      render={
                        <Link href={`/${profile.id}`}>
                          <User className="w-4 h-4 mr-2" />
                          View My Page
                        </Link>
                      }
                      className="cursor-pointer"
                    />
                  )}
                  <DropdownMenuItem onClick={copyToClipboard} className="gap-2 cursor-pointer">
                    <Share2 className="w-4 h-4" />
                    Share My Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="gap-2 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={login}
                className="rounded-none border-2 border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-tight"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login with Google
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
