import { Product } from '../types/Product';

const API_URL = 'http://localhost:5000';

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
};

export const createProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return response.json();
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
};


export const getProductById = async (id: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    return response.json();
  };
