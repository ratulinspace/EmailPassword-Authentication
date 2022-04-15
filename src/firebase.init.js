// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAz3awhqpOnX0rbveqaZcFM3JoXVSg2mOU",
    authDomain: "email-pass-auth-tp-1.firebaseapp.com",
    projectId: "email-pass-auth-tp-1",
    storageBucket: "email-pass-auth-tp-1.appspot.com",
    messagingSenderId: "382595190103",
    appId: "1:382595190103:web:35019f9fbb33cda2844212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;