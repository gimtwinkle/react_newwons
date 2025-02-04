'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';

import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { getUserName } from '@/utils/auth';
import { getCurrentTime } from '@/utils/date';
import styles from './page.module.css';

const Create = () => {
  getUserName();

  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const [postFile, setPostFile] = useState('');
  const handleChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostFile(e.target.value);
  };

  async function handleClickCreatePosts() {
    try {
      if (!postTitle || !postContent) {
        throw new Error('제목과 내용을 입력해야 합니다.');
      }
      if (!getUserName().isLogged) {
        alert('로그인 후에만 작성이 가능합니다.');
        console.log();
        return;
      }

      await addDoc(collection(db, 'newwons'), {
        postTitle,
        postContent,
        postFile,
        userName: getUserName().userName,
        timestamp: serverTimestamp(),
      });

      alert(`등록되었습니다.`);
      // router.push('/posts/detail');
    } catch (error) {
      alert(`${error}`);
    }
  }

  return (
    <div className={styles.createPostForm}>
      <PostInfoGroup
        title="Write"
        category="category"
        author={getUserName().userName}
        timestamp={`${getCurrentTime()}`}
        href=""
      />

      <div className={styles.formArea}>
        <Input type="text" value={postTitle} onChange={handleChangeInput} />
        <textarea
          rows={30}
          value={postContent}
          onChange={handleChangeTextarea}
          className={styles.textArea}
        />

        <div className={styles.fileBox}>
          <input
            className={styles.fileName}
            defaultValue={postFile}
            type="text"
            placeholder="첨부파일"
            readOnly
          />
          <label className={styles.fileButtonRole} htmlFor="file">
            파일찾기
          </label>
          <input
            type="file"
            id="file"
            className={styles.blind}
            onChange={handleChangeFileUpload}
            defaultValue={postFile}
          />
        </div>
      </div>

      <button onClick={handleClickCreatePosts}>작성하기 임시버튼</button>
      <br />

      <Button />
    </div>
  );
};

export default Create;
