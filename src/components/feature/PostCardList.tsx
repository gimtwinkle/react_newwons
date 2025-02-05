'use client';
import { db } from '@/firebase';
import { PostCardProps } from '@/types/post';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { PostCard } from './PostCard';

// const DummyList = [
//   {
//     thumbnail:
//       'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     postTitle: 'Post Title',
//     author: 'Author',
//     category: 'Category',
//     timeStamp: 'a min ago',
//   },
//   {
//     thumbnail:
//       'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     postTitle: 'Post Title',
//     author: 'Author',
//     category: 'Category',
//     timeStamp: 'a min ago',
//   },
//   {
//     thumbnail:
//       'https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     postTitle: 'Post Title',
//     author: 'Author',
//     category: 'Category',
//     timeStamp: 'a min ago',
//   },
//   {
//     thumbnail:
//       'https://images.unsplash.com/photo-1524641234638-4c303747c310?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     postTitle: 'Post Title',
//     author: 'Author',
//     category: 'Category',
//     timeStamp: 'a min ago',
//   },
// ];

//등록되어있는 전체 data get(console)
const querySnapshot = await getDocs(collection(db, 'newwons'));
let resultList: any[] = [];
const result = querySnapshot.forEach((doc) => {
  // console.log(doc.id, ' => ', doc.data());
  resultList = [...resultList, doc.data()];
  // console.log('DB 리스트 개수 입니다.' + resultList.length );
  return resultList;
});
export const PostCardList = ({
  thumbnail,
  postTitle,
  author,
  category,
  timestamp}: PostCardProps) => {
  return (
    <ListContainer>
      {resultList.map((obj, idx) => (
        <PostCard
          key={idx}
          thumbnail={obj.thumbnail}
          postTitle={obj.postTitle}
          author={obj.userName}
          category={obj.category}
          timestamp={timestamp}
        />
      ))}
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
