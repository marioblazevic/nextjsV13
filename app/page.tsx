"use client";
import { useEffect, useState } from "react";
import ProductsList from "../components/Products/ProductsList";
import Container from "@mui/material/Container";
import { readProducts } from "@/service/product.service";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    readProducts({}, (data: any) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md" data-testid="list">
      <ProductsList products={products} />
    </Container>
  );
};

export default ProductsPage;
