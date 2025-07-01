// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJfWb6fXMIXTjj_k_ZyV12f9j4gEkNPQk",
  authDomain: "lifepluse-df50f.firebaseapp.com",
  projectId: "lifepluse-df50f",
  storageBucket: "lifepluse-df50f.firebasestorage.app",
  messagingSenderId: "890178111147",
  appId: "1:890178111147:web:8a5adaa7dc260f083199ee",
  measurementId: "G-VEMH14GF1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);