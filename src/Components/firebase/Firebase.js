/* eslint-disable import/no-anonymous-default-export */
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { serverTimestamp, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiApuULqc0caO5qbTpVyy0BIe307vJIyY",
  authDomain: "link-in-4783a.firebaseapp.com",
  projectId: "link-in-4783a",
  storageBucket: "link-in-4783a.appspot.com",
  messagingSenderId: "54778219213",
  appId: "1:54778219213:web:d045054fb4f8303815f784"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const storage = getStorage();
const timestamp = serverTimestamp();
const db = getFirestore();

export { app, auth, google, facebook, storage, timestamp, db };
