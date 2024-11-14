import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, cantidad: 1 }];
            }
        });
    };

    const removeFromCart = (producto_id) => {
        setCart((prevCart) =>
            prevCart.filter(item => item.id !== producto_id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalProducts = () => {
        return cart.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalProducts }}>
            {children}
        </CartContext.Provider>
    );
};