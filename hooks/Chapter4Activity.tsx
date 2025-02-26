import { Chp4SummaryQuestions } from "@/app/(app)/chapter4/content/summary";
import { Chapter4 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getChapter4Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter4", "Progress", "users", userId);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await initChapter4Progress(userId);
      return Chapter4.EmptyProgress;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function initChapter4Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter4", "Progress", "users", userId);
    await setDoc(progressRef, Chapter4.EmptyProgress);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function updateChapter4Progress(userId: string, field: string) {
  const progressRef = doc(database, "Chapter4", "Progress", "users", userId);

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

export function getChapter4Activity2(userId: string) {
  const activity2 = doc(database, `Chapter4/Activity2/users/${userId}`);
  return getDoc(activity2);
}

export function setChapter4Activity2(
  userId: string,
  data: { [key: string]: string }
) {
  const activity2 = doc(database, `Chapter4/Activity2/users/${userId}`);
  setDoc(activity2, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 4 activity2 error:", err);
    });
}

export function getChapter4Activity3(userId: string) {
  const activity3 = doc(database, `Chapter4/Activity3/users/${userId}`);
  return getDoc(activity3);
}

export function setChapter4Activity3(
  userId: string,
  data: { [key: string]: string }
) {
  const activity3 = doc(database, `Chapter4/Activity3/users/${userId}`);
  setDoc(activity3, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 4 activity3 error:", err);
    });
}

export function getChapter4Activity4(userId: string) {
  const activity4 = doc(database, `Chapter4/Activity4/users/${userId}`);
  return getDoc(activity4);
}

export function setChapter4Activity4(
  userId: string,
  data: { [key: string]: string }
) {
  const activity4 = doc(database, `Chapter4/Activity4/users/${userId}`);
  setDoc(activity4, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 4 activity4 error:", err);
    });
}

export function getChapter4Summary(userId: string) {
  const summary = doc(database, `Chapter4/Summary/users/${userId}`);
  return getDoc(summary);
}

export function setChapter4Summary(userId: string, data: Chp4SummaryQuestions) {
  const summary = doc(database, `Chapter4/Summary/users/${userId}`);
  setDoc(summary, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 4 Summary error:", err);
    });
}

// export function getChapter3Activity2(userId: string) {
//   const activity2 = doc(database, `Chapter3/Activity2/users/${userId}`);
//   return getDoc(activity2);
// }

// export function setChapter3Activity2(userId: string, data: Activity2Questions) {
//   const activity2 = doc(database, `Chapter3/Activity2/users/${userId}`);
//   setDoc(activity2, data)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 3 activity2 error:", err);
//     });
// }

// /* Chapter3 Activity3 */

// export function getChapter3Activity3(userId: string) {
//   const activity3 = doc(database, `Chapter3/Activity3/users/${userId}`);
//   return getDoc(activity3);
// }

// export function setChapter3Activity3(userId: string, data: Activity3Questions) {
//   const activity3 = doc(database, `Chapter3/Activity3/users/${userId}`);
//   // Ensure whichPaths is stored as an array
//   const formattedData = {
//     ...data,
//     whichPaths: Array.from(data.whichPaths ?? []), // Convert Set to Array safely
//   };
//   setDoc(activity3, formattedData)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 3 activity3 error:", err);
//     });
// }

// /* Chapter3 Activity6 */

// export function getChapter3Activity6(userId: string) {
//   const activity6 = doc(database, `Chapter3/Activity6/users/${userId}`);
//   return getDoc(activity6);
// }

// export function setChapter3Activity6(userId: string, data: Activity6Questions) {
//   const activity6 = doc(database, `Chapter3/Activity6/users/${userId}`);

//   const formattedData = {
//     ...data,
//     whichCogDistPaths: Array.from(data.whichCogDistPaths ?? []), // Convert Set to Array safely
//   };
//   setDoc(activity6, formattedData)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 3 activity6 error:", err);
//     });
// }

// /* Chapter 3 Activity 8 */

// export function getChapter3Activity8(userId: string) {
//   const activity2 = doc(database, `Chapter3/Activity8/users/${userId}`);
//   return getDoc(activity2);
// }

// export function setChapter3Activity8(userId: string, data: Activity8Questions) {
//   const activity2 = doc(database, `Chapter3/Activity8/users/${userId}`);
//   setDoc(activity2, data)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 3 activity8 error:", err);
//     });
// }

// /* Chapter 3 Summary */

// export function getChapter3Summary(userId: string) {
//   const activity2 = doc(database, `Chapter3/Summary/users/${userId}`);
//   return getDoc(activity2);
// }

// export function setChapter3Summary(userId: string, data: SummaryQuestions) {
//   const activity2 = doc(database, `Chapter3/Summary/users/${userId}`);
//   setDoc(activity2, data)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 3 summary error:", err);
//     });
// }
