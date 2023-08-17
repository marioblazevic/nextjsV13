import { client } from "@/utils/api-client";

function createPost(customConfig: any, applyData: any) {
  return client("posts", customConfig, applyData);
}

function readPosts(customConfig: any, applyData: any) {
  return client("posts", customConfig, applyData);
}

function editPost(customConfig: any, applyData: any) {
  return client(`posts/${customConfig.body.postId}`, customConfig, applyData);
}

function deletePost(customConfig: any, applyData: any) {
  return client(`posts/${customConfig.body.postId}`, customConfig, applyData);
}

export { createPost, readPosts, deletePost, editPost };
