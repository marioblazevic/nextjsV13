"use client";
import { useEffect, useState } from "react";
import PostsList from "../../components/Posts/PostsList";
import PostsProvider from "../store/PostsProvider";
import Modal from "../ui/Modal";
import { Post } from "@/models/Post.model";
import { readPosts } from "@/service/post.service";
import { useSession } from "next-auth/react";
import { AuthCheck } from "@/components/AuthCheck/AuthCheck";
import { USER_ROLE } from "@/constants/roles";

export interface Props {
  posts: Post[];
}

const PostsPage: React.FC = (props) => {
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [dialogData, setDialogData] = useState();
  const [isDialogEdit, setIsDialogEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session?.user?.role == USER_ROLE.ADMIN) {
      readPosts(
        {
          cache: "no-store",
          // cache: "no-store", -> default with external api, activates on every request
          // "force-cache" -> caching request, after refresh no changes
          headers: {
            "auth-token": session?.user.token,
          },
        },
        (posts: any) => {
          setPosts(posts);
        }
      );
    }
  }, [status]);

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
    <AuthCheck role={USER_ROLE.ADMIN}>
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
    </AuthCheck>
  );
};

export default PostsPage;
