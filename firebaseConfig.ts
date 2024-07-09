import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0UoDXj7UWMqg6mWl6Om-z3W-XMGEXyR0",
  authDomain: "shuttlex-test-task.firebaseapp.com",
  projectId: "shuttlex-test-task",
  storageBucket: "shuttlex-test-task.appspot.com",
  messagingSenderId: "390243423818",
  appId: "1:390243423818:web:4cdd83388e2ba65a6df8b3",
  measurementId: "G-84SB8WHFD1"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export const usersRef = collection(FIRESTORE_DB, 'users');
export const roomRef = collection(FIRESTORE_DB, 'rooms');

