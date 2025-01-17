// hooks/useAuth.ts

import { database } from "../constants/firebaseConfig";
import { ref, get, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();
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

  const handleFirebaseLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert(`Login Successful! Welcome, ${user.email}`);
      console.log("User logged in:", user);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleFirebaseRegister = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return { success: false, error: "Email and password are required." };
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      alert(`Registration Successful! Welcome, ${user.email}`);
      console.log("User register:", user);
      return { success: true, user };
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      alert(`Registration failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  const getUserSecurity = (username: string) => {
    const userRef = ref(database, `security/${username}`);
    return get(userRef);
  };

  const updateUserPassword = (username: string, password: string) => {
    const userRef = ref(database, `users/${username}`);
    return update(userRef, {
      password: password,
    });
  };

  return { handleLogin, handleFirebaseLogin, handleFirebaseRegister, getUserSecurity, updateUserPassword };
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
