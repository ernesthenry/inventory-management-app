// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyBmz4L994uktn648GXNSvFNNemHchSk24g",
//   authDomain: "inventory-management-app-d7d36.firebaseapp.com",
//   projectId: "inventory-management-app-d7d36",
//   storageBucket: "inventory-management-app-d7d36.appspot.com",
//   messagingSenderId: "859834793201",
//   appId: "1:859834793201:web:549daec6ef231be37b7d50",
//   measurementId: "G-VBMV5PKVCQ"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const firestore = getFirestore(app);
// export { firestore, analytics };


import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmz4L994uktn648GXNSvFNNemHchSk24g",
  authDomain: "inventory-management-app-d7d36.firebaseapp.com",
  projectId: "inventory-management-app-d7d36",
  storageBucket: "inventory-management-app-d7d36.appspot.com",
  messagingSenderId: "859834793201",
  appId: "1:859834793201:web:549daec6ef231be37b7d50",
  measurementId: "G-VBMV5PKVCQ"
};

let app;
let firestore;
let analytics;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  
  // Dynamically import analytics to avoid SSR issues
  import('firebase/analytics').then((module) => {
    analytics = module.getAnalytics(app);
  });
}

export { firestore, analytics };