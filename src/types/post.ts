export interface Post {
  postTitle: string;
  postContent: string;
  author: string;
  category: string;
  timeStamp: string;
}

export interface PostCardProps {
  thumbnail: string;
  postTitle: string;
  postContent: string;
  author: string;
  category: string;
  timeStamp: string;
}

export interface PostInfoProps {
  title: string;
  content?: string;
  author: string;
  category: string;
  timeStamp: string;
  href: string;
}
