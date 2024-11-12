import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

const ToastNotification = ({ message }: { message: string }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px 20px",
      backgroundColor: "#4caf50",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      zIndex: 9999,
    }}
  >
    <Typography variant="body2">{message}</Typography>
  </Box>
);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const calculateTotal = (): number => {
    return cart.reduce(
      (total: number, product: Product) =>
        total + product.price * (product.quantity || 1),
      0
    );
  };

  const handleCheckout = () => {
    setToastMessage("Payment successful! Your cart has been cleared.");
    setIsToastVisible(true);
    setTimeout(() => {
      clearCart();
      setIsToastVisible(false);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, height: "30vh" }}>
          Your Cart is Empty
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Start Shopping
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {cart.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <Typography variant="body2">
                  Quantity: {product.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ marginTop: 2 }}
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 4, textAlign: "right" }}>
        <Typography variant="h5">
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2, marginRight: 2 }}
          onClick={clearCart}
        >
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </Box>

      {isToastVisible && <ToastNotification message={toastMessage!} />}
    </Box>
  );
};

export default CartPage;
