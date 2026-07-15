import React, { createContext, useContext, useState, useEffect, useCallback , useMemo} from 'react';
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
        const timer = setTimeout( () => {
            try {
                localStorage.setItem('cart', JSON.stringify(items));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        } , 3000);

        return () => clearTimeout(timer);
    }, [items]);

    const addItem = useCallback((newItem) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === newItem.id &&
                JSON.stringify(item.customization) === JSON.stringify(newItem.customization));
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + newItem.quantity
                };
                return updated;
            }
            return [...prev, newItem];
        });
    },[]);
    const removeItem = useCallback((id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    },[]);
    const updateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    },[removeItem]);
    const clearCart = useCallback(() => setItems([]),[]);
    const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
    const totalPrice = useMemo(() => items.reduce((sum, item) => sum + calculateItemPrice(item), 0), [items]);

    const value = useMemo( () => {
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
    }, [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice]);
    
    return (<CartContext.Provider value={value}>
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
