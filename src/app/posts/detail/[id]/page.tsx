'use client';
import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db } from '@/firebase';
import { Post } from '@/types/post';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Detail = ({ postTitle, postContent, author, category, timestamp }: Post) => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  //특정 단일 data 가져오기(문서번호는 전체 데이터 가져오는 리스트 쪽에서 확인할 수 있을 것 같아요.)

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        console.log('params.id 확인:', params, params.id);

        const docRef = doc(db, 'newwons', params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // 타임스탬프 형식 변환
          const formattedData = {
            ...data,
            timestamp: data.timestamp?.toDate().toLocaleString() || '',
          } as Post;

          setPostData(formattedData);
        } else {
          // docSnap.data() will be undefined in this case
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
  // console.log('postData:', postData);

  return (
    <div className={styles.postContainer}>
      <PostInfoGroup
        title={postData.postTitle}
        category="category"
        author={postData.author}
        timestamp={postData.timestamp}
        href={params.id}
      />
      <div className={styles.postContent}>{postData.postContent}</div>
    </div>
  );
};

export default Detail;
