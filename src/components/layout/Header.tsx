'use client';
import img_logo from '@/assets/images/google_logo.png';
import { app } from '@/firebase';
import { isLoggedIn, logout, useUserInfo } from '@/utils/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderBox = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 80px;
  background: #fff;
  z-index: 10;
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

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 5px;
`;

const Header = () => {
  const [userProfile, setUserProfile] = useState('');
  const currentLoggedState = isLoggedIn();
  const { isLogged = false, userName } = useUserInfo({ currentLoggedState });

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProfile(`${user.displayName}`);
        setUserProfile(`${user.photoURL}`);
      } else {
        setUserProfile('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClickLogout = () => {
    if (isLogged) {
      logout();
    } else {
    }
  };
  return (
    //로그인 안했을때 아무것도 없음.
    //로그인 했을때 헤더 노출 + 로그아웃 버튼
    <HeaderBox>
      <Logo>
        <Link href={'/'}>
          <Image src={img_logo} alt="logo" />
        </Link>
      </Logo>
      {isLogged ? (
        <div style={{ display: 'flex', gap: '50px' }}>
          <Nav>
            <List>
              <Item>
                <Link href={'/posts/create'}>Write</Link>
              </Item>
              <Item>
                <Link href={'#none'}>Calendar(예정)</Link>
              </Item>
            </List>
          </Nav>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Profile src={userProfile} />
            {userName}
            <button onClick={handleClickLogout}>LOGOUT</button>
          </div>
        </div>
      ) : null}
    </HeaderBox>
  );
};

export default Header;
