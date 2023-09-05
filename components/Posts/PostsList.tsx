"use client";
import { useContext, useEffect } from "react";
import PostsContext from "@/app/store/posts-contex";
import PostItem from "./PostItem";
import classes from "./PostsList.module.css";
import DialogButton from "@/app/ui/DialogButton";
import { Post } from "@/models/Post.model";
import { deletePost } from "@/service/post.service";
import { useSession } from "next-auth/react";

interface Props {
  posts: Post[];
  onEditPost: (post: object) => void;
  onOpenDialog: () => void;
}

const PostsList: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const postsCtx = useContext(PostsContext);

  useEffect(() => {
    postsCtx.fillPosts(props.posts);
  }, [props.posts]);

  const postItemDeleteHandler = async (postId: string) => {
    deletePost(
      {
        method: "DELETE",
        body: {
          postId,
        },
        headers: {
          "auth-token": session?.user.token,
        },
      },
      () => {
        postsCtx.deletePost(postId);
      }
    );
  };

  const postEditHandler = (post: object) => {
    props.onEditPost({ post });
  };

  return (
    <div className={classes.container}>
      <DialogButton onOpen={props.onOpenDialog}>Create new post</DialogButton>
      {postsCtx.posts.map((post: Post) => (
        <PostItem
          key={post._id}
          post={post}
          onDelete={postItemDeleteHandler.bind(null, post._id)}
          onEdit={postEditHandler.bind(null, post)}
        />
      ))}
    </div>
  );
};

export default PostsList;
