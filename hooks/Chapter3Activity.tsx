import { Chapter3 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function getChapter3Progress(userId: string) {
    try {
      const progressRef = doc(database, "Chapter3", "Progress", "users", userId);
      const docSnap = await getDoc(progressRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        await initChapter3Progress(userId);
        return Chapter3.EmptyProgress;
      }
    } catch (err) {
      console.log(err);
    }
  }

export async function initChapter3Progress(userId: string) {
    try {
      const progressRef = doc(database, "Chapter3", "Progress", "users", userId);
      await setDoc(progressRef, Chapter3.EmptyProgress);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
}

export async function updateChapter3Progress(userId: string, field: string) {
    const progressRef = doc(database, "Chapter3", "Progress", "users", userId);
  
    const updates = {
      [`${field}`]: "1",
    };
  
    try {
      await setDoc(progressRef, updates, { merge: true });
      console.log("Progress updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
}