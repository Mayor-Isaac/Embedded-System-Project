import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://eeesmarthome-default-rtdb.firebaseio.com/",
  // Copy the rest of your config from Firebase Project Settings > General
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
