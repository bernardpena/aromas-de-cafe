import React, { createContext, useState } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Si el producto ya existe, aumentar la cantidad
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                // Si el producto no existe, agregarlo al carrito
                return [...prevCart, { ...product, cantidad: 1 }];
            }
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (producto_id) => {
        setCart((prevCart) =>
            prevCart.filter(item => item.id !== producto_id)
        );
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Proveer el contexto para otros componentes
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};