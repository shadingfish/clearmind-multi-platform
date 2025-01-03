// hooks/useAuth.ts

import { database } from "../constants/firebaseConfig";
import { ref, get } from "firebase/database";

export const useAuth = () => {
  const handleLogin = (username: string, password: string) => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    const userRef = ref(database, `users/${username}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        if (user.password === password) {
          alert("Login Successful!");
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User does not exist. Please register.");
      }
    });
  };

  return { handleLogin };
};
