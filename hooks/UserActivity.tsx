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
      throw new Error(err);
    });
}

export function updateChapter2Progress(username: string, field: string) {
  const progress = ref(database, `Chapter2/progress/${username}`);
  const updates = {
    [`Chapter2/progress/${username}/${field}`]: 1,
  };
  return update(progress, updates);
}
