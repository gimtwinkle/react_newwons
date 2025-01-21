'use client';
import { Post } from '@/types/post';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const PostBreadCrumb = styled.ul`
  list-style-type: none;

  display: flex;
  margin: 0;
  padding: 0;

  li {
    padding: 0;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);

    &:after {
      display: inline-block;
      content: '/';
      padding: 0 10px;
      color: rgba(0, 0, 0, 0.5);
    }

    &:last-child:after {
      display: none;
    }
    &.lightBlue {
      color: #6de4ea;
    }

    &.blue {
      color: #18a0fb;
    }
  }
`;

const PostTitle = styled.h3`
  font-size: 48px;
`;

const PostInfo = styled.ul`
  list-style-type: none;

  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  li {
    height: 100%;
    line-height: 100%;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    color: rgba(0, 0, 0, 0.5);

    &.lightBlue {
      color: #6de4ea;
    }

    &.blue {
      color: #18a0fb;
    }

    &:last-child {
      border-right: none;
    }
  }
`;

const PostInfoGroup = () => {
  const [postData, setPostData] = useState<Post>({
    title: 'Post Title',
    author: 'Author',
    category: 'Category',
    timeStamp: 'a min ago',
  });

  const updatePost = (newPost: Post) => {
    setPostData(newPost);
  };

  return (
    <>
      <PostBreadCrumb>
        <li className="lightBlue">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/post/detail">{postData.title}</Link>
        </li>
      </PostBreadCrumb>
      <PostTitle>{postData.title}</PostTitle>
      <PostInfo>
        <li className="lightBlue">{postData.author}</li>
        <li className="blue">{postData.category}</li>
        <li>{postData.timeStamp}</li>
      </PostInfo>
    </>
  );
};

export default PostInfoGroup;
