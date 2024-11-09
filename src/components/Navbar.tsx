import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false); // For controlling modal open/close
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userName")
  ); // Check if user is logged in based on localStorage
  const userName = localStorage.getItem("userName");

  // Handle modal open and close
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false); // Update login state
    navigate("/login"); // Redirect to login page
    handleClose(); // Close modal after logout
  };

  // Handle login action (redirect to login page)
  const handleLogin = () => {
    navigate("/login"); // Open login page if not logged in
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Commerce App
          </Typography>
          <Button
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            Cart ({useCart().cart.length})
          </Button>

          {/* Profile Section to Open Modal */}
          <Button
            color="inherit"
            onClick={handleClickOpen}
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            {isLoggedIn ? `Welcome, ${userName}` : "Account"}
          </Button>
        </Toolbar>
      </Container>

      {/* Modal for Login/Logout Options */}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{isLoggedIn ? "Logout" : "Login"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {isLoggedIn
              ? "Are you sure you want to log out?"
              : "Please log in to continue."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isLoggedIn ? (
            <Button onClick={handleLogout} color="secondary">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} color="primary">
              Login
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
