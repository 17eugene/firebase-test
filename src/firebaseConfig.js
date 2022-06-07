import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBiawEgnNnfelAErHpE_2DvieKV60jm6tc",
  authDomain: "fir-test-76022.firebaseapp.com",
  projectId: "fir-test-76022",
  storageBucket: "fir-test-76022.appspot.com",
  messagingSenderId: "874898135908",
  appId: "1:874898135908:web:88dfb5ae802cc704be7871",
  measurementId: "G-9JJ88LVSKE",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
