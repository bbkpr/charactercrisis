import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyDekHgrt0thuN0DY4nnJi7D-hbRxMLWHP0',
  authDomain: 'character-crisis.firebaseapp.com',
  projectId: 'character-crisis',
  storageBucket: 'character-crisis.appspot.com',
  messagingSenderId: '523164459281',
  appId: '1:523164459281:web:749a9fe4757248902cecb0',
  measurementId: 'G-QWM6CRGCKX'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);
