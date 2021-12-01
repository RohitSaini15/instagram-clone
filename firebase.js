import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASJBHfKbYgfe7tXLhhZFV4eesOENGOnOg",
  authDomain: "instagram-clone-47bc3.firebaseapp.com",
  projectId: "instagram-clone-47bc3",
  storageBucket: "instagram-clone-47bc3.appspot.com",
  messagingSenderId: "865980041553",
  appId: "1:865980041553:web:761072e8eefb2e9cc26b70",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
