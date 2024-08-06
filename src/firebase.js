import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBgYK1IT7xwrmR93t0sOerybFVhqH3faTk",
  authDomain: "inventory-management-d9e7b.firebaseapp.com",
  projectId: "inventory-management-d9e7b",
  storageBucket: "inventory-management-d9e7b.appspot.com",
  messagingSenderId: "733036480925",
  appId: "1:733036480925:web:b01867a377f13ed990c774",
  measurementId: "G-2GBRV5WH3H"
};

let app;
let firestore;
let analytics;
let storage; // Add this line

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  storage = getStorage(app); // Initialize storage
  
  // Dynamically import analytics to avoid SSR issues
  import('firebase/analytics').then((module) => {
    analytics = module.getAnalytics(app);
  });
}

export { firestore, analytics, storage } // Export storage
