'use client';

import lottieJson from '@/assets/lotties/lottieCat.json';

import googleLogo from '@/assets/images/google_logo.png';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './page.module.css';

import app from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
  const auth = getAuth(app);
  const [userName, setUserName] = useState('로그인전');

  const handleClickSignUp = () => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      if (typeof window === 'undefined') return; // 서버 환경 방지
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');

      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          setUserName(`${user.displayName}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const LottiePlayer = dynamic(() => import('react-lottie-player'), { ssr: false });

  return (
    <>
      <div className={styles.loginModal}>
        <div className={styles.lottie}>
          <LottiePlayer loop animationData={lottieJson} play speed={0.5} />;
        </div>
        <div>{userName}</div>
        <button className={styles.loginButton} onClick={handleClickSignUp}>
          구현이 번거로운 관계로 부득이 <Image src={googleLogo} alt="google" width={40} />
          로만 로그인
        </button>
      </div>
    </>
  );
};
export default Login;
