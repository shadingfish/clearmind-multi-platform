// constants/firebaseConfig.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, setLogLevel} from "firebase/firestore";

setLogLevel("silent");

// Ensure fallback values are provided in case of undefined
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "",
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId || "",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "",
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || "",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase services
export { auth, database };
// Usually used
// Firebase App initialization
// import { initializeApp } from "firebase/app";

// Firebase Realtime Database：
// import { getDatabase } from "firebase/database";

// Firebase Authentication：
// import { getAuth } from "firebase/auth";
