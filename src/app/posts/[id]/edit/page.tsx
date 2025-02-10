'use client';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';
import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db, storage } from '@/firebase';
import { getCurrentTime } from '@/utils/date';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './page.module.css';

const Update = () => {
  const params = useParams();
  const docRef = doc(db, 'newwons', `${params.id}`);
  const { isLoading, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setPostTitle(docSnap.data().postTitle);
          setPostContent(docSnap.data().postContent);
          setAttachment(docSnap.data().postFile);
          setAuthor(docSnap.data().author);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [docRef]);

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

  // 포스트 업로드 파일 상태 관리
  const [attachment, setAttachment] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(e.target.value);
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const theFile = files[0];
    const reader = new FileReader();

    if (theFile.size > 512000) {
      alert('500KB 이하로 업로드해주세요. 무료할당끝나면 유료라..😂(카드연결되어있음)');
      setAttachment('');
      return;
    } else {
      alert('첨부완료!');
    }

    reader.onloadend = (finishedEvent) => {
      if (finishedEvent.target && finishedEvent.target.result) {
        setAttachment(finishedEvent.target.result as string);
      } else {
        console.error('FileReader result is null');
      }
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

  async function handleClickUpdatePosts() {
    try {
      if (!postTitle || !postContent) {
        throw new Error('제목과 내용을 입력해야 합니다.');
      }
      if (isLoading === false) {
        console.log(isLoading);
        alert('로그인 후에만 작성이 가능합니다.');
        return;
      }

      let attachmentUrl = '';
      if (user && attachment !== '') {
        const attachmentRef = ref(storage, `${user.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, 'data_url');
        attachmentUrl = await getDownloadURL(response.ref);
      }

      await updateDoc(docRef, {
        postTitle,
        postContent,
        postFile: attachmentUrl,
        author,
        timestamp: serverTimestamp(),
      });

      alert(`등록되었습니다.`);
      router.push(`/posts/${docRef.id}`);
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
          <Input
            type="file"
            id="attach-file"
            accept="image/*"
            onChange={onFileChange}
            className={styles.blind}
          />
          <input
            type="text"
            style={{ width: '100%' }}
            defaultValue={attachment}
            placeholder="첨부파일"
          />
          <label htmlFor="attach-file" className={styles.fileButton}>
            파일 선택
          </label>
        </div>
        {attachment && (
          <div className={styles.preview}>
            <Image src={attachment} alt="PostImg" />
            <div onClick={onClearAttachment} className={styles.removeButton}>
              <span>Remove</span>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleClickUpdatePosts}>수정하기 임시버튼</button>
      <br />

      <Button />
    </div>
  );
};

export default Update;
