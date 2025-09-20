import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNYNMmZLlPmjuK6TKh-AOPRgVai5romVc",
  authDomain: "tshirts-bdddf.firebaseapp.com",
  projectId: "tshirts-bdddf",
  storageBucket: "tshirts-bdddf.appspot.com",
  messagingSenderId: "557235246979",
  appId: "1:557235246979:web:a2eeb6c54f23c73d6548b6",
  measurementId: "G-R80294LHEJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
