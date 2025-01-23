'use client';
import img_logo from '@/assets/images/google_logo.png';
import { isLoggedIn, logout, userData } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 80px;
`;

const Logo = styled.div`
  display: inline-block;
  img {
    width: 122px;
    height: 32px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 55px;
  list-style: none;
`;

const Item = styled.li`
  list-style: none;
  font-size: 15px;
  font-weight: 500;
  color: #18a0fb;

  a:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  //로그인 상태 체크
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = isLoggedIn();
      setIsLogged(loggedIn);
    };
    checkLoginStatus();
  }, []);

  //로그인 상태 체크 -> 버튼명 변경
  const loginButtonText = isLogged ? 'LOGOUT' : 'LOGIN';

  //로그인 상태 체크 -> 사용자 표시

  const userName = isLogged ? userData?.displayName : '';

  //로그인 상태 체크 -> 클릭함수
  const handleAuthRedirect = () => {
    if (isLogged) {
      logout();
      setIsLogged(false);
    } else {
      window.location.href = '/posts/login';
    }
  };

  return (
    <HeaderBox>
      <span>로그인한 사람 {userName}</span>
      <Logo>
        <Link href={'/'}>
          <Image src={img_logo} alt="logo" />
        </Link>
      </Logo>
      <Nav>
        <List>
          <Item>
            <button onClick={handleAuthRedirect}>{loginButtonText}</button>
          </Item>
          <Item>
            <Link href={'#none'}>Menu</Link>
          </Item>
          <Item>
            <Link href={'#none'}>Menu</Link>
          </Item>
        </List>
      </Nav>
    </HeaderBox>
  );
};
export default Header;
