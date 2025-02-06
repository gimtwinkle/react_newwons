'use client';
import img_logo from "@/assets/images/google_logo.png";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const FooterBox = styled.div`
  bottom:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 120px 80px 112px;
  background: #000;
  opacity: 0.8;
`;

const Logo = styled.div`
  display: inline-block;
  background: transparent;
  img {
    width: 122px;
    height: 32px;
  }
`;

const CorpList = styled.ul`
  list-style: none;
  display: flex;
  gap: 55px;
`;

const Item = styled.li`
  list-style: none;
  font-size: 15px;
  font-weight: 500;
  color: #fff;

  a:hover {
    text-decoration: underline;
  }
`;

const CopyRight = styled.p`
  display: inline-block;
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`;

const Footer = () => {
  return (
    <FooterBox>

      <Logo>
        <Link href={'/'}>
          <Image src={img_logo} alt="logo" />
        </Link>
      </Logo>

      <CorpList>
        <Item><Link href={'#none'}>Additional Link</Link></Item>
        <Item><Link href={'#none'}>Additional Link</Link></Item>
        <Item><Link href={'#none'}>Additional Link</Link></Item>
      </CorpList>

      <CopyRight>© Your Company 2022. We love you!</CopyRight>
    </FooterBox>
  );
};

export default Footer;
