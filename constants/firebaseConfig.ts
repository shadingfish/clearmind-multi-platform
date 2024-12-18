// constants/firebaseConfig.ts

// Import necessary modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import * as dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Firebase configuration object using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
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
