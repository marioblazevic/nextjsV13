import ToDo from "@/schemas/ToDo";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { verifyJwt } from "@/utils/auth";
import { getToken } from "next-auth/jwt";

export const DELETE = async (request: any, context: any) => {
  // getToken can also be used here, but getServerSession can not be used in middleware
  connectToDatabase();
  const session = await getServerSession(authOptions);
  if (
    session?.user.role !== "admin" ||
    verifyJwt(session?.user?.token as string) == null
  ) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const removedTodo = await ToDo.deleteOne({ _id: context.params.todoId });
    return new Response(JSON.stringify(removedTodo), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete todo", { status: 500 });
  }
};
