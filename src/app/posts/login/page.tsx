'use client';

import lottieJson from '@/assets/lotties/lottieCat.json';
import Lottie from 'react-lottie-player';

import googleLogo from '@/assets/images/google_logo.png';
import Image from 'next/image';
import styles from './page.module.css';

import app from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const auth = getAuth(app);

  const handleClickSignUp = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        location.href = '/';
      })

      .catch(({ code, message, customData: { email }, credential }) => {
        console.log(
          `에러코드:${code}`,
          `에러메세지:${message}`,
          `이메일:${email}`,
          `크레덴셜:${credential}`,
        );
      });
  };

  return (
    <>
      <div className={styles.loginModal}>
        <div className={styles.lottie}>
          <Lottie loop animationData={lottieJson} play speed={0.5} />
        </div>

        <button className={styles.loginButton} onClick={handleClickSignUp}>
          구현이 번거로운 관계로 부득이 <Image src={googleLogo} alt="google" width={40} />
          로만 로그인
        </button>
      </div>
    </>
  );
};
export default Login;
