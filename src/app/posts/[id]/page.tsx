'use client';

import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db } from '@/firebase';
import { Post } from '@/types/post';
import { convertTimestamp } from '@/utils/date';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Detail = ({ postTitle, postContent, author, category, timestamp }: Post) => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

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

  if (loading) return <div>로딩중...🔍</div>;
  if (!postData) return <div>포스트를 찾을 수 없습니다. 🙈</div>;

  return (
    <div className={styles.postContainer}>
      <PostInfoGroup
        title={postData.postTitle}
        category="category"
        author={postData.author}
        timestamp={postData.timestamp}
        href={`${params.id}`}
      />
      <div className={styles.postContent}>{postData.postContent}</div>
      <button
        onClick={() => {
          router.push(`/`);
        }}
      >
        몽록으로 가기
      </button>
      <button
        onClick={() => {
          router.push(`${params.id}/edit`);
        }}
      >
        수정하하기
      </button>
    </div>
  );
};

export default Detail;
