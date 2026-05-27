import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { type Link } from "@/data/links";
import { toast } from "sonner";

export function useLinks(userId: string | undefined) {
  return useQuery({
    queryKey: ["links", userId],
    queryFn: async () => {
      if (!userId) return [];
      const q = query(collection(db, `users/${userId}/links`), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const linksData: Link[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        linksData.push({ 
          id: doc.id, 
          title: data.title,
          url: data.url,
          faviconUrl: data.faviconUrl,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as Link);
      });
      return linksData;
    },
    enabled: !!userId,
  });
}

export function useAddLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, link }: { userId: string; link: Omit<Link, "id"> }) => {
      await addDoc(collection(db, `users/${userId}/links`), {
        ...link,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["links", variables.userId] });
    },
    onError: (error) => {
      console.error("Error adding link: ", error);
      toast.error("링크 저장 중 오류가 발생했습니다.");
    },
  });
}

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, linkId, data }: { userId: string; linkId: string; data: Partial<Link> }) => {
      const linkRef = doc(db, `users/${userId}/links`, linkId);
      await updateDoc(linkRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["links", variables.userId] });
    },
    onError: (error) => {
      console.error("Error updating link: ", error);
      toast.error("링크 수정 중 오류가 발생했습니다.");
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, linkId }: { userId: string; linkId: string }) => {
      const linkRef = doc(db, `users/${userId}/links`, linkId);
      await deleteDoc(linkRef);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["links", variables.userId] });
    },
    onError: (error) => {
      console.error("Error deleting link: ", error);
      toast.error("링크 삭제 중 오류가 발생했습니다.");
    },
  });
}
