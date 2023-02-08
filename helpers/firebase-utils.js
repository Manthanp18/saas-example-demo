import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        resolve(user.uid);
      } else {
        reject(null);
      }
    });
  });
};
