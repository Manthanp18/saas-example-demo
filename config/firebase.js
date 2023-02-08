import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const userAuth = getAuth().onAuthStateChanged((user) => {
//   if (user) {
//     // User logged in already or has just logged in.
//     console.log(user.uid);
//   } else {
//     // User not logged in or has just logged out.
//   }
// });
// export default userAuth;

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      user ? setCurrentUser(user.uid) : setCurrentUser(null);
      // console.log(user.uid);
    });
  });

  return { currentUser };
};

export default useAuth;
