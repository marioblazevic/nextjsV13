import { client } from "@/utils/api-client";

function readUsers(customConfig: any, applyData: any) {
  return client(`https://dummyjson.com/users?limit=6`, customConfig, applyData);
}

function readUser(customConfig: any, applyData: any) {
  return client(
    `https://dummyjson.com/users/${customConfig.params.userId}`,
    customConfig,
    applyData
  );
}

export { readUsers, readUser };
