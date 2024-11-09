import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Use context to access auth state
import { useCart } from "../contexts/CartContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, userName, logout } = useAuth(); // Access auth context
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { cart } = useCart();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    logout(); // Use logout from context
    navigate("/login"); // Redirect to login page
    handleClose(); // Close the modal
  };

  const handleLogin = () => {
    navigate("/login");
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
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              E-Commerce App
            </Link>
          </Typography>
          <Button
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            Cart ({cart.length})
          </Button>

          {/* Profile Section to Open Modal */}
          <Button
            color="inherit"
            onClick={handleClickOpen}
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            {isAuthenticated ? `Welcome, ${userName}` : "Account"}
          </Button>
        </Toolbar>
      </Container>

      {/* Modal for Login/Logout Options */}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{isAuthenticated ? "Logout" : "Login"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {isAuthenticated
              ? "Are you sure you want to log out?"
              : "Please log in to continue."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isAuthenticated ? (
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
