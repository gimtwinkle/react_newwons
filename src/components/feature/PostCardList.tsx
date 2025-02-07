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

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'newwons'));
      const posts: PostCardProps[] = [];

      querySnapshot.forEach((doc) => {
        posts.push({
          param: doc.id,
          postTitle: doc.data().postTitle,
          postContent: doc.data().postContent,
          author: doc.data().author,
          thumbnail: doc.data().thumbnail,
          timestamp: `${convertTimestamp(doc.data().timestamp)}`,
          category: doc.data().category,
        });
      });

      setDocList(posts);
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
  padding-top: 84px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;
