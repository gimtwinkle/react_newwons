'use client';

import Login from '@/components/common/Login';
import Modal from '@/components/common/Modal';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { isLoggedIn, useUserInfo } from '@/utils/auth';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
});

const metadata: Metadata = {
  title: 'React Newwons',
  description: 'Next.js project with Redux and Firebase',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const currentLoggedState = isLoggedIn();
  const { isLogged = false } = useUserInfo({ currentLoggedState }); // Default value to prevent errors

  useEffect(() => {
    if (!isLogged) {
      setVisible(true); // Show modal if NOT logged in
    } else {
      setVisible(false); // Hide modal if logged in
    }
  }, [isLogged]); // Depend on authentication state

  return (
    <html lang="ko">
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta name="description" content={`${metadata.description}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={montserrat.className}>
        <div id="wrap">
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </div>
        {visible && <Modal dimmedClick={() => setVisible(false)} children={<Login />} />}
      </body>
    </html>
  );
};

export default RootLayout;
