// app/chapter1/hooks/Chapter1Activity.tsx

import { Chapter1 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { get, ref, set, update } from "firebase/database";

export function getChapter1Progress(username: string) {
  const progress = ref(database, `Chapter1/progress/${username}`);
  return get(progress);
}

export function initChapter1Progress(username: string) {
  const progress = ref(database, `Chapter1/progress/${username}`);
  set(progress, Chapter1.EmptyProgress)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Init chapter 1 progress error: " + err);
    });
}

export function updateChapter1Progress(username: string, field: string) {
  const progress = ref(database, `Chapter1/progress/${username}`);
  const updates = {
    [`${field}`]: "1",
  };
  update(progress, updates)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log(`Chapter 1 ${field} update error: ` + err);
    });
}

export async function updateChapter1Activity0(
  username: string,
  selection: string[] | { [key: string]: number }
) {
  const activity0UserRef = ref(database, `Chapter1/activity0_user_input/${username}`);
  const activity0Ref = ref(database, "Chapter1/activity0");

  if (Array.isArray(selection)) {
    await set(activity0UserRef, selection);
  } else {
    await update(activity0Ref, selection);
  }
}

export async function getChapter1Activity0() {
  const activity0Ref = ref(database, "Chapter1/activity0");
  const res = await get(activity0Ref);
  return res.val();
}

export async function getChapter1Activity0UserInput(username: string) {
  const activity0UserRef = ref(database, `Chapter1/activity0_user_input/${username}`);
  const res = await get(activity0UserRef);
  return res.val();
}

export async function updateChapter1Activity1(
  username: string,
  selections: string[] | { [key: string]: number }
) {
  const activity1UserRef = ref(database, `Chapter1/activity1_user_input/${username}`);
  const activity1Ref = ref(database, "Chapter1/activity1");

  if (Array.isArray(selections)) {
    await set(activity1UserRef, selections);
  } else {
    await update(activity1Ref, selections);
  }
}

export async function getChapter1Activity1(): Promise<{ [key: string]: number } | null> {
  const activity1Ref = ref(database, "Chapter1/activity1");
  const res = await get(activity1Ref);
  return res.val();
}

export async function getChapter1Activity1UserInput(username: string): Promise<string[] | null> {
  const activity1UserRef = ref(database, `Chapter1/activity1_user_input/${username}`);
  const res = await get(activity1UserRef);
  return res.val();
}

/**
 * Update user answers for Chapter1 Activity2_1.
 * @param username - User's unique identifier
 * @param answers - Object where keys are question indices and values are selected option indices
 */
export async function updateChapter1Activity2_1(
  username: string,
  answers: { [key: string]: number }
) {
  const activity2_1UserRef = ref(
    database,
    `Chapter1/activity2_1_user_input/${username}`
  );
  await set(activity2_1UserRef, answers)
    .then(() => console.log("Chapter1 Activity2_1 user input updated successfully"))
    .catch((err) => {
      console.error("Error updating Chapter1 Activity2_1 user input:", err);
    });
}

/**
 * Fetch user answers for Chapter1 Activity2_1.
 */
export async function getChapter1Activity2_1UserInput(
  username: string
): Promise<{ [key: string]: number } | null> {
  const activity2_1UserRef = ref(
    database,
    `Chapter1/activity2_1_user_input/${username}`
  );
  const snapshot = await get(activity2_1UserRef);
  return snapshot.val();
}

/**
 * Update user answers for Chapter1 Activity2_2.
 * @param username - User's unique identifier
 * @param answers - Object where keys are question indices and values are selected option indices
 */
export async function updateChapter1Activity2_2(
  username: string,
  answers: { [key: string]: number } 
) {
  const activity2_2UserRef = ref(
    database,
    `Chapter1/activity2_2_user_input/${username}`
  );
  await set(activity2_2UserRef, answers)
    .then(() => console.log("Chapter1 Activity2_2 user input updated successfully"))
    .catch((err) => {
      console.error("Error updating Chapter1 Activity2_2 user input:", err);
    });
}

/**
 * Fetch user answers for Chapter1 Activity2_2.
 */
export async function getChapter1Activity2_2UserInput(
  username: string
): Promise<{ [key: string]: number } | null> { 
  const activity2_2UserRef = ref(
    database,
    `Chapter1/activity2_2_user_input/${username}`
  );
  const snapshot = await get(activity2_2UserRef);
  return snapshot.val();
}

/** 获取用户在 Time Management (Activity3) 的答题情况 */
export async function getChapter1Activity3UserInput(username: string) {
  const activity3UserRef = ref(database, `Chapter1/activity3_user_input/${username}`);
  const snapshot = await get(activity3UserRef);
  return snapshot.val();
}

/** 更新用户在 Time Management (Activity3) 的答题情况 */
export async function updateChapter1Activity3(
  username: string,
  data: { frequency: string; timeCommit: string }
) {
  const activity3UserRef = ref(database, `Chapter1/activity3_user_input/${username}`);
  await set(activity3UserRef, data);
}

/** 获取 Chapter1 Summary */
export async function getChapter1Summary(uid: string) {
  const summaryRef = ref(database, `Chapter1/summary/${uid}`);
  return await get(summaryRef);
}

/** 设置 / 更新 Chapter1 Summary */
export async function setChapter1Summary(uid: string, data: {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}) {
  const summaryRef = ref(database, `Chapter1/summary/${uid}`);
  await set(summaryRef, data);
}