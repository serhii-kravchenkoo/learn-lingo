import { ref, set, remove, get } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const addToFavorites = (uid: string, teacherId: string) => {
  return set(ref(db, `favorites/${uid}/${teacherId}`), true);
};

export const removeFromFavorites = (uid: string, teacherId: string) => {
  return remove(ref(db, `favorites/${uid}/${teacherId}`));
};
export const getFavorites = async (uid: string): Promise<string[]> => {
  const snapshot = await get(ref(db, `favorites/${uid}`));
  if (!snapshot.exists()) return [];
  return Object.keys(snapshot.val());
};