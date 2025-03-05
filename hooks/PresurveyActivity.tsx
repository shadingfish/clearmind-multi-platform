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

/* Presurvey Percent */

export function getPresurveyPagesBackend(userId: string) {
  const activity = doc(database, `Presurvey/PagesCompleted/users/${userId}`);
  return getDoc(activity);
}

export function setPresurveyPagesBackend(
  userId: string,
  newPagesCompleted: number,
) {
  const activity = doc(database, `Presurvey/PagesCompleted/users/${userId}`);
  setDoc(activity, 
    {
      pagesCompleted: newPagesCompleted
    }
    )
    .then(() => console.log("success"))
    .catch((err) => {
      console.log(`Set postsurvey percent error:`, err);
    });
}

/* Postsurvey Percent */

export function getPostsurveyPagesBackend(userId: string) {
  const activity = doc(database, `Postsurvey/PagesCompleted/users/${userId}`);
  return getDoc(activity);
}

export function setPostsurveyPagesBackend(
  userId: string,
  newPagesCompleted: number, //current page number
) {
    const activity = doc(database, `Postsurvey/PagesCompleted/users/${userId}`);
    setDoc(activity, 
      {
        pagesCompleted: newPagesCompleted
      }
      )
      .then(() => console.log("success"))
      .catch((err) => {
        console.log(`Set postsurvey percent error:`, err);
      });
}