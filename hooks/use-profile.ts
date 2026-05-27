import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

export interface UserProfile {
  name: string;
  id: string;
  bio: string;
  photoURL?: string;
}

export function useProfile(user: { uid: string; email?: string | null; photoURL?: string | null } | null) {
  return useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        const emailPrefix = user.email ? user.email.split("@")[0] : "Username";
        const initialProfile: UserProfile = {
          name: emailPrefix,
          id: user.uid.slice(0, 8),
          bio: "Building the future of web through minimal design and efficient code.",
          photoURL: user.photoURL || undefined
        };
        await setDoc(docRef, initialProfile);
        return initialProfile;
      }
    },
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<UserProfile> }) => {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, data);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["profile", variables.userId] });
      toast.success("프로필이 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("Error updating profile: ", error);
      toast.error("프로필 수정 중 오류가 발생했습니다.");
    },
  });
}
