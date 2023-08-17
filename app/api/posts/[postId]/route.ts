import Post from "@/schemas/Post";
import { connectToDatabase } from "@/utils/db";

export const PATCH = async (request: any, context: any) => {
  connectToDatabase();
  try {
    const post = await request.json();
    const updatedPost = await Post.updateOne(
      { _id: context.params.postId },
      { $set: { title: post.title, description: post.description } }
    );
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to update post", { status: 500 });
  }
};

export const DELETE = async (request: any, context: any) => {
  connectToDatabase();
  try {
    const removedPost = await Post.deleteOne({ _id: context.params.postId });
    return new Response(JSON.stringify(removedPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete post", { status: 500 });
  }
};
