// import { Chapter2 } from "@/constants/data";
// import { database } from "@/constants/firebaseConfig";
// import { get, ref, set, update } from "firebase/database";

// export function getChapter2Progress(username: string) {
//   const progress = ref(database, `Chapter2/progress/${username}`);
//   return get(progress);
// }

// export function initChapter2Progress(username: string) {
//   const progress = ref(database, `Chapter2/progress/${username}`);
//   set(progress, Chapter2.EmptyProgress)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Init chapter 2 progress error: " + err);
//     });
// }

// export function updateChapter2Progress(username: string, field: string) {
//   const progress = ref(database, `Chapter2/progress/${username}`);
//   const updates = {
//     [`${field}`]: "1",
//   };
//   update(progress, updates)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log(`Chapter 2 ${field} update error: ` + err);
//     });
// }

// export async function updateChapter2Activity1(
//   username: string,
//   selection: string[]
// ) {
//   const activity1 = ref(database, "Chapter2/activity1");
//   const activity1User = ref(
//     database,
//     `Chapter2/activity1_user_input/${username}`
//   );

//   const activity1Data = await getChapter2Activity1();

//   get(activity1User)
//     .then((snapshot) => {
//       const updates: { [key: string]: number } = {};

//       if (snapshot.exists()) {
//         const prevSelection = snapshot.val();
//         prevSelection.forEach((attr: string) => {
//           if (activity1Data[attr] !== undefined) {
//             const newValue = activity1Data[attr] - 1;
//             updates[attr] = newValue;
//           }
//         });
//       }

//       selection.forEach((attr) => {
//         if (activity1Data[attr] !== undefined) {
//           const newValue = (updates[attr] ?? activity1Data[attr]) + 1;
//           updates[attr] = newValue;
//         } else {
//           updates[attr] = 1;
//         }
//       });

//       set(activity1User, selection).catch((err) => {
//         console.log("Set chapter 2 activity1 user data error: " + err);
//       });
//       update(activity1, updates).catch((err) => {
//         console.log("Update chapter 2 activity1 data error: " + err);
//       });
//     })
//     .catch((err) => console.log("Error getting chapter 2 activity1: " + err));
// }

// export async function getChapter2Activity1() {
//   const activity1 = ref(database, "Chapter2/activity1");
//   const res = await get(activity1);
//   return res.val();
// }

// export function getChapter2Activity2(username: string) {
//   const activity2 = ref(database, `Chapter2/activity2/${username}`);
//   return get(activity2);
// }

// export function setChapter2Activity2(
//   username: string,
//   data: { [key: string]: string }
// ) {
//   const activity2 = ref(database, `Chapter2/activity2/${username}`);
//   set(activity2, data)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 2 activity2 error: " + err);
//     });
// }

// export function getChapter2Summary(username: string) {
//   const summary = ref(database, `Chapter2/summary/${username}`);
//   return get(summary);
// }

// export function setChapter2Summary(
//   username: string,
//   data: { [key: string]: string }
// ) {
//   const summary = ref(database, `Chapter2/summary/${username}`);
//   set(summary, data)
//     .then(() => console.log("success"))
//     .catch((err) => {
//       console.log("Set chapter 2 summary error: " + err);
//     });
// }
