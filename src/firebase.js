// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvpPXGILndl7YRJH3pyl7r1QlbUCso7j4",
  authDomain: "realtor-clone-react-e50b6.firebaseapp.com",
  projectId: "realtor-clone-react-e50b6",
  storageBucket: "realtor-clone-react-e50b6.appspot.com",
  messagingSenderId: "87566591657",
  appId: "1:87566591657:web:8453842209c35b3cbbabb8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();