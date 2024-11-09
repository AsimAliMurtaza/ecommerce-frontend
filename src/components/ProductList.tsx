import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Product } from "../types/Product";
import { Card, CardContent, Typography, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleBuyClick = (productId: string) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
        }}
      >
        {products.map((product) => (
          <Grid item key={product._id}>
            <Card
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#2c3e50",
                    marginBottom: 1,
                  }}
                >
                  {product.name} + {product._id}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "1rem",
                    color: "#7f8c8d",
                    marginBottom: 2,
                    height: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.1rem", fontWeight: 500, color: "#e74c3c" }}
                >
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, padding: "10px 20px" }}
                  onClick={() => handleBuyClick(product._id)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
