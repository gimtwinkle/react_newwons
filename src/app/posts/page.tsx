import { PostCardList } from '@/components/feature/PostCardList';
import Link from 'next/link';

const Posts = () => {
  return (
    <>
      <div>
        리스트 페이지가 출력될 예정이며 리스트 페이지가 메인화면이 됩니다.
        <PostCardList />
      </div>

      <br></br>
      <ul>
        <li>
          <Link href={'/posts/detail'}>상세페이지로 가기</Link>
        </li>
        <li>
          <Link href={'/posts/create'}>작성하기</Link>
        </li>
      </ul>
    </>
  );
};

export default Posts;
