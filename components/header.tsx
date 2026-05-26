"use client";

import React from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Share2, LogOut, LogIn } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { user, login, logout, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/10">
      <Link href="/" className="text-xl font-black tracking-tighter uppercase italic">
        MyLink
      </Link>
      
      <div className="flex items-center gap-4">
        {!loading && (
          <>
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="rounded-none text-white/50 hover:text-white hover:bg-white/10 transition-colors font-bold uppercase tracking-tight"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-none border-2 border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-tight"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </>
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
