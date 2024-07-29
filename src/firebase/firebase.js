// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCfS5i0M9mI5yRoADmM20aPgTRdeAuLlf8",
	authDomain: "recipe-finder-6c661.firebaseapp.com",
	projectId: "recipe-finder-6c661",
	storageBucket: "recipe-finder-6c661.appspot.com",
	messagingSenderId: "138686259238",
	appId: "1:138686259238:web:c1a12029070e347f5646e7",
	measurementId: "G-ZRJMMCME2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
