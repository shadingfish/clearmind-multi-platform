// constants/firebaseConfig.ts

// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAN0VTXfY575A6Hr-K225hEuCFAK1U9Tbs",
  authDomain: "clearmind-442ad.firebaseapp.com",
  databaseURL: "https://clearmind-442ad-default-rtdb.firebaseio.com",
  projectId: "clearmind-442ad",
  storageBucket: "clearmind-442ad.appspot.com",
  messagingSenderId: "324251870640",
  appId: "1:324251870640:android:28556d290c35015eff6275",
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
