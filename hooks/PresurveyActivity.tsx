import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/* Presurvey Activity */
export function getPresurveyActivity(userId: string, activityNum: string) {
    const activity = doc(database, `Presurvey/${activityNum}/users/${userId}`);
    return getDoc(activity);
  }
  
export function setPresurveyActivity(
    userId: string,
    data: {[key: string]: any},
    activityNum: string
  ) {
    const activity = doc(database, `Presurvey/${activityNum}/users/${userId}`);
    setDoc(activity, data)
      .then(() => console.log("success"))
      .catch((err) => {
        console.log(`Set presurvey ${activityNum} error:`, err);
      });
}

/* Postsurvey Activity */
export function getPostsurveyActivity(userId: string, activityNum: string) {
  const activity = doc(database, `Postsurvey/${activityNum}/users/${userId}`);
  return getDoc(activity);
}

export function setPostsurveyActivity(
  userId: string,
  data: {[key: string]: any},
  activityNum: string
) {
  const activity = doc(database, `Postsurvey/${activityNum}/users/${userId}`);
  setDoc(activity, data)
    .then(() => console.log("success"))
    .catch((err) => {
      console.log(`Set postsurvey ${activityNum} error:`, err);
    });
}