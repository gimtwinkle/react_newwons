'use client';
import { db } from '@/firebase';
import { PostCardProps } from '@/types/post';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { PostCard } from './PostCard';

//등록되어있는 전체 data get(console)
const querySnapshot = await getDocs(collection(db, 'newwons'));
let resultList: any[] = [];
const result = querySnapshot.forEach((doc) => {
  // console.log(doc.id, ' => ', doc.data());
  ({
    param: doc.id
  });
  resultList = [...resultList, { param: doc.id, ...doc.data() }];
  console.log(resultList);
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
          param={obj.param}
          thumbnail={obj.thumbnail}
          postTitle={obj.postTitle}
          author={obj.userName}
          category={obj.category}
          timestamp={timestamp}
          postContent = {obj.postContent}
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 1080px;
  margin: auto;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;
