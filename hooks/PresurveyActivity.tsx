import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/* Presurvey Activity1 */
export function getPresurveyActivity1(userId: string) {
    const activity1 = doc(database, `Presurvey/Activity1/users/${userId}`);
    return getDoc(activity1);
  }
  
export function setPresurveyActivity1(
    userId: string,
    data: {[key: string]: any}
  ) {
    const activity1 = doc(database, `Presurvey/Activity1/users/${userId}`);
    setDoc(activity1, data)
      .then(() => console.log("success"))
      .catch((err) => {
        console.log("Set presurvey activity1 error:", err);
      });
}

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

