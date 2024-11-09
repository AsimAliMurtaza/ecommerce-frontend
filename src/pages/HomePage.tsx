import React from 'react';
import ProductList from '../components/ProductList';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => (
    <Box sx={{ padding: 4, backgroundColor: '#fafafa' }}>
        <Typography variant="h2" sx={{
            textAlign: 'center',
            marginBottom: 4,
            fontWeight: 700,
            color: '#333',
        }}>
            Welcome to the E-commerce App
        </Typography>
        <ProductList />
    </Box>
);

export default HomePage;
