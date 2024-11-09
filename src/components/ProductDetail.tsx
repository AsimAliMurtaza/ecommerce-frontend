import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { Product } from "../types/Product";
import { getProductById } from "../api/products";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [quantity, setQuantity] = useState<number>(1); 
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        if (productId) {
          const fetchedProduct = await getProductById(productId); 
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); 

  const handleAddToCart = () => {
    if (product) {
      console.log("Added to cart:", product, "Quantity:", quantity);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(event.target.value)));
  };

  if (loading) {
    return (
      <Box
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Card
        sx={{
          display: "flex",
          maxWidth: 900,
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ width: "60%", textAlign: "center", padding: 3 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#7f8c8d", marginBottom: 2 }}
          >
            {product.description}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 3 }}>
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2c3e50", marginBottom: 3 }}
          >
            Category: {product.category}
          </Typography>

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ width: "100%", marginBottom: 3 }}
            inputProps={{ min: 1 }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ padding: "10px 20px" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetailPage;