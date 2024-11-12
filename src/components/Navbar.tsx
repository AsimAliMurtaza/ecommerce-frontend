import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { cart } = useCart();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleClose();
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleRoute = () => {
    navigate("/manage-products");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {if(isAuthenticated){
    console.log("User is authenticated", isAuthenticated);
  }}, [isAuthenticated]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingBag />
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

          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuClick} sx={{ p: 0, ml: 2 }}>
                <Avatar
                  src={
                    userName === "asim"
                      ? "https://github.com/AsimAliMurtaza/resources/blob/main/pfp-200kb.jpg?raw=true"
                      : ""
                  }
                  alt="Profile Picture"
                  sx={{
                    width: 35,
                    height: 35,
                    border: "1px solid teal",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ mt: "45px" }}
              >
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                >
                  Sign Out
                </MenuItem>
                {userName === "asim" && (
                  <MenuItem
                    onClick={() => {
                      handleRoute();
                      handleMenuClose();
                    }}
                  >
                    Manage Products
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{
                borderColor: "white",
                display: { xs: "none", sm: "block" },
                padding: "6px 10px",
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>

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
