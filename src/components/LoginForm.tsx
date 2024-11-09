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
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(""); 

    try {
      const response = await login(email, password);

      if (response && response.token && response.name) {
        localStorage.setItem("token", response.token); 
        localStorage.setItem("userName", response.name); 
        setIsAuthenticated(true); 
        setIsLoading(false); 

        setTimeout(() => {
          navigate("/");
        }, 3000); 
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading || isAuthenticated} 
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
