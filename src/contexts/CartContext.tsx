import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "../types/Product";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity? + quantity : quantity,
      }
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((product) => product._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
