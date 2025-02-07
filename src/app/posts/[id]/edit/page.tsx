'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';

import { db } from '@/firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { isLoggedIn, useUserInfo } from '@/utils/auth';
import { getCurrentTime } from '@/utils/date';

import { useParams } from 'next/navigation';
import styles from './page.module.css';

const Update = () => {
  useUser;
  const params = useParams();
  const docRef = doc(db, 'newwons', `${params.id}`);

  useEffect(() => {
    async function fetchData() {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPostTitle(docSnap.data().postTitle);
          setPostContent(docSnap.data().postContent);
          setPostFile(docSnap.data().postFile);
          setAuthor(docSnap.data().userName);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //현재 사용자 상태 확인
  const currentLoggedState = isLoggedIn();
  let { isLogged } = useUserInfo({ currentLoggedState });
  useUserInfo({ currentLoggedState });

  //포스트 작성자 상태관리
  const [author, setAuthor] = useState('');

  //포스트 타이틀 상태관리
  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  //포스트 컨텐츠 상태관리
  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  //포스트 업로드파일 상태관리
  const [postFile, setPostFile] = useState('');
  const handleChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostFile(e.target.value);
  };

  //data post
  async function handleClickUpdatePosts() {
    try {
      if (!postTitle || !postContent) {
        throw new Error('제목과 내용을 입력해야 합니다.');
      }
      if (!isLogged) {
        alert('로그인 후에만 작성이 가능합니다.');
        return;
      }

      await updateDoc(docRef, {
        postTitle,
        postContent,
        postFile,
        author,
        timestamp: serverTimestamp(),
      });

      alert(`등록되었습니다.`);
    } catch (error) {
      alert(`${error}`);
    }
  }

  return (
    <div className={styles.createPostForm}>
      <PostInfoGroup
        title="Edit"
        category="category"
        author={author}
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

      <button onClick={handleClickUpdatePosts}>수정하기 임시버튼</button>
      <br />

      <Button />
    </div>
  );
};

export default Update;
