import { User } from "@/models/User.model";

export const GET = async (request: Request) => {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=6");
    const responseData = await response.json();
    const users: User[] = responseData.users;
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};
