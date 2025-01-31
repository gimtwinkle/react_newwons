'use client';

import styled from 'styled-components';

type InputProps = {
  type: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fColor?: string;
};

//Type, Title, Placeholder, Disabled, ClassName 파라미터: 앞에 일반적으로 소문자 합성어면 증간에 대문자
function Input({ type, title, placeholder, disabled, className }: InputProps) {
  return (
    <>
      <InputField
        type={type} //텍스트만 받을거니(ex.체크박스나.레이블같은)까 따로 정의 필요없음
        title={title}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
      ></InputField>
    </>
  );
}

const InputField = styled.input`
  width: 100%;
  height: 44px;
  font-size: 15px;
  border-radius: 0.4px;
  padding-left: 10px;
  border: 1px solid #000000;
`;

export default Input;

//깃풀받고 내꺼 머지하고 머지할때?분기해서 올리기 톡방 참고 머지할땐 리드미 참고!
