import { User } from "@/models/User.model";

export const GET = async (request: Request, context: any) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/users/" + context.params.userId
    );
    const responseData = await response.json();
    const user: User[] = responseData;
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};
