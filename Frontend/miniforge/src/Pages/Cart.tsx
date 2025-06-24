// src/pages/Cart.tsx
import React from 'react';
import { useCart } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';

const CartPage: React.FC = () => {
    const { items, updateQty, removeItem, clear } = useCart();

    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

    if (items.length === 0)
        return (
            <div className={'bg-[#F7E9E9] min-h-screen'}>
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-2xl mb-4">Your cart is empty 🛒</h1>
                <Link to="/products" className="text-[#AB2724] underline">
                    Browse products
                </Link>
            </div>
            </div>
        );

    return (

        <div className={'bg-[#F7E9E9] min-h-screen'}>

        <div className="container mx-auto px-6 py-12 space-y-8">
            <h1 className="text-3xl font-bold text-[#561412]">Shopping Cart</h1>

            <div className="space-y-6">
                {items.map(({ product, quantity }) => (
                    <div
                        key={product.id}
                        className="flex items-center bg-white rounded shadow p-4 gap-4"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold">{product.name}</h2>
                            <p className="text-[#AB2724]">${product.price.toFixed(2)}</p>
                        </div>
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQty(product.id, Math.max(1, quantity - 1))}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => updateQty(product.id, quantity + 1)}>
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={() => removeItem(product.id)}>
                            <Trash className="w-5 h-5 text-red-600" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="text-right space-y-4">
                <p className="text-xl">
                    Subtotal:{' '}
                    <span className="font-bold text-[#AB2724]">
            ${subtotal.toFixed(2)}
          </span>
                </p>
                <button
                    onClick={clear}
                    className="text-[#AB2724] underline hover:text-[#781B19]"
                >
                    Clear Cart
                </button>
                <button
                    className="ml-4 bg-[#AB2724] text-white px-6 py-2 rounded hover:bg-[#781B19] transition"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
        </div>
    );
};

export default CartPage;