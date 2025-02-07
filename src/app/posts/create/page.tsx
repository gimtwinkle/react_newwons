'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';
import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db } from '@/firebase';
import { isLoggedIn, useUserInfo } from '@/utils/auth';
import { getCurrentTime } from '@/utils/date';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

const Create = () => {
  const router = useRouter();

  // 현재 로그인 상태 체크 후 username 가져오기
  const currentLoggedState = isLoggedIn();
  let { isLogged, userName } = useUserInfo({ currentLoggedState });
  useUserInfo({ currentLoggedState });

  // 포스트 타이틀 상태 관리
  const [postTitle, setPostTitle] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  // 포스트 컨텐츠 상태 관리
  const [postContent, setPostContent] = useState('');
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  // 포스트 업로드 파일 상태 관리
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`); // 이미지 이름을 경로로 설정

    try {
      // 이미지 업로드
      await uploadBytes(storageRef, image);
      // 업로드 후 이미지 URL 가져오기
      const url = await getDownloadURL(storageRef);
      setImageUrl(url); // 이미지 URL 상태 업데이트
      alert('이미지가 업로드되었습니다!');
    } catch (error) {
      alert('이미지 업로드 실패');
      console.error(error);
    }
  };
  // 데이터 포스트
  async function handleClickCreatePosts() {
    try {
      if (!postTitle || !postContent) {
        throw new Error('제목과 내용을 입력해야 합니다.');
      }
      if (!isLogged) {
        alert('로그인 후에만 작성이 가능합니다.');
        return;
      }

      // 이미지 URL이 업로드된 후 Firestore에 저장
      const docRef = await addDoc(collection(db, 'newwons'), {
        postTitle,
        postContent,
        postFile: imageUrl, // 업로드된 이미지 URL을 Firestore에 저장
        author: userName,
        timestamp: serverTimestamp(),
      });

      alert('등록되었습니다.');
      router.push(`/posts/${docRef.id}`);
    } catch (error) {
      alert(`${error}`);
    }
  }

  return (
    <div className={styles.createPostForm}>
      <PostInfoGroup
        title="Write"
        category="category"
        author={userName}
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
            value={image ? image.name : '첨부파일'}
            type="text"
            placeholder="첨부파일"
            readOnly
          />
          <label className={styles.fileButtonRole} onClick={handleUpload} htmlFor="file">
            파일찾기
          </label>
          <input type="file" id="file" className={styles.blind} onChange={handleFileChange} />
        </div>
      </div>

      <button onClick={handleClickCreatePosts}>작성하기 임시버튼</button>
      <br />
      <Button />
    </div>
  );
};

export default Create;
