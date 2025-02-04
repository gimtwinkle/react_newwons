'use client';
import img_logo from '@/assets/images/google_logo.png';
import { isLoggedIn, logout, useUserName } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
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
  const currentUser = isLoggedIn();
  let { isLogged, userName } = useUserName({ currentUser });
  const loginButtonText = isLogged ? 'LOGOUT' : 'LOGIN';

  const handleAuthRedirect = () => {
    if (isLogged) {
      logout();
      isLogged = false;
    } else {
      window.location.href = '/posts/login';
    }
  };

  return (
    <HeaderBox>
      <span>{isLogged ? `로그인한 사용자: ${userName}` : '로그인하지 않음'}</span>
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
            <Link href={'/posts/create'}>작성하기</Link>
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
