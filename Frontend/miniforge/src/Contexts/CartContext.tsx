// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from '../Types/Cart';

interface CartCtx {
    items: CartItem[];
    addItem: (item: CartItem['product']) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, qty: number) => void;
    clear: () => void;
}

const Context = createContext<CartCtx | undefined>(undefined);
const LS_KEY = 'miniforge-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem(LS_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage each change
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (product: CartItem['product']) => {
        setItems(prev => {
            const idx = prev.findIndex(i => i.product.id === product.id);
            if (idx >= 0) {
                prev[idx].quantity += 1;
                return [...prev];
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeItem = (id: number) =>
        setItems(prev => prev.filter(i => i.product.id !== id));

    const updateQty = (id: number, qty: number) =>
        setItems(prev =>
            prev.map(i => (i.product.id === id ? { ...i, quantity: qty } : i))
        );

    const clear = () => setItems([]);

    return (
        <Context.Provider value={{ items, addItem, removeItem, updateQty, clear }}>
            {children}
        </Context.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('useCart must be inside CartProvider');
    return ctx;
};