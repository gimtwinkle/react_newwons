'use client';
import { db } from '@/firebase';
import { PostCardProps } from '@/types/post';
import { convertTimestamp } from '@/utils/date';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostCard } from './PostCard';

export const PostCardList = () => {
  const [docList, setDocList] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'newwons'));
        const posts: PostCardProps[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(doc.data());
          posts.push({
            param: doc.id,
            postTitle: data.postTitle,
            postContent: data.postContent,
            author: data.author,
            thumbnail: data.postFile || `${'/defaultThumbnail.jpg'}`,
            timestamp: convertTimestamp(data.timestamp),
            category: data.category,
          });
        });

        setDocList(posts);
      } catch (error) {
        setError('게시글을 가져오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <ListContainer>
      {docList.map((post) => (
        <PostCard
          key={post.param}
          param={post.param}
          author={post.author}
          category={post.category}
          timestamp={post.timestamp}
          thumbnail={post.thumbnail}
          postTitle={post.postTitle}
          postContent={post.postContent}
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 1080px;
  margin: auto;
  padding: 8rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;
