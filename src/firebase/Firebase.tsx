import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyDMLcbg9Mui1sLWFMdNGea-hhYKFVz9rdI',
  authDomain: 'capstone-96378.firebaseapp.com',
  projectId: 'capstone-96378',
  storageBucket: 'capstone-96378.appspot.com',
  messagingSenderId: '544847549773',
  appId: '1:544847549773:web:1b199598f8761a21761304',
  measurementId: 'G-7P4XGE0H3M',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
firebase.analytics();
const storage = firebase.storage();

export { storage, firebase as default };
