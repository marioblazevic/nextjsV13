"use client";
import { useEffect, useState } from "react";
import PostsList from "../../components/Posts/PostsList";
import PostsProvider from "../store/PostsProvider";
import Modal from "../ui/Modal";
import { Post } from "@/models/Post.model";
import { readPosts } from "@/service/post.service";

export interface Props {
  posts: Post[];
}

const PostsPage: React.FC = (props) => {
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [dialogData, setDialogData] = useState();
  const [isDialogEdit, setIsDialogEdit] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    readPosts({ cache: "no-store" }, (posts: any) => {
      setPosts(posts);
    });
  }, []);

  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };

  const openDialogHandler = () => {
    setIsDialogEdit(false);
    setDialogIsShown(true);
  };

  const editPostHandler = (post: any) => {
    setIsDialogEdit(true);
    setDialogIsShown(true);
    setDialogData(post);
  };

  return (
    <PostsProvider>
      {dialogIsShown && (
        <Modal
          data={dialogData}
          isDialogEdit={isDialogEdit}
          onClose={closeDialogHandler}
        />
      )}
      <PostsList
        onEditPost={editPostHandler}
        onOpenDialog={openDialogHandler}
        posts={posts}
      />
    </PostsProvider>
  );
};

export default PostsPage;
