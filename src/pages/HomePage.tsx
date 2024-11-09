import React from "react";
import ProductList from "../components/ProductList";
import { Box, Typography, Button, Container } from "@mui/material";

const HomePage: React.FC = () => (
  <Box sx={{ backgroundColor: "#fafafa", padding: 5 }}>
    <Container maxWidth="lg" sx={{ textAlign: "center", marginBottom: 5 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "#333",
          marginBottom: 2,
        }}
      >
        Welcome to the E-commerce App
      </Typography>
      <Typography variant="h5" sx={{ color: "#777", marginBottom: 3 }}>
        Discover amazing products and exclusive deals. Shop now and experience a
        seamless online shopping journey.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        href="/products"
        sx={{ marginTop: 2 }}
      >
        Shop Now
      </Button>
    </Container>

    {/* Featured Products Section */}
    <Container maxWidth="lg" sx={{ marginBottom: 5 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          fontWeight: 700,
          color: "#333",
        }}
      >
        Featured Products
      </Typography>
      <ProductList />
    </Container>
  </Box>
);

export default HomePage;
