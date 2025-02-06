'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ModalProps {
  dimmedClick: () => void;
  children: React.ReactNode;
}

const Modal = ({ dimmedClick, children }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 모달이 마운트되면 애니메이션 실행
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(dimmedClick, 300); // 애니메이션 끝난 후 부모에서 상태 변경
  };

  return (
    <DimmedField className={isVisible ? 'show' : ''} onClick={handleClose}>
      <ModalField
        className={isVisible ? 'show' : ''}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {children}
      </ModalField>
    </DimmedField>
  );
};

const DimmedField = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.show {
    background: rgba(0, 0, 0, 0.5);
    opacity: 1;
  }
`;

const ModalField = styled.div`
  z-index: 1;
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
