import { client } from "@/utils/api-client";

function readProducts(customConfig: any, applyData: any) {
  return client(
    `https://dummyjson.com/products?limit=6`,
    customConfig,
    applyData
  );
}

export { readProducts };
