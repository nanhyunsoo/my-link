import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { type UserProfile } from "@/hooks/use-profile";
import { type Link } from "@/data/links";

export async function getUserProfileById(id: string): Promise<{ profile: UserProfile; userId: string } | null> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  return {
    profile: userDoc.data() as UserProfile,
    userId: userDoc.id
  };
}

export async function getUserLinks(userId: string): Promise<Link[]> {
  const linksRef = collection(db, `users/${userId}/links`);
  const q = query(linksRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  const links: Link[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    links.push({ 
      id: doc.id, 
      ...data,
      // Convert Firebase Timestamp to a plain object to avoid serialization errors
      createdAt: data.createdAt?.toMillis?.() || data.createdAt || null,
      updatedAt: data.updatedAt?.toMillis?.() || data.updatedAt || null,
    } as Link);
  });
  
  return links;
}
