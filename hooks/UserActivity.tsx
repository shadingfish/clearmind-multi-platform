import { Chapter2 } from "@/constants/data";
import { database } from "@/constants/firebaseConfig";
import { get, ref, set, update } from "firebase/database";

export function getChapter2Progress(username: string) {
  const progress = ref(database, `Chapter2/progress/${username}`);
  return get(progress);
}

export function initChapter2Progress(username: string) {
  const progress = ref(database, `Chapter2/progress/${username}`);
  set(progress, Chapter2.EmptyProgress)
    .then(() => console.log("success"))
    .catch((err) => {
      throw new Error("Init chapter 2 progress error: " + err);
    });
}

export function updateChapter2Progress(username: string, field: string) {
  const progress = ref(database, `Chapter2/progress/${username}`);
  const updates = {
    [`${field}`]: "1",
  };
  update(progress, updates)
    .then(() => console.log("success"))
    .catch((err) => {
      throw new Error(`Chapter 2 ${field} update error: ` + err);
    });
}
