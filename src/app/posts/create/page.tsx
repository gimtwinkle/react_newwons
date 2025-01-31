'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';

import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import styles from './page.module.css';

const TextArea = styled.textarea`
  width: 100%;
  font-size: 15px;
  border-radius: 0.4px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #000000;
`;

const Create = () => {
  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  function handleClickCreatePosts() {
    try {
      const docRef = addDoc(collection(db, 'newwons'), {
        postTitle,
        postContent,
      });
      alert(`등록되었습니다.`);
      window.location.href = `/posts/detail`;
    } catch (error) {
      alert(`${error}가 발생했습니다.`);
    }
  }

  return (
    <div className={styles.createPostForm}>
      <div>
        <Input type="text" value={postTitle} onChange={handleChangeInput} />
        <TextArea rows={30} value={postContent} onChange={handleChangeTextarea} />
      </div>

      <button onClick={handleClickCreatePosts}>작성하기 임시버튼</button>
      <br />
      <Button />
    </div>
  );
};

export default Create;
