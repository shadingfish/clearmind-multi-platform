// hooks/useAuth.ts

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { auth } from "../constants/firebaseConfig";

export const useAuth = () => {
  const [authState, setAuthState] = useState<{
    isSignedIn: boolean;
    pending: boolean;
    user: User | null;
  }>({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setAuthState({ user, pending: false, isSignedIn: true });
      } else {
        setAuthState({ ...authState, pending: false });
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const handleFirebaseLogin = (email: string, password: string) => {
    if (!email || !password) {
      console.log("Please enter email and password");
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleFirebaseLogout = () => {
    try {
      auth.signOut();
      console.log("User logged out");
      setAuthState({
        isSignedIn: false,
        pending: false,
        user: null,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFirebaseRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return { success: false, error: "Email and password are required." };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username.toLowerCase(),
      });

      const user = auth.currentUser;

      console.log("User register:", user);
      return { success: true, user };
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      alert(`Registration failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  return {
    handleFirebaseLogin,
    handleFirebaseRegister,
    handleFirebaseLogout,
    ...authState,
  };
};

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user;
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });

// const handleFirebaseLogin = (email: string, password: string) => {
//   if (!email || !password) {
//     alert("Please enter email and password");
//     return;
//   }
//   auth
//     .createUserWithEmailAndPassword(email, password)
//     .then(() => {
//       console.log('User account created & signed in!');
//     })
//     .catch(error => {
//       if (error.code === 'auth/email-already-in-use') {
//         alert("That email address is already in use!");
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         alert("That email address is invalid!");
//         console.log('That email address is invalid!');
//       }
//       console.error(error);
//     });
// };
