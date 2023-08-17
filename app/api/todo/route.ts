import ToDo from "@/schemas/ToDo";
import { connectToDatabase } from "@/utils/db";

export const GET = async (request: Request) => {
  connectToDatabase();
  try {
    const response = await ToDo.find();
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch todos", { status: 500 });
  }
};

export const POST = async (request: any, context: any) => {
  connectToDatabase();
  try {
    const newTodo = await request.json();
    const savedTodo = await ToDo.create(newTodo);
    return new Response(JSON.stringify(savedTodo), { status: 200 });
  } catch (error) {
    return new Response("Failed to post new todo", { status: 500 });
  }
};
