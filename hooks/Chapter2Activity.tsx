import { Chapter2 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function getChapter2Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter2", "Progress", "users", userId);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await initChapter2Progress(userId);
      return Chapter2.EmptyProgress;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function initChapter2Progress(userId: string) {
  try {
    const progressRef = doc(database, "Chapter2", "Progress", "users", userId);
    await setDoc(progressRef, Chapter2.EmptyProgress);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function updateChapter2Progress(userId: string, field: string) {
  const progressRef = doc(database, "Chapter2", "Progress", "users", userId);

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

export async function updateChapter2Activity1(
  userId: string,
  selection: string[]
) {
  try {
    const activity1 = doc(database, "Chapter2", "Activity1");
    const activity1User = doc(database, `Chapter2/Activity1/users/${userId}`);
    const activity1Data = await getChapter2Activity1();
    console.log(activity1Data);
    getDoc(activity1User)
      .then((snapshot) => {
        const updates: { [key: string]: number } = {};

        if (snapshot.exists()) {
          const prevSelection = snapshot.data();
          prevSelection["selection"].forEach((attr: string) => {
            console.log(`all_emotions.${attr}`);
            if (
              activity1Data[attr] !== undefined &&
              activity1Data[attr] !== 0
            ) {
              const newValue = activity1Data[attr] - 1;
              updates[`all_emotions.${attr}`] = newValue;
            }
          });
        }

        selection.forEach((attr) => {
          if (activity1Data[attr] !== undefined) {
            const newValue =
              (updates[`all_emotions.${attr}`] ?? activity1Data[attr]) + 1;
            updates[`all_emotions.${attr}`] = newValue;
          } else {
            updates[`all_emotions.${attr}`] = 1;
          }
        });
        setDoc(activity1User, { selection: selection }).catch((err) => {
          console.log("Set chapter 2 activity1 user data error: " + err);
        });
        updateDoc(activity1, updates).catch((err) => {
          console.log("Update chapter 2 activity1 data error: " + err);
        });
      })
      .catch((err) => console.log("Error getting chapter 2 activity1: " + err));
  } catch (err) {
    console.log(err);
  }
}

export async function getChapter2Activity1() {
  try {
    const activity1 = doc(database, "Chapter2", "Activity1");
    const res = await getDoc(activity1);
    return res.data()!["all_emotions"];
  } catch (err) {
    console.log(err);
  }
}

export function getChapter2Activity2(userId: string) {
  const activity2 = doc(database, `Chapter2/Activity2/users/${userId}`);
  return getDoc(activity2);
}

export function setChapter2Activity2(
  userId: string,
  data: { [key: string]: string }
) {
  const activity2 = doc(database, `Chapter2/Activity2/users/${userId}`);
  setDoc(activity2, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 2 activity2 error: " + err);
    });
}

export function getChapter2Summary(userId: string) {
  const summary = doc(database, `Chapter2/Summary/users/${userId}`);
  return getDoc(summary);
}

export function setChapter2Summary(
  userId: string,
  data: { [key: string]: string }
) {
  const summary = doc(database, `Chapter2/Summary/users/${userId}`);
  setDoc(summary, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log("Set chapter 2 summary error: " + err);
    });
}
