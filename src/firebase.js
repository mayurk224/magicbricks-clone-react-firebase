// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkZPS_QbgRxP63LLFNtx37ncNJHX2FvDw",
  authDomain: "magicbricks-clone-react.firebaseapp.com",
  projectId: "magicbricks-clone-react",
  storageBucket: "magicbricks-clone-react.appspot.com",
  messagingSenderId: "29613328765",
  appId: "1:29613328765:web:7d8d0383a28bbf74bb6414"
};

initializeApp(firebaseConfig);
export const db = getFirestore();