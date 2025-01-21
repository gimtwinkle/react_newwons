'use client';

import styled from 'styled-components';
import { PostCard } from './PostCard';

const DummyList = [
  {
    thumbnail:
      'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Post Title',
    author: 'Author',
    category: 'Category',
    timeStamp: 'a min ago',
  },
  {
    thumbnail:
      'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Post Title',
    author: 'Author',
    category: 'Category',
    timeStamp: 'a min ago',
  },
  {
    thumbnail:
      'https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Post Title',
    author: 'Author',
    category: 'Category',
    timeStamp: 'a min ago',
  },
  {
    thumbnail:
      'https://images.unsplash.com/photo-1524641234638-4c303747c310?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Post Title',
    author: 'Author',
    category: 'Category',
    timeStamp: 'a min ago',
  },
];

export const PostCardList = () => {
  return (
    <ListContainer>
      {DummyList.map((card, index) => typeof window !== 'undefined' ?  (
        <PostCard
          key={index}
          thumbnail={card.thumbnail}
          title={card.title}
          author={card.author}
          category={card.category}
          timeStamp={card.timeStamp}
        />
      ) : '' )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 1080px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;
