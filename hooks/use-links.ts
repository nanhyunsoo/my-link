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
  serverTimestamp,
  increment 
} from "firebase/firestore";
import { type Link } from "@/data/links";
import { toast } from "sonner";

export function useLinks(userId: string | undefined) {
  return useQuery({
    queryKey: ["links", userId],
    queryFn: async () => {
      if (!userId || !db) return [];
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
          clicks: data.clicks || 0,
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
    mutationFn: async ({ userId, link }: { userId: string; link: Omit<Link, "id" | "clicks"> }) => {
      await addDoc(collection(db, `users/${userId}/links`), {
        ...link,
        clicks: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["links", variables.userId] });
    },
    onError: (error) => {
      console.error("Error adding link: ", error);
      toast.error("An error occurred while saving the link.");
    },
  });
}

export function useIncrementClick() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, linkId }: { userId: string; linkId: string }) => {
      const linkRef = doc(db, `users/${userId}/links`, linkId);
      await updateDoc(linkRef, {
        clicks: increment(1),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["links", variables.userId] });
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
      toast.error("An error occurred while updating the link.");
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
      toast.error("An error occurred while deleting the link.");
    },
  });
}
