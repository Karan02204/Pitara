import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext(undefined);
const calculateItemPrice = (item) => {
    let price = item.basePrice;
    // Size multiplier
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };
    price *= sizeMultipliers[item.customization.size];
    // Wrapping additions
    const wrappingPrices = { standard: 0, premium: 5, luxury: 15 };
    price += wrappingPrices[item.customization.wrapping];
    // Ribbon addition
    if (item.customization.ribbon) {
        price += 3;
    }
    return price * item.quantity;
};
export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage
    const [items, setItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [items]);

    const addItem = (newItem) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === newItem.id &&
                JSON.stringify(item.customization) === JSON.stringify(newItem.customization));
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex].quantity += newItem.quantity;
                return updated;
            }
            return [...prev, newItem];
        });
    };
    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };
    const clearCart = () => setItems([]);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + calculateItemPrice(item), 0);
    return (<CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
      {children}
    </CartContext.Provider>);
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
export { calculateItemPrice };
