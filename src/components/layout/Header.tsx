'use client';
import img_logo from '@/assets/images/google_logo.png';
import Login from '@/components/common/Login';
import Modal from '@/components/common/Modal';
import { isLoggedIn, logout, useUserName } from '@/utils/auth';
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
  const currentUser = isLoggedIn();
  const { isLogged = false, userName } = useUserName({ currentUser });

  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (isLogged) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }, [isLogged]);
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
          <Item>{isLogged ? <button onClick={logout}>LOGOUT</button> : null}</Item>
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

      {modalShow && (
        <Modal modalVisible={modalShow}>
          <Login />
        </Modal>
      )}
    </HeaderBox>
  );
};

export default Header;
