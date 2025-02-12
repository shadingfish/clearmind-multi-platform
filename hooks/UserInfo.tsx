import { database } from "@/constants/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export type UserDataType = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  hasTherapyExperience: string;
  therapyDetails: string;
  learningExpectation: string;
};

export async function addUser(user: UserDataType, id: string) {
  try {
    await setDoc(doc(database, "users", id), {
      email: user.email.toLowerCase(),
      username: user.username.toLowerCase(),
      fullname: user.fullName,
      hasTherapyExperience: user.hasTherapyExperience,
      learningExpectation: user.learningExpectation,
      therapyDetails: user.therapyDetails,
    });

    console.log("Success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUser(username: string = "", email: string = "") {
  if (username == "" && email == "") {
    alert("Please provide email or username");
    return [];
  }

  username = username.toLowerCase();
  email = email.toLowerCase();
  const res = new Map();

  if (username.length > 0) {
    const q = query(
      collection(database, "users"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      res.set(doc.id, { id: doc.id, ...doc.data() });
    });
  }

  if (email.length > 0) {
    const q = query(collection(database, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      res.set(doc.id, { id: doc.id, ...doc.data() }); // Prevents duplicate entries
    });
  }
  return Array.from(res.values());
}
