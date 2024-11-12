import React from "react";
import SignupForm from "../components/SignupForm";
import { Container } from "@mui/material";

const SignupPage: React.FC = () => (
  <Container maxWidth="xs" sx={{ mt: 5, mb: 12 }}>
    <SignupForm />
  </Container>
);

export default SignupPage;
