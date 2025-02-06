'use client';

import { PostCardList } from '@/components/feature/PostCardList';

const Posts = () => {
  return (
    <>
      <div>
        {/* 리스트 페이지가 출력될 예정이며 리스트 페이지가 메인화면이 됩니다. */}
        <PostCardList />
      </div>
    </>
  );
};

export default Posts;
