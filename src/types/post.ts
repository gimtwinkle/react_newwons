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
  postContent?: string;
  author: string;
  category: string;
  timeStamp: string;
}
