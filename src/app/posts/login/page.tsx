'use client';

import app from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './page.module.css';

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

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          `에러코드:${errorCode}`,
          `에러메세지:${errorMessage}`,
          `이메일:${email}`,
          `크레덴셜:${credential}`,
        );
      });
  };

  return (
    <>
      <div className={styles.loginmodal}>
        <button onClick={handleClickSignUp}>구현이 번거로운 관계로 부득이 구글로만 로그인</button>
      </div>
    </>
  );
};
export default Login;
