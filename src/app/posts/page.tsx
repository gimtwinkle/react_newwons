import Link from 'next/link';

export const Posts = () => {
  return (
    <>
      <div>리스트 페이지가 출력될 예정이며 리스트 페이지가 메인화면이 됩니다.</div>
      <Link href={'/posts/detail'}>링크를 테스트 합니다.</Link>
    </>
  );
};
