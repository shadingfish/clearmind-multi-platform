// constants/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from "expo-constants";

// Ensure fallback values are provided in case of undefined
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "",
  databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseUrl || "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "",
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || "",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const database = getDatabase(app);

// Usually used
// Firebase App initialization
// import { initializeApp } from "firebase/app";

// Firebase Realtime Database：
// import { getDatabase } from "firebase/database";

// Firebase Authentication：
// import { getAuth } from "firebase/auth";
