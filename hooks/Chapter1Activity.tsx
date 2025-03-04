// // app/chapter1/hooks/Chapter1Activity.tsx

import { Chapter1 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/** 获取用户 Chapter1 进度 */
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

/** 初始化 Chapter1 进度 */
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
  data: {
    topValue: string;
    textWhyValue: string;
    textProcrastinate: string;
    checkboxes: string[];
    otherText: string;
  }
) {
  try {
    const activity1UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
    await setDoc(activity1UserRef, data, { merge: true });
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
export async function getChapter1Activity1UserInput(userId: string): Promise<{
  topValue: string;
  textWhyValue: string;
  textProcrastinate: string;
  checkboxes: string[];
  otherText: string;
} | null> {
  try {
    const activity1UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
    const res = await getDoc(activity1UserRef);

    if (res.exists()) {
      const data = res.data();
      return {
        topValue: data.topValue || "",
        textWhyValue: data.textWhyValue || "",
        textProcrastinate: data.textProcrastinate || "",
        checkboxes: Array.isArray(data.checkboxes) ? data.checkboxes : [],
        otherText: data.otherText || "",
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error getting Chapter1 Activity1 user input:", err);
    return null;
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
    await setDoc(activity2_2UserRef, { answers });
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

// import { Chapter1 } from "@/constants/data";
// import { database } from "@/constants/firebaseConfig";
// import { get, ref, set, update } from "firebase/database";

// export function getChapter1Progress(username: string) {
//   const progress = ref(database, `Chapter1/progress/${username}`);
//   return get(progress);
// }

// export function initChapter1Progress(username: string) {
//   const progress = ref(database, `Chapter1/progress/${username}`);
//   set(progress, Chapter1.EmptyProgress)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Init chapter 1 progress error: " + err);
//     });
// }

// export function updateChapter1Progress(username: string, field: string) {
//   const progress = ref(database, `Chapter1/progress/${username}`);
//   const updates = {
//     [`${field}`]: "1",
//   };
//   update(progress, updates)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log(`Chapter 1 ${field} update error: ` + err);
//     });
// }

// export async function updateChapter1Activity0(
//   username: string,
//   selection: string[] | { [key: string]: number }
// ) {
//   const activity0UserRef = ref(database, `Chapter1/activity0_user_input/${username}`);
//   const activity0Ref = ref(database, "Chapter1/activity0");

//   if (Array.isArray(selection)) {
//     await set(activity0UserRef, selection);
//   } else {
//     await update(activity0Ref, selection);
//   }
// }

// export async function getChapter1Activity0() {
//   const activity0Ref = ref(database, "Chapter1/activity0");
//   const res = await get(activity0Ref);
//   return res.val();
// }

// export async function getChapter1Activity0UserInput(username: string) {
//   const activity0UserRef = ref(database, `Chapter1/activity0_user_input/${username}`);
//   const res = await get(activity0UserRef);
//   return res.val();
// }

// export async function updateChapter1Activity1(
//   username: string,
//   selections: string[] | { [key: string]: number }
// ) {
//   const activity1UserRef = ref(database, `Chapter1/activity1_user_input/${username}`);
//   const activity1Ref = ref(database, "Chapter1/activity1");

//   if (Array.isArray(selections)) {
//     await set(activity1UserRef, selections);
//   } else {
//     await update(activity1Ref, selections);
//   }
// }

// export async function getChapter1Activity1(): Promise<{ [key: string]: number } | null> {
//   const activity1Ref = ref(database, "Chapter1/activity1");
//   const res = await get(activity1Ref);
//   return res.val();
// }

// export async function getChapter1Activity1UserInput(username: string): Promise<string[] | null> {
//   const activity1UserRef = ref(database, `Chapter1/activity1_user_input/${username}`);
//   const res = await get(activity1UserRef);
//   return res.val();
// }

// /**
//  * Update user answers for Chapter1 Activity2_1.
//  * @param username - User's unique identifier
//  * @param answers - Object where keys are question indices and values are selected option indices
//  */
// export async function updateChapter1Activity2_1(
//   username: string,
//   answers: { [key: string]: number }
// ) {
//   const activity2_1UserRef = ref(
//     database,
//     `Chapter1/activity2_1_user_input/${username}`
//   );
//   await set(activity2_1UserRef, answers)
//     .then(() => console.log("Chapter1 Activity2_1 user input updated successfully"))
//     .catch((err) => {
//       console.error("Error updating Chapter1 Activity2_1 user input:", err);
//     });
// }

// /**
//  * Fetch user answers for Chapter1 Activity2_1.
//  */
// export async function getChapter1Activity2_1UserInput(
//   username: string
// ): Promise<{ [key: string]: number } | null> {
//   const activity2_1UserRef = ref(
//     database,
//     `Chapter1/activity2_1_user_input/${username}`
//   );
//   const snapshot = await get(activity2_1UserRef);
//   return snapshot.val();
// }

// /**
//  * Update user answers for Chapter1 Activity2_2.
//  * @param username - User's unique identifier
//  * @param answers - Object where keys are question indices and values are selected option indices
//  */
// export async function updateChapter1Activity2_2(
//   username: string,
//   answers: { [key: string]: number } 
// ) {
//   const activity2_2UserRef = ref(
//     database,
//     `Chapter1/activity2_2_user_input/${username}`
//   );
//   await set(activity2_2UserRef, answers)
//     .then(() => console.log("Chapter1 Activity2_2 user input updated successfully"))
//     .catch((err) => {
//       console.error("Error updating Chapter1 Activity2_2 user input:", err);
//     });
// }

// /**
//  * Fetch user answers for Chapter1 Activity2_2.
//  */
// export async function getChapter1Activity2_2UserInput(
//   username: string
// ): Promise<{ [key: string]: number } | null> { 
//   const activity2_2UserRef = ref(
//     database,
//     `Chapter1/activity2_2_user_input/${username}`
//   );
//   const snapshot = await get(activity2_2UserRef);
//   return snapshot.val();
// }

// /** 获取用户在 Time Management (Activity3) 的答题情况 */
// export async function getChapter1Activity3UserInput(username: string) {
//   const activity3UserRef = ref(database, `Chapter1/activity3_user_input/${username}`);
//   const snapshot = await get(activity3UserRef);
//   return snapshot.val();
// }

// /** 更新用户在 Time Management (Activity3) 的答题情况 */
// export async function updateChapter1Activity3(
//   username: string,
//   data: { frequency: string; timeCommit: string }
// ) {
//   const activity3UserRef = ref(database, `Chapter1/activity3_user_input/${username}`);
//   await set(activity3UserRef, data);
// }

// /** 获取 Chapter1 Summary */
// export async function getChapter1Summary(uid: string) {
//   const summaryRef = ref(database, `Chapter1/summary/${uid}`);
//   return await get(summaryRef);
// }

// /** 设置 / 更新 Chapter1 Summary */
// export async function setChapter1Summary(uid: string, data: {
//   answer1: string;
//   answer2: string;
//   answer3: string;
//   answer4: string;
// }) {
//   const summaryRef = ref(database, `Chapter1/summary/${uid}`);
//   await set(summaryRef, data);
// }