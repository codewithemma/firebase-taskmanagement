import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC2hCkPSqYgpHaOnK8OzytF-lM5gRF5KrY",
  authDomain: "first-react-project-b7718.firebaseapp.com",
  projectId: "first-react-project-b7718",
  storageBucket: "first-react-project-b7718.appspot.com",
  messagingSenderId: "895450253254",
  appId: "1:895450253254:web:c8ad725e76a81f2ab5d4c7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
