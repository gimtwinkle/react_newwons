'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';

import { db } from '@/firebase';
import { isLoggedIn } from '@/utils/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  async function handleClickCreatePosts() {
    try {
      if (!postTitle || !postContent) {
        throw new Error('제목과 내용을 입력해야 합니다.');
      }
      if (!isLoggedIn()) {
        alert('로그인 후에만 작성이 가능합니다.');
        return;
      }

      await addDoc(collection(db, 'newwons'), {
        postTitle,
        postContent,
      });

      alert(`등록되었습니다.`);
      // router.push('/posts/detail');
    } catch (error) {
      alert(`${error}`);
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
