import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: Constants.expoConfig.extra.API_KEY || process.env.API_KEY,
//   authDomain: Constants.expoConfig.extra.AUTH_DOMAIN || process.env.AUTH_DOMAIN,
//   projectId: Constants.expoConfig.extra.PROJECT_ID || process.env.PROJECT_ID,
//   storageBucket:
//     Constants.expoConfig.extra.STORAGE_BUCKET || process.env.STORAGE_BUCKET,
//   messagingSenderId:
//     Constants.expoConfig.extra.MESSAGING_ID || process.env.MESSAGING_ID,
//   appId: Constants.expoConfig.extra.APP_ID || process.env.APP_ID,
//   measurementId:
//     Constants.expoConfig.extra.MEASUREMENT_ID || process.env.MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { app, auth, firestore, storage };
