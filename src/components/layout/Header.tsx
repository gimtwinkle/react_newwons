'use client';
import img_logo from '@/assets/images/google_logo.png';
import Login from '@/components/common/Login';
import Modal from '@/components/common/Modal';
import { app } from '@/firebase';
import { logout } from '@/utils/auth';
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

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setUserName(`${user.displayName}`);
      } else {
        setIsLogged(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const loginButtonText = isLogged ? 'LOGOUT' : 'LOGIN';

  const [visible, setVisible] = useState(false); //visible변수, 셋터 -> 변수값을 변경하는 함수(기능)

  const handleAuthRedirect = () => {
    if (isLogged) {
      logout();
      setIsLogged(false);
    } else {
      // window.location.href = '/posts/login';
      setVisible(true); //로그인창 노출
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
      {/* () => setVisible(false) 값(기능)을 전달해야 하니까  () => 써서 함수라는것을 알려줘야 함, {setVisible(false)} 적으면 void 값이 전달 됨 */}
      {/* {visible ? (
        <Modal dimmedClick={() => setVisible(false)}>
          <p>이곳에 원하는 내용을 넣을 수 있어요!</p>
        </Modal>
      ) : (
        <></>
      )}   밑에거랑 같은식인데 거짓인데 랜더링 할 게 없을 경우 밑에처럼 간결하게 쓸 수 있음*/}

      {visible && (
        <Modal dimmedClick={() => setVisible(false)}>
          <Login />
        </Modal>
      )}
    </HeaderBox>
  );
};

export default Header;
