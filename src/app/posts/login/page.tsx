'use client';

import lottieJson from '@/assets/lotties/lottieCat.json';
import LoginButton from '@/components/common/LoginButton';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const Login = () => {
  const LottiePlayer = dynamic(() => import('react-lottie-player'), { ssr: false });

  return (
    <>
      <div className={styles.login}>
        <div className={styles.lottie}>
          <LottiePlayer loop animationData={lottieJson} play speed={0.5} />
        </div>
        <LoginButton />
      </div>
    </>
  );
};

export default Login;
