// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDwKlE2zxuIX2BNm50mzJE0wIEMX23MNZk',
  authDomain: 'ewwon-57c9d.firebaseapp.com',
  projectId: 'ewwon-57c9d',
  storageBucket: 'ewwon-57c9d.firebasestorage.app',
  messagingSenderId: '290116811789',
  appId: '1:290116811789:web:e70e1eec3f439d9bd72944',
  measurementId: 'G-7PR9L9EWFP',
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
