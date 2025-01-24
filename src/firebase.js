// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT0GHMH1YkqFpOHrTeq7C1tjdz-db03XY",
    authDomain: "maquetsmart.firebaseapp.com",
    projectId: "maquetsmart",
    storageBucket: "maquetsmart.firebasestorage.app",
    messagingSenderId: "804235518953",
    appId: "1:804235518953:web:f4f3bf52825d36a2742178",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig)


export const authFirebase=getAuth();
export const dbFirebase=getFirestore(appFirebase);

export default appFirebase;

