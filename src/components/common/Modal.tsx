'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const [modalVisible, setModalVisible] = useState({ isLoading });

  useEffect(() => {
    if (!user || null) {
      setModalVisible({ isLoading: true });
    }
  }, []);

  const handleClose = () => {
    if (!user || null) {
      // console.log('비로그인 상태에서는 닫히지 않도록');
      return;
    } else {
      setModalVisible({ isLoading: false });
    }
  };

  return (
    <DimmedField className={modalVisible ? 'show' : ''} onClick={handleClose}>
      <ModalField className={modalVisible ? 'show' : ''} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalField>
    </DimmedField>
  );
};

const DimmedField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    background 0.3s ease-in-out;

  &.show {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ModalField = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 400px;
  height: 400px;
  background: white;
  border-radius: 4%;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;

  &.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export default Modal;
