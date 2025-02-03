'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';

import { db } from '@/firebase';
import { isLoggedIn } from '@/utils/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

import PostInfoGroup from '@/components/feature/PostInfoGroup';
import styles from './page.module.css';

const Create = () => {
  // const router = useRouter();

  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileName = document.querySelector('.fileName')?.innerHTML('e.target.value');
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
      <PostInfoGroup
        title="Write"
        category="category"
        author="author"
        timeStamp="a minutes ago"
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
          <input className={styles.fileName} value="첨부파일" placeholder="첨부파일" />
          <label className={styles.fileButtonRole} htmlFor="file">
            파일찾기
          </label>
          <input type="file" id="file" onChange={handleChangeFileUpload} />
        </div>
      </div>

      <button onClick={handleClickCreatePosts}>작성하기 임시버튼</button>
      <br />

      <Button />
    </div>
  );
};

export default Create;
