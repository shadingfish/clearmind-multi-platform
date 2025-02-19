// // app/chapter1/hooks/Chapter1Activity.tsx

import { Chapter1 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function getChapter1Summary(userId: string) {
  try {
    const summaryRef = doc(database, "Chapter1", "Summary", "users", userId);
    const res = await getDoc(summaryRef);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 summary:", err);
  }
}

/** 更新 Chapter1 Summary */
export async function setChapter1Summary(userId: string, data: { [key: string]: string }) {
  try {
    const summaryRef = doc(database, "Chapter1", "Summary", "users", userId);
    await setDoc(summaryRef, data);
    console.log("Chapter1 Summary updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Summary:", err);
  }
}

export async function getChapter1Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter1", "Progress", "users", userId);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await initChapter1Progress(userId);
      return Chapter1.EmptyProgress;
    }
  } catch (err) {
    console.error("Error getting Chapter1 progress:", err);
  }
}

export async function initChapter1Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter1", "Progress", "users", userId);
    await setDoc(progressRef, Chapter1.EmptyProgress);
  } catch (err) {
    console.error("Error initializing Chapter1 progress:", err);
  }
}

export async function updateChapter1Progress(userId: string, field: string) {
  try {
    const progressRef = doc(database, "Chapter1", "Progress", "users", userId);
    await updateDoc(progressRef, { [`${field}`]: "1" });
    console.log("Chapter1 progress updated successfully!");
  } catch (err) {
    console.error(`Error updating Chapter1 ${field} progress:`, err);
  }
}