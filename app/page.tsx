"use client";
import { useEffect, useState } from "react";
import ProductsList from "../components/Products/ProductsList";
import Container from "@mui/material/Container";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`);
    const products = await response.json();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md" data-testid="list">
      <ProductsList products={products} />
    </Container>
  );
};

export default ProductsPage;
