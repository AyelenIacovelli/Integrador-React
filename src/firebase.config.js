import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyANQKgj0vdnXU-clKZFqvZbEymxAgm4XJs",
  authDomain: "grevery-store.firebaseapp.com",
  projectId: "grevery-store",
  storageBucket: "grevery-store.appspot.com",
  messagingSenderId: "735129439553",
  appId: "1:735129439553:web:f3bbdd023acf5c852125c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app