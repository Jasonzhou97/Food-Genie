// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWFllIhJYDe2Ypdlxt6Po9urXYsibsdaA",
  authDomain: "foodgenie-e1bd9.firebaseapp.com",
  projectId: "foodgenie-e1bd9",
  storageBucket: "foodgenie-e1bd9.appspot.com",
  messagingSenderId: "451720563301",
  appId: "1:451720563301:web:db5a7a4ff2fabed7d8948c",
  measurementId: "G-4YPZRV11XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { auth };