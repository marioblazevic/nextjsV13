import { CORE_ROUTES } from "@/constants/routes";
import { client } from "@/utils/api-client";

function createPost(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.POSTS}`,
    customConfig,
    applyData
  );
}

function readPosts(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.POSTS}`,
    customConfig,
    applyData
  );
}

function editPost(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.POSTS}/${customConfig.body.postId}`,
    customConfig,
    applyData
  );
}

function deletePost(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.POSTS}/${customConfig.body.postId}`,
    customConfig,
    applyData
  );
}

export { createPost, readPosts, deletePost, editPost };
