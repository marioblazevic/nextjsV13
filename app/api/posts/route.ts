import Post from "../../../schemas/Post";
import { connectToDatabase } from "@/utils/db";
import { NextRequest } from "next/server";
export const revalidate = 0;
export const GET = async (request: NextRequest) => {
  connectToDatabase();
  try {
    const response = await Post.find();
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};

export const POST = async (request: any, context: any) => {
  connectToDatabase();
  try {
    const newPost = await request.json();
    const savedPost = await Post.create(newPost);
    return new Response(JSON.stringify(savedPost), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Failed to post new post", { status: 500 });
  }
};
