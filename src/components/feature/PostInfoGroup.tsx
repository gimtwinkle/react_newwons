'use client';
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
  const [postTitle, setPostTitle] = useState<string>('Post Title');
  const [author, setAuthor] = useState<string>('Author');
  const [category, setCategory] = useState<string>('Category');
  const [timeStamp, setTimeStamp] = useState<string>('a min ago');

  return (
    <>
      <PostBreadCrumb>
        <li className="lightBlue">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link
            href="/post/detail"
            onLoad={(e) => {
              setPostTitle('');
            }}
          >
            {postTitle}
          </Link>
        </li>
      </PostBreadCrumb>
      <PostTitle
        onLoad={(e) => {
          setPostTitle('');
        }}
      >
        {postTitle}
      </PostTitle>
      <PostInfo>
        <li
          className="lightBlue"
          onLoad={(e) => {
            setAuthor('');
          }}
        >
          {author}
        </li>
        <li
          className="blue"
          onLoad={(e) => {
            setCategory('');
          }}
        >
          {category}
        </li>
        <li
          onLoad={(e) => {
            setTimeStamp('');
          }}
        >
          {timeStamp}
        </li>
      </PostInfo>
    </>
  );
};

export default PostInfoGroup;
