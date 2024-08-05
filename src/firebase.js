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

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  
  // Dynamically import analytics to avoid SSR issues
  import('firebase/analytics').then((module) => {
    analytics = module.getAnalytics(app);
  });
}

export { firestore, analytics };