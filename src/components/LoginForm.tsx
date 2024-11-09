import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { login } from "../api/auth"; // Ensure this is the correct path

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // Call the updated login function
      console.log(response); // This should now contain the token and name
      localStorage.setItem("token", response.token); // Save the token
      localStorage.setItem("userName", response.name); // Save the user's name (or another field)
      navigate("/"); // Redirect to homepage
    } catch (err: any) {
      setError(err.message); // Display the error message returned from the backend
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
