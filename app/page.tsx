"use client";

import { useState, useEffect } from "react";
import { type Link } from "@/data/links";
import { db } from "@/lib/firebase";
import { collection, query, doc, getDocs, where } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Share2, ExternalLink, Copy, Plus, Loader2, Edit2, Trash2, Check, X, LogIn, BarChart3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useLinks, useAddLink, useUpdateLink, useDeleteLink } from "@/hooks/use-links";

const linkSchema = z.object({
  title: z.string().min(1, "Please enter a title."),
  url: z.string().min(1, "Please enter a URL.").refine((val) => {
    try {
      const urlToTest = val.startsWith("http") ? val : `https://${val}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  }, "Invalid URL format."),
});

const profileSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name must be 20 characters or less.")
    .regex(/^[a-zA-Z0-9\s]+$/, "Special characters are not allowed."),
  id: z.string()
    .min(3, "ID must be at least 3 characters.")
    .max(20, "ID must be 20 characters or less.")
    .regex(/^[a-zA-Z0-9_]+$/, "ID can only contain alphanumeric characters and underscores (_)."),
  bio: z.string().max(100, "Bio must be 100 characters or less."),
});

type LinkFormValues = z.infer<typeof linkSchema>;
type ProfileFormValues = z.infer<typeof profileSchema>;

function LinkItem({ link, userId }: { link: Link; userId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const updateLink = useUpdateLink();
  const deleteLink = useDeleteLink();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  useEffect(() => {
    if (isEditing) {
      reset({
        title: link.title,
        url: link.url,
      });
    }
  }, [isEditing, link, reset]);

  const onUpdate = async (data: LinkFormValues) => {
    let domain = "";
    const urlToUse = data.url.startsWith("http") ? data.url : `https://${data.url}`;
    try {
      domain = new URL(urlToUse).hostname;
    } catch {
      domain = data.url;
    }

    await updateLink.mutateAsync({
      userId,
      linkId: link.id,
      data: {
        title: data.title,
        url: urlToUse,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      },
    });
    setIsEditing(false);
  };

  const onDelete = async () => {
    await deleteLink.mutateAsync({ userId, linkId: link.id });
    setIsDeleteDialogOpen(false);
  };

  const isSubmitting = updateLink.isPending || deleteLink.isPending;

  if (isEditing) {
    return (
      <Card className="relative bg-[#0D0D0D] border-2 border-primary rounded-none overflow-hidden z-10">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("title")}
                placeholder="Link Title"
                className={`bg-black border-2 rounded-none h-10 text-base font-bold transition-colors ${
                  errors.title ? "border-destructive" : "border-white/40 focus:border-white"
                }`}
              />
              {errors.title && (
                <p className="text-destructive text-[10px] font-bold uppercase tracking-tight">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("url")}
                placeholder="URL"
                className={`bg-black border-2 rounded-none h-10 text-base font-bold transition-colors ${
                  errors.url ? "border-destructive" : "border-white/40 focus:border-white"
                }`}
              />
              {errors.url && (
                <p className="text-destructive text-[10px] font-bold uppercase tracking-tight">{errors.url.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-10 font-black uppercase tracking-tighter"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                SAVE
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="flex-1 border-2 border-white text-white rounded-none h-10 font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                CANCEL
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="group relative block w-full">
        <div className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
        
        <Card className="relative bg-[#0D0D0D] border-2 border-white rounded-none overflow-hidden z-10">
          <CardContent className="p-5 flex items-center justify-between gap-4">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 flex-1 min-w-0"
            >
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
              <div className="flex flex-col min-w-0">
                <span className="text-xl font-bold uppercase tracking-tight text-white truncate">
                  {link.title}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <BarChart3 className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    {link.clicks || 0}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
            </a>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                className="w-10 h-10 text-white/50 hover:text-white hover:bg-white/10 rounded-none transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleteDialogOpen(true);
                }}
                className="w-10 h-10 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-none transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#0D0D0D] border-2 border-white rounded-none text-white sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic leading-none mb-4">
              Are you sure?
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Link to delete</p>
              <p className="text-xl font-black uppercase tracking-tight truncate">{link.title}</p>
            </div>
            
            <p className="text-xs font-black uppercase tracking-widest text-red-400">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-full sm:w-1/2 bg-white text-black hover:bg-white/90 border-0 rounded-none h-11 font-black uppercase tracking-tighter transition-colors outline-none cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={isSubmitting}
              className="w-full sm:w-1/2 bg-red-500 text-white hover:bg-red-600 border-0 rounded-none h-11 font-black uppercase tracking-tighter transition-colors outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  DELETING...
                </div>
              ) : (
                "DELETE"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Page() {
  const { user, loading: authLoading, login } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  
  // Queries
  const { data: profile, isLoading: profileLoading } = useProfile(user);
  const { data: links = [] } = useLinks(user?.uid);
  
  // Mutations
  const addLink = useAddLink();
  const updateProfile = useUpdateProfile();

  const [isCheckingName, setIsCheckingName] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [idError, setIdError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    watch: watchProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const watchedName = watchProfile("name");
  const watchedId = watchProfile("id");

  useEffect(() => {
    const checkName = async () => {
      if (!watchedName || !profile || watchedName === profile.name) {
        setNameError(null);
        return;
      }

      if (watchedName.length < 2) return;

      setIsCheckingName(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", watchedName));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setNameError("This name is already in use.");
        } else {
          setNameError(null);
        }
      } catch (error) {
        console.error("Error checking name: ", error);
      } finally {
        setIsCheckingName(false);
      }
    };

    const timeoutId = setTimeout(checkName, 500);
    return () => clearTimeout(timeoutId);
  }, [watchedName, profile]);

  useEffect(() => {
    const checkId = async () => {
      if (!watchedId || !profile || watchedId === profile.id) {
        setIdError(null);
        return;
      }

      if (watchedId.length < 3) return;

      setIsCheckingId(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("id", "==", watchedId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setIdError("This ID is already in use.");
        } else {
          setIdError(null);
        }
      } catch (error) {
        console.error("Error checking id: ", error);
      } finally {
        setIsCheckingId(false);
      }
    };

    const timeoutId = setTimeout(checkId, 500);
    return () => clearTimeout(timeoutId);
  }, [watchedId, profile]);

  useEffect(() => {
    if (profile) {
      resetProfile({
        name: profile.name,
        id: profile.id,
        bio: profile.bio,
      });
    }
  }, [profile, resetProfile, isProfileDialogOpen]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user || !profile || nameError || idError) return;
    
    await updateProfile.mutateAsync({
      userId: user.uid,
      data: {
        name: data.name,
        id: data.id,
        bio: data.bio,
      },
    });
    setIsProfileDialogOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = async (data: LinkFormValues) => {
    if (!user) return;
    let domain = "";
    const urlToUse = data.url.startsWith("http") ? data.url : `https://${data.url}`;
    try {
      domain = new URL(urlToUse).hostname;
    } catch {
      domain = data.url;
    }

    await addLink.mutateAsync({
      userId: user.uid,
      link: {
        title: data.title,
        url: urlToUse,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      },
    });
    reset();
    setIsAddDialogOpen(false);
  };

  const isSubmitting = addLink.isPending || updateProfile.isPending;

  if (!mounted || authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col relative overflow-hidden">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }}
        ></div>

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-between h-[100svh] pt-24 pb-12 px-6 text-center max-w-5xl mx-auto w-full">
          {/* Spacer for vertical centering logic */}
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <div className="space-y-10 md:space-y-12 max-w-4xl w-full flex flex-col items-center">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[1.1] md:leading-[1.05] uppercase break-keep">
                Development <br />
                in <span className="inline-block text-white bg-primary px-3 py-1 italic text-nowrap mt-4 md:mt-6">One Link.</span>
              </h1>              
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/80 leading-relaxed max-w-xl mx-auto break-keep">
                GitHub, Blog, Portfolio.<br />
                All links for developers<br />
                in a single page.
              </p>

              <div className="pt-2 w-full flex justify-center">
                <Button 
                  size="lg" 
                  onClick={login}
                  className="w-full sm:w-auto min-w-[280px] bg-white text-black hover:bg-white/90 rounded-none h-14 md:h-16 text-lg md:text-xl font-black tracking-tighter cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Relative within flex container for safety */}
          <div className="flex flex-col items-center gap-2 animate-bounce mt-8 shrink-0">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Scroll to explore</span>
             <ChevronDown className="w-6 h-6 text-white/40" />
          </div>
        </main>

        {/* Content Sections */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col items-center pb-32">
            {/* Feature Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full mt-24">
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-white/10 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative bg-black border-2 border-white/40 p-10 flex flex-col items-center gap-6 text-center h-full">
                  <div className="w-16 h-16 bg-white/10 flex items-center justify-center border-2 border-white/20">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic leading-none">Link Management</h3>
                    <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                      Manage all links <br />in one place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative h-full">
                <div className="absolute inset-0 bg-primary/20 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative bg-black border-2 border-primary/40 p-10 flex flex-col items-center gap-6 text-center h-full">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-primary leading-none">Click Stats</h3>
                    <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                      Real-time click <br />analytics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative h-full">
                <div className="absolute inset-0 bg-white/10 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative bg-black border-2 border-white/40 p-10 flex flex-col items-center gap-6 text-center h-full">
                  <div className="w-16 h-16 bg-white/10 flex items-center justify-center border-2 border-white/20">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic leading-none">Personal URL</h3>
                    <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                      Get your own <br />unique URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Section - Creative Brutalist Version */}
            <div className="w-full mt-48 space-y-24 relative">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                  Unify in <span className="text-primary">Seconds</span>
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[2px] w-12 bg-white/20"></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">The Developer's Workflow</p>
                  <div className="h-[2px] w-12 bg-white/20"></div>
                </div>
              </div>

              <div className="relative space-y-32 md:space-y-48">
                {/* Vertical Connector Line (Desktop) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block -translate-x-1/2"></div>

                {[
                  { step: "01", title: "Login", desc: "Sync your identity via Google. No passwords, no friction. Just code." },
                  { step: "02", title: "Build", desc: "Drop your GitHub repos, technical blogs, and side projects into one list." },
                  { step: "03", title: "Show", desc: "Deploy your presence. One link for your resume, bio, and the world." },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24 relative`}>
                    {/* Step Number Background */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black italic text-white/[0.03] pointer-events-none select-none z-0">
                      {item.step}
                    </div>

                    <div className={`flex-1 w-full ${i % 2 === 0 ? "md:text-right" : "md:text-left"} z-10`}>
                      <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Desktop Center Point */}
                    <div className="relative z-20 hidden md:flex items-center justify-center w-12 h-12 bg-black border-4 border-white">
                       <div className="w-2 h-2 bg-primary animate-pulse"></div>
                    </div>

                    <div className={`flex-1 w-full ${i % 2 === 0 ? "md:text-left" : "md:text-right"} z-10`}>
                      <p className="text-lg font-medium text-white/60 leading-snug max-w-xs mx-auto md:mx-0 break-keep">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="w-full mt-48 space-y-8 overflow-hidden">
               <div className="flex items-center gap-4 opacity-40">
                  <div className="h-[2px] flex-1 bg-white"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Perfect for Developers</span>
                  <div className="h-[2px] flex-1 bg-white"></div>
               </div>
               
               <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                 {["Portfolio", "Tech Blog", "GitHub Projects", "Résumé", "LinkedIn", "Open Source", "Side Projects", "Socials"].map((tag, i) => (
                   <div key={i} className="px-5 py-2 border-2 border-white/40 rounded-full text-sm font-black uppercase tracking-tighter italic hover:bg-white hover:text-black transition-all cursor-default">
                     {tag}
                   </div>
                 ))}
               </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full mt-48 pb-24 space-y-12 text-center">
               <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
                 READY TO <br />
                 <span className="text-primary">SHOW?</span>
               </h2>
               <div className="flex flex-col items-center gap-6">
                 <p className="text-lg font-bold text-white/60 uppercase tracking-widest">Join 1,000+ developers today.</p>
                 <Button 
                  size="lg" 
                  onClick={login}
                  className="w-full sm:w-auto min-w-[320px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-16 text-xl font-black tracking-tighter cursor-pointer group shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  START FOR FREE
                </Button>
               </div>
            </div>
        </div>

        <footer className="relative z-10 py-8 text-center border-t border-white/10 opacity-60 mt-auto">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase">Powered by MyLink &copy; 2026</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-white selection:text-black">
      <main className="max-w-2xl mx-auto pt-32 pb-24 px-6 flex flex-col items-center">
        {/* Profile Section */}
        <section className="flex flex-col items-center text-center mb-16 space-y-6 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 bg-white opacity-25 group-hover:opacity-100 transition duration-500 blur-sm rounded-full"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-black flex items-center justify-center">
               {profile?.photoURL ? (
                 <Image 
                   src={profile.photoURL} 
                   alt={profile.name} 
                   fill 
                   className="object-cover"
                   unoptimized
                 />
               ) : (
                 <span className="text-4xl font-black italic">
                   {profile?.name?.slice(0, 2).toUpperCase() || "ML"}
                 </span>
               )}
            </div>
          </div>
          
          <div className="space-y-2 relative w-full">
            <div className="relative flex items-center justify-center min-h-[4rem]">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none truncate max-w-[80vw] sm:max-w-[450px]">
                  {profile?.name || "Username"}
                </h1>
                <div className="absolute top-1/2 -translate-y-1/2 -right-12">
                  <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                    <DialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-10 h-10 text-white hover:text-white hover:bg-white/10 rounded-none transition-all"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Button>
                      }
                    />
                    <DialogContent className="bg-[#0D0D0D] border-2 border-white rounded-none text-white sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-black uppercase tracking-tighter italic">Edit Profile</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name" className="text-sm font-bold uppercase tracking-widest text-white/90">Display Name</Label>
                          <div className="relative">
                            <Input
                              id="profile-name"
                              placeholder="Your Display Name"
                              className={`bg-black border-2 rounded-none h-12 text-lg font-bold transition-colors ${
                                profileErrors.name || nameError ? "border-destructive" : "border-white/40 focus:border-white"
                              }`}
                              {...registerProfile("name")}
                            />
                            {isCheckingName && (
                              <div className="absolute right-3 top-3">
                                <Loader2 className="w-6 h-6 animate-spin text-white/60" />
                              </div>
                            )}
                          </div>
                          {(profileErrors.name || nameError) && (
                            <p className="text-destructive text-xs font-bold uppercase tracking-tight">
                              {profileErrors.name?.message || nameError}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-id" className="text-sm font-bold uppercase tracking-widest text-white/90">User ID</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-lg font-bold text-white/60">@</span>
                            <Input
                              id="profile-id"
                              placeholder="username"
                              className={`bg-black border-2 rounded-none h-12 pl-8 text-lg font-bold transition-colors ${
                                profileErrors.id || idError ? "border-destructive" : "border-white/40 focus:border-white"
                              }`}
                              {...registerProfile("id")}
                            />
                            {isCheckingId && (
                              <div className="absolute right-3 top-3">
                                <Loader2 className="w-6 h-6 animate-spin text-white/60" />
                              </div>
                            )}
                          </div>
                          {(profileErrors.id || idError) && (
                            <p className="text-destructive text-xs font-bold uppercase tracking-tight">
                              {profileErrors.id?.message || idError}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-sm font-bold uppercase tracking-widest text-white/90">Bio</Label>
                          <textarea
                            id="bio"
                            placeholder="Tell us about yourself"
                            rows={3}
                            className={`w-full bg-black border-2 border-white/40 focus:border-white rounded-none p-3 text-lg font-bold transition-colors outline-none resize-none ${
                              profileErrors.bio ? "border-destructive" : ""
                            }`}
                            {...registerProfile("bio")}
                          />
                          {profileErrors.bio && (
                            <p className="text-destructive text-xs font-bold uppercase tracking-tight">{profileErrors.bio.message}</p>
                          )}
                        </div>
                        <div className="mt-6 flex gap-2">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 font-black uppercase tracking-tighter"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                SAVING...
                              </div>
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                SAVE
                              </>
                            )}
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => {
                              setIsProfileDialogOpen(false);
                              resetProfile();
                            }}
                            className="flex-1 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black rounded-none h-12 font-black uppercase tracking-tighter transition-colors flex items-center justify-center"
                          >
                            <X className="w-4 h-4 mr-2" />
                            CANCEL
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90 font-mono text-sm tracking-widest uppercase">
              <span>@{profile?.id || "userid"}</span>
              <button className="hover:text-white transition-colors" onClick={() => {
                navigator.clipboard.writeText(`@${profile?.id}`);
                toast.success("ID copied to clipboard.");
              }}>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p className="max-w-[280px] text-lg font-medium leading-tight text-white/80 italic">
            &quot;{profile?.bio || "No bio yet."}&quot;
          </p>
        </section>

        {/* Link List Section */}
        <section className="w-full flex flex-col gap-5">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger
              render={
                <button className="group relative w-full outline-none mb-4">
                  <div className="absolute inset-0 bg-primary/20 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
                  <div className="relative bg-primary border-2 border-primary rounded-none p-5 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] z-10">
                    <Plus className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
                    <span className="text-xl font-black uppercase tracking-tighter text-primary-foreground">
                      Add New Link
                    </span>
                  </div>
                </button>
              }
            />
            <DialogContent className="bg-[#0D0D0D] border-2 border-white rounded-none text-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black uppercase tracking-tighter italic">Add New Link</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-white/90">Link Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. My Awesome Project"
                    className={`bg-black border-2 rounded-none h-12 text-lg font-bold transition-colors ${
                      errors.title ? "border-destructive" : "border-white/40 focus:border-white"
                    }`}
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-destructive text-xs font-bold uppercase tracking-tight">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-bold uppercase tracking-widest text-white/90">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    className={`bg-black border-2 rounded-none h-12 text-lg font-bold transition-colors ${
                      errors.url ? "border-destructive" : "border-white/40 focus:border-white"
                    }`}
                    {...register("url")}
                  />
                  {errors.url && (
                    <p className="text-destructive text-xs font-bold uppercase tracking-tight">{errors.url.message}</p>
                  )}
                </div>
                <div className="mt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-0 rounded-none h-14 text-xl font-black uppercase tracking-tighter transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      "Save Link"
                    )}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {links.map((link) => (
            <LinkItem key={link.id} link={link} userId={user.uid} />
          ))}

          {links.length === 0 && !isSubmitting && (
            <div className="text-center py-12 border-2 border-dashed border-white/30 opacity-60">
              <p className="font-bold uppercase tracking-widest">No links yet</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-32 flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-8 h-[2px] bg-white"></div>
          <p className="text-xs font-black tracking-[0.3em] uppercase">Powered by MyLink</p>
        </footer>
      </main>
    </div>
  );
}
