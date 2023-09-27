import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMDLQU0jSYQCEy96wvjKD6_-Di9Fpyox4",
  authDomain: "fitness-tracker-a6608.firebaseapp.com",
  projectId: "fitness-tracker-a6608",
  storageBucket: "fitness-tracker-a6608.appspot.com",
  messagingSenderId: "900732439171",
  appId: "1:900732439171:web:d17fbdf6728f17926ca9b6",
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export const auth = getAuth(firebase);
