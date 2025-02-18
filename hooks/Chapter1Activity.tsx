// // app/chapter1/hooks/Chapter1Activity.tsx

import { Chapter1 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

/** 更新 Chapter1 进度 */
export async function updateChapter1Progress(userId: string, field: string) {
  try {
    const progressRef = doc(database, "Chapter1", "Progress", "users", userId);
    await updateDoc(progressRef, { [`${field}`]: "1" });
    console.log("Chapter1 progress updated successfully!");
  } catch (err) {
    console.error(`Error updating Chapter1 ${field} progress:`, err);
  }
}

/** 更新 Chapter1 Activity0 */
export async function updateChapter1Activity0(
  userId: string,
  selection: string[] | { [key: string]: number }
) {
  try {
    const activity0UserRef = doc(database, "Chapter1", "Activity0", "users", userId);
    await setDoc(activity0UserRef, { selection });
    console.log("Chapter1 Activity0 updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity0:", err);
  }
}

/** 获取 Chapter1 Activity0 统计数据 */
export async function getChapter1Activity0() {
  try {
    const activity0Ref = doc(database, "Chapter1", "Activity0");
    const res = await getDoc(activity0Ref);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity0:", err);
  }
}

/** 获取用户 Chapter1 Activity0 的选择 */
export async function getChapter1Activity0UserInput(userId: string) {
  try {
    const activity0UserRef = doc(database, "Chapter1", "Activity0", "users", userId);
    const res = await getDoc(activity0UserRef);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity0 user input:", err);
  }
}

/** 更新 Chapter1 Activity1 */
export async function updateChapter1Activity1(
  userId: string,
  selections: string[] | { [key: string]: number }
) {
  try {
    const activity1UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
    await setDoc(activity1UserRef, { selections });
    console.log("Chapter1 Activity1 updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity1:", err);
  }
}

/** 获取 Chapter1 Activity1 统计数据 */
export async function getChapter1Activity1() {
  try {
    const activity1Ref = doc(database, "Chapter1", "Activity1");
    const res = await getDoc(activity1Ref);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity1:", err);
  }
}

/** 获取用户 Chapter1 Activity1 选择 */
export async function getChapter1Activity1UserInput(userId: string): Promise<string[]> {
  try {
    const activity1UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
    const res = await getDoc(activity1UserRef);

    if (res.exists()) {
      const data = res.data();
      return Array.isArray(data.selections) ? data.selections : [];
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error getting Chapter1 Activity1 user input:", err);
    return [];
  }
}

/** 更新 Chapter1 Activity2_1 */
export async function updateChapter1Activity2_1(
  userId: string,
  answers: { [key: string]: number }
) {
  try {
    const activity2_1UserRef = doc(database, "Chapter1", "Activity2_1", "users", userId);
    await setDoc(activity2_1UserRef, { answers });
    console.log("Chapter1 Activity2_1 updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity2_1:", err);
  }
}

/** 获取用户 Chapter1 Activity2_1 选择 */
export async function getChapter1Activity2_1UserInput(userId: string) {
  try {
    const activity2_1UserRef = doc(database, "Chapter1", "Activity2_1", "users", userId);
    const res = await getDoc(activity2_1UserRef);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity2_1 user input:", err);
  }
}

/** 更新 Chapter1 Activity2_2 */
export async function updateChapter1Activity2_2(
  userId: string,
  answers: { [key: string]: number }
) {
  try {
    const activity2_2UserRef = doc(database, "Chapter1", "Activity2_2", "users", userId);
    await setDoc(activity2_2UserRef, answers);
    console.log("Chapter1 Activity2_2 updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity2_2:", err);
  }
}

/** 获取用户 Chapter1 Activity2_2 选择 */
export async function getChapter1Activity2_2UserInput(userId: string) {
  try {
    const activity2_2UserRef = doc(database, "Chapter1", "Activity2_2", "users", userId);
    const res = await getDoc(activity2_2UserRef);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity2_2 user input:", err);
  }
}

/** 获取用户 Chapter1 Activity3 选择 */
export async function getChapter1Activity3UserInput(userId: string) {
  try {
    const activity3UserRef = doc(database, "Chapter1", "Activity3", "users", userId);
    const res = await getDoc(activity3UserRef);
    return res.exists() ? res.data() : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity3 user input:", err);
  }
}

/** 更新 Chapter1 Activity3 */
export async function updateChapter1Activity3(
  userId: string,
  data: { frequency: string; timeCommit: string }
) {
  try {
    const activity3UserRef = doc(database, "Chapter1", "Activity3", "users", userId);
    await setDoc(activity3UserRef, data);
    console.log("Chapter1 Activity3 updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity3:", err);
  }
}

/** 获取 Chapter1 Summary */
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