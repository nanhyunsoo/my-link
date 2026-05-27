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
    onMutate: async ({ userId, data }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["profile", userId] });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", userId]);

      // Optimistically update to the new value
      if (previousProfile) {
        queryClient.setQueryData(["profile", userId], {
          ...previousProfile,
          ...data,
        });
      }

      return { previousProfile };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", variables.userId], context.previousProfile);
      }
      console.error("Error updating profile: ", err);
      toast.error("An error occurred while updating the profile.");
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to guarantee we are in sync with the server
      queryClient.invalidateQueries({ queryKey: ["profile", variables.userId] });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
  });
}
