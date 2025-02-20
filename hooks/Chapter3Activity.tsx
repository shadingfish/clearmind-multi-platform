import { Activity1Questions } from "@/app/(app)/chapter3/content/activity1";
import { Activity2Questions } from "@/app/(app)/chapter3/content/activity2";
import { Activity3Questions } from "@/app/(app)/chapter3/content/activity3";
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

/* Chapter3 Activity1 */
export function getChapter3Activity1(userId: string) {
  const activity1 = doc(database, `Chapter3/Activity1/users/${userId}`);
  return getDoc(activity1);
}

export function setChapter3Activity1(
  userId: string,
  data: Activity1Questions
) {
  const activity1 = doc(database, `Chapter3/Activity1/users/${userId}`);
  setDoc(activity1, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 3 activity1 error:", err);
    });
}

/* Chapter3 Activity2 */

export function getChapter3Activity2(userId: string) {
  const activity2 = doc(database, `Chapter3/Activity2/users/${userId}`);
  return getDoc(activity2);
}

export function setChapter3Activity2(
  userId: string,
  data: Activity2Questions
) {
  const activity2 = doc(database, `Chapter3/Activity2/users/${userId}`);
  setDoc(activity2, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 3 activity2 error:", err);
    });
}

/* Chapter3 Activity3 */

export function getChapter3Activity3(userId: string) {
  const activity3 = doc(database, `Chapter3/Activity3/users/${userId}`);
  return getDoc(activity3);
}

export function setChapter3Activity3(
  userId: string,
  data: Activity3Questions
) {
  const activity3 = doc(database, `Chapter3/Activity3/users/${userId}`);
  // Ensure whichPaths is stored as an array
  const formattedData = {
    ...data,
    whichPaths: Array.from(data.whichPaths ?? []) // Convert Set to Array safely
  };
  setDoc(activity3, formattedData)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 3 activity3 error:", err);
    });
}