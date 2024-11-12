import React from "react";
import {
  Container,
} from "@mui/material";
import ProductList from "../components/ProductList";

const ProductPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <ProductList />
    </Container>
  );
};

export default ProductPage;
