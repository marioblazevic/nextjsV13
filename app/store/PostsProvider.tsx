import { useReducer } from "react";
import PostsContext from "./posts-contex";
import { Post } from "@/models/Post.model";
interface PostsState {
  posts: Post[];
}

type PostsAction =
  | { type: "FILL"; posts: Post[] }
  | { type: "DELETE"; id: string }
  | { type: "ADD"; post: Post }
  | { type: "EDIT"; post: Post };

const defaultPostsState: PostsState = {
  posts: [],
};

const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  if (action.type === "FILL") {
    return {
      posts: action.posts,
    };
  }
  if (action.type === "DELETE") {
    const updatedPosts = state.posts.filter(
      (post: Post) => post._id !== action.id
    );
    return {
      posts: updatedPosts,
    };
  }
  if (action.type === "ADD") {
    const posts = [action.post, ...state.posts];
    return {
      posts: posts,
    };
  }
  if (action.type === "EDIT") {
    const existingPostIndex = state.posts.findIndex(
      (item) => item._id === action.post._id
    );
    const existingPost = state.posts[existingPostIndex];
    let updatedPosts: Post[] = [];
    if (existingPost) {
      const updatedPost = {
        _id: action.post._id,
        title: action.post.title,
        description: action.post.description,
      };
      updatedPosts = [...state.posts];
      updatedPosts[existingPostIndex] = updatedPost;
    }
    return {
      posts: updatedPosts,
    };
  }
  return defaultPostsState;
};

const PostsProvider = (props: { children: React.ReactNode }) => {
  const [postsState, dispatchPostsAction] = useReducer(
    postsReducer,
    defaultPostsState
  );

  const fillPostsHandler = (posts: Post[]) => {
    dispatchPostsAction({ type: "FILL", posts: posts });
  };

  const deletePostHandler = (id: string) => {
    dispatchPostsAction({ type: "DELETE", id: id });
  };

  const addPostHandler = (post: Post) => {
    dispatchPostsAction({ type: "ADD", post: post });
  };

  const editPostHandler = (post: Post) => {
    dispatchPostsAction({ type: "EDIT", post: post });
  };

  const postsContext = {
    posts: postsState.posts,
    fillPosts: fillPostsHandler,
    deletePost: deletePostHandler,
    addPost: addPostHandler,
    editPost: editPostHandler,
  };

  return (
    <PostsContext.Provider value={postsContext}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
