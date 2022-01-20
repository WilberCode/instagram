// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGLZOpyu6ejWcBOMK7sKJti7stCvGD1w",
  authDomain: "instagram-3b721.firebaseapp.com",
  projectId: "instagram-3b721",
  storageBucket: "instagram-3b721.appspot.com",
  messagingSenderId: "206422635636",
  appId: "1:206422635636:web:8eb23c95438ab42afc4d21"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage()


export {app, db, storage}
