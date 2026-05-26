"use client";

import { useState, useEffect } from "react";
import { type Link } from "@/data/links";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Share2, ExternalLink, Copy, Plus, Loader2, Edit2, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const linkSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  url: z.string().min(1, "URL을 입력해주세요.").refine((val) => {
    try {
      const urlToTest = val.startsWith("http") ? val : `https://${val}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  }, "올바른 URL 형식이 아닙니다."),
});

type LinkFormValues = z.infer<typeof linkSchema>;

function LinkItem({ link }: { link: Link }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 수정 모드가 활성화될 때마다 현재 link 정보를 폼에 주입
  useEffect(() => {
    if (isEditing) {
      reset({
        title: link.title,
        url: link.url,
      });
    }
  }, [isEditing, link, reset]);

  const onUpdate = async (data: LinkFormValues) => {
    setIsSubmitting(true);
    let domain = "";
    const urlToUse = data.url.startsWith("http") ? data.url : `https://${data.url}`;
    try {
      domain = new URL(urlToUse).hostname;
    } catch {
      domain = data.url;
    }

    try {
      const linkRef = doc(db, "users/anonymous/links", link.id);
      await updateDoc(linkRef, {
        title: data.title,
        url: urlToUse,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("링크 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    setIsSubmitting(true);
    try {
      const linkRef = doc(db, "users/anonymous/links", link.id);
      await deleteDoc(linkRef);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("링크 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  errors.title ? "border-destructive" : "border-white/20 focus:border-white"
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
                  errors.url ? "border-destructive" : "border-white/20 focus:border-white"
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
                저장
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="flex-1 border-2 border-white rounded-none h-10 font-black uppercase tracking-tighter hover:bg-white hover:text-black"
              >
                <X className="w-4 h-4" />
                취소
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
              <span className="text-xl font-bold uppercase tracking-tight text-white truncate">
                {link.title}
              </span>
              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
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
              정말 삭제하시겠습니까?
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">삭제할 링크</p>
              <p className="text-xl font-black uppercase tracking-tight truncate">{link.title}</p>
            </div>
            
            <p className="text-xs font-black uppercase tracking-widest text-red-400">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-full sm:w-1/2 bg-white text-black hover:bg-white/90 border-0 rounded-none h-11 font-black uppercase tracking-tighter transition-colors outline-none cursor-pointer"
            >
              취소
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
                  삭제 중...
                </div>
              ) : (
                "삭제하기"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);

    const q = query(collection(db, "users/anonymous/links"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const linksData: Link[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        linksData.push({ 
          id: doc.id, 
          title: data.title,
          url: data.url,
          faviconUrl: data.faviconUrl
        } as Link);
      });
      setLinks(linksData);
    });

    return () => unsubscribe();
  }, []);

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
    setIsSubmitting(true);
    // Extract domain for favicon
    let domain = "";
    const urlToUse = data.url.startsWith("http") ? data.url : `https://${data.url}`;
    try {
      domain = new URL(urlToUse).hostname;
    } catch {
      domain = data.url;
    }

    try {
      await addDoc(collection(db, "users/anonymous/links"), {
        title: data.title,
        url: urlToUse,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        createdAt: serverTimestamp(),
      });
      reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("링크 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

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
          {/* Add New Link Trigger - Based on @docs/WIREFRAME.md */}
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
                  <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-white/60">Link Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. My Awesome Project"
                    className={`bg-black border-2 rounded-none h-12 text-lg font-bold transition-colors ${
                      errors.title ? "border-destructive" : "border-white/20 focus:border-white"
                    }`}
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-destructive text-xs font-bold uppercase tracking-tight">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-bold uppercase tracking-widest text-white/60">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    className={`bg-black border-2 rounded-none h-12 text-lg font-bold transition-colors ${
                      errors.url ? "border-destructive" : "border-white/20 focus:border-white"
                    }`}
                    {...register("url")}
                  />
                  {errors.url && (
                    <p className="text-destructive text-xs font-bold uppercase tracking-tight">{errors.url.message}</p>
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-xl font-black uppercase tracking-tighter transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Link"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {links.map((link) => (
            <LinkItem key={link.id} link={link} />
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
