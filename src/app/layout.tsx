import Modal from '@/components/common/Modal';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'React Newwons',
  description: 'Next.js project with Redux and Firebase',
};

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head></head>
      <body className={`${montserrat.className}`}>
        <div id="wrap">
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
          </StyledComponentsRegistry>
          <Modal></Modal>
        </div>
      </body>
    </html>
  );
}
