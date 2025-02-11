'use client';

import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db } from '@/firebase';
import { Post } from '@/types/post';
import { isLoggedIn, useUserInfo } from '@/utils/auth';
import { convertTimestamp } from '@/utils/date';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Detail = () => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const currentLoggedState = isLoggedIn();
  const { userName } = useUserInfo({ currentLoggedState });

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) return;

      try {
        setLoading(true);

        const docRef = doc(db, 'newwons', `${params.id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const formattedData = {
            ...data,
            timestamp: convertTimestamp(data.timestamp) || '',
          } as Post;

          setPostData(formattedData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading)
    return (
      <div
        className={styles.postContainer}
        style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
      >
        로딩중...🔍
      </div>
    );
  if (!postData)
    return (
      <div
        className={styles.postContainer}
        style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
      >
        포스트를 찾을 수 없습니다. 🙈
      </div>
    );

  const handleClickDelete = () => {
    //NOTICE
    //컬렉션명 : newwons
    //await는 async와 사용해야합니다.

    //TODO
    //삭제할건지 확인: 확인 -> 삭제 -> 삭제 완료 알럿 -> 이후 리스트 페이지 이동
    //삭제할건지 확인: 취소 -> 함수 실행 취소
    await deleteDoc(doc(db, `${컬렉션명}`, `${해당문서번호}`));
  };
  return (
    <div className={styles.postContainer}>
      <PostInfoGroup
        title={postData.postTitle}
        category="category"
        author={postData.author}
        timestamp={postData.timestamp}
        href={`${params.id}`}
      />

      {postData.postFile && (
        <Image
          src={`${postData.postFile}`}
          width="500"
          height="300"
          style={{ width: '100%', maxWidth: '500px', height: 'auto', textAlign: 'center' }}
          alt="PostImg"
        />
      )}

      <div className={styles.postContent}>{postData.postContent}</div>

      <button
        onClick={() => {
          router.push(`/`);
        }}
      >
        몽록으로 가기
      </button>

      {userName === postData?.author ? (
        <>
          <button
            onClick={() => {
              router.push(`${params.id}/edit`);
            }}
          >
            수정하하기
          </button>
          <button onClick={handleClickDelete}>삭제하기</button>
        </>
      ) : null}
    </div>
  );
};

export default Detail;
