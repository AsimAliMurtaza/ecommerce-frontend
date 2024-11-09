import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track if login is in progress
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Track successful authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous error

    try {
      const response = await login(email, password); // Make login request

      // Check if response contains the necessary fields (token and name)
      if (response && response.token && response.name) {
        localStorage.setItem("token", response.token); // Store token
        localStorage.setItem("userName", response.name); // Store userName
        setIsAuthenticated(true); // Update authentication state
        setIsLoading(false); // Reset loading state after login attempt

        // Redirect after a 3-second delay
        setTimeout(() => {
          navigate("/"); // Redirect to homepage or another page
        }, 3000); // 3 seconds timeout
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle errors (network, server, etc.)
      setError("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false); // Reset loading state after login attempt
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      {error && (
        <Typography
          variant="body2"
          sx={{ color: "red", marginBottom: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        {/* Disable the button if login is in progress */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading || isAuthenticated} // Disable if loading or already authenticated
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "black" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
