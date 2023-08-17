import { Post } from "@/models/Post.model";
import React, { createContext } from "react";

interface ContextProps {
  posts: Post[];
  fillPosts: (posts: Post[]) => void;
  deletePost: (id: string) => void;
  addPost: (post: Post) => void;
  editPost: (post: Post) => void;
}

const PostsContext = React.createContext<ContextProps>({
  posts: [],
  fillPosts: (posts) => {},
  deletePost: (id) => {},
  addPost: (post) => {},
  editPost: (post) => {},
});

export default PostsContext;
