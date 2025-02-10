'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Modal = ({
  children,
  modalVisible,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(modalVisible);
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 10); // 모달 열릴 때 애니메이션 시작
  }, []);

  const handleClose = () => {
    setIsMounted(false);
    setTimeout(() => 300); // 애니메이션 끝나고 모달 제거
  };

  return (
    <DimmedField className={isMounted ? 'show' : ''} onClick={handleClose}>
      <ModalField className={isMounted ? 'show' : ''} onClick={(e) => e.stopPropagation()}>
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
