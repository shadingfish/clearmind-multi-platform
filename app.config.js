import "dotenv/config";

module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
  },
  ios: {
    ...config.ios,
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST || "./GoogleService-Info.plist",
  },
  extra: {
    ...config.extra,
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
});