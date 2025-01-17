// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwKlE2zxuIX2BNm50mzJE0wIEMX23MNZk',
  authDomain: 'ewwon-57c9d.firebaseapp.com',
  projectId: 'ewwon-57c9d',
  storageBucket: 'ewwon-57c9d.firebasestorage.app',
  messagingSenderId: '290116811789',
  appId: '1:290116811789:web:e70e1eec3f439d9bd72944',
  measurementId: 'G-7PR9L9EWFP',
};

export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);

//Email 로그인
export const signupEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
