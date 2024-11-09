import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Typography, Box } from '@mui/material';

const LoginPage: React.FC = () => (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
        <Box sx={{ textAlign: 'center', padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
                Sign In
            </Typography>
            <LoginForm />
            <Typography variant="h6" sx={{
                marginTop: 3,
                fontWeight: 100,
                color: '#333',
            }} >
                Don't have an account? <a href="/signup">Register</a>
            </Typography>
        </Box>
    </Container>
);

export default LoginPage;
