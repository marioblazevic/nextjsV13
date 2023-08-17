import { render } from "@testing-library/react";
import ProductsList from "./ProductsList";
import { Product } from "@/models/Product.model";

const productsList: Product[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    images: ["image1.jpg"],
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description 2",
    images: ["image2.jpg"],
  },
];

describe("ProductsList component", () => {
  it("should render a list of products", () => {
    const { getAllByRole } = render(<ProductsList products={productsList} />);

    const products = getAllByRole("article");
    expect(products).toHaveLength(2);

    products.forEach((product, index) => {
      const title = product.querySelector("h2")?.textContent;
      const description = product.querySelector("p")?.textContent;
      const image = product.querySelector("img");

      expect(title).toBe(productsList[index].title);
      expect(description).toBe(productsList[index].description);
      expect(image).toHaveAttribute("src", productsList[index].images[0]);
    });
  });
});
