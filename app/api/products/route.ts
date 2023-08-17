import { Product } from "@/models/Product.model";

export const GET = async (request: Request) => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=6");
    const responseData = await response.json();
    const loadedProducts: Product[] = responseData.products;
    return new Response(JSON.stringify(loadedProducts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};
