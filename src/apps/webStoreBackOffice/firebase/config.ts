// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import {getEnvironments} from "../helpers";

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/Prod
/*const firebaseConfig = {
  apiKey: "AIzaSyDlo9WpchI2_gcB3IX71_okSQVBn9njDts",
  authDomain: "webstore-5a333.firebaseapp.com",
  projectId: "webstore-5a333",
  storageBucket: "webstore-5a333.appspot.com",
  messagingSenderId: "246099103316",
  appId: "1:246099103316:web:0bd887c9a11b8f2ff667c1"
};*/

// Testing
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
};

// Initialize Firebase
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

export const FirebaseStorage = getStorage(FirebaseApp);
