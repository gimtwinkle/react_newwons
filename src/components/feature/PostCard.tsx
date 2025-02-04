'use client';

import { PostCardProps } from '@/types/post';
import Image from 'next/image';
import styled from 'styled-components';

export const PostCard = ({
  thumbnail = 'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  postTitle = 'Post Title',
  author = 'Author',
  category = 'Category',
  timestamp = 'a min ago',
}: PostCardProps) => {
  return (
    <PostCardContainer>
      <Thumbnail href="/posts/detail">
        <Image src={thumbnail} alt="thumbnail" width={514} height={400} />
      </Thumbnail>

      <PostInfo>
        <TitleArea>
          <TitleContent>
            <a href="/posts/detail" className="title">
              {postTitle}
            </a>
            <Meta>
              <span className="author">{author}</span>
              <span className="timeStamp">{timestamp}</span>
            </Meta>
          </TitleContent>
          <div className="category">{category}</div>
        </TitleArea>

        <Content href="/posts/detail">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur.
        </Content>
      </PostInfo>
    </PostCardContainer>
  );
};

const truncateText = `
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PostCardContainer = styled.article`
  position: relative;
  width: 516px;
  height: 656px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const Thumbnail = styled.a`
  img {
    display: block;
    box-shadow: 1px solid var(--foreground-rgb) inset;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
    &:hover {
      opacity: 0.85;
    }
  }
`;

const PostInfo = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 256px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  .title {
    width: 320px;
    font-size: 24px;
    font-weight: bold;
    line-height: 45px;
    ${truncateText}
    white-space: nowrap;
  }

  .category {
    font-size: 18px;
    color: var(--color-blue);
    line-height: 45px;
  }
`;

const TitleContent = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .author {
    font-size: 14px;
    color: var(--color-lightBlue);
  }

  .timeStamp {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Content = styled.a`
  width: 100%;
  font-size: 18px;
  line-height: 2rem;
  ${truncateText}
  display: -webkit-box !important;
  -webkit-line-clamp: 3;import { Link } from "next/link";

  -webkit-box-orient: vertical;
  white-space: normal;
`;
