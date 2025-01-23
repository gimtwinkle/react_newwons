import googleLogo from '@/assets/images/google_logo.png';

import { googleAuth } from '@/utils/auth';
import Image from 'next/image';
import styled from 'styled-components';

const LoginButton = () => {
  const handleGoogleLogin = () => {
    googleAuth();
  };

  return (
    <>
      <LoginButtonStyled onClick={handleGoogleLogin}>
        구현이 번거로운 관계로 부득이 <Image src={googleLogo} alt="google" width={40} />
        로만 로그인
      </LoginButtonStyled>
    </>
  );
};
export default LoginButton;

const LoginButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;
