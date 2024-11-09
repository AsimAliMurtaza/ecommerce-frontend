import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
            <Container maxWidth="lg">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        E-Commerce App
                    </Typography>
                    <Button component={Link} to="/" color="inherit" sx={{ marginRight: 2 }}>
                        Home
                    </Button>
                    <Button component={Link} to="/products" color="inherit" sx={{ marginRight: 2 }}>
                        Products
                    </Button>
                    <Button component={Link} to="/cart" color="inherit">
                        Cart
                    </Button>
                    <Button component={Link} to="/login" color="inherit">
                        Sign In
                    </Button>
                </Toolbar>

            </Container>
        </AppBar>
    );
};

export default Navbar;