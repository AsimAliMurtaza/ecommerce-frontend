import React, { useState } from 'react';
import { signup } from '../api/auth';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signup(username, email, password);
            setMessage(response.message || 'Signup successful!');
        } catch (error) {
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Box sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3 }}>
                    Signup
                </Typography>
                <form onSubmit={handleSignup}>
                    <TextField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
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
                    >
                        Signup
                    </Button>
                </form>
                {message && (
                    <Typography
                        variant="body2"
                        sx={{ color: message.startsWith('Error') ? 'red' : 'green', mt: 2, textAlign: 'center' }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SignupForm;
