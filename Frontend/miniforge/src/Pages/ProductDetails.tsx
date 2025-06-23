import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../Lib/supabaseClient';
import { useCart } from '../Contexts/CartContext';
import type { Product } from '../Types/Product';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addItem } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ──────────────────────────────────────────────────────────
    // Fetch the product directly from Supabase
    // ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .maybeSingle(); // ← returns null (not error) if no row
                if (error) throw error;
                if (!data) {
                    setError('Product not found');
                } else {
                    setProduct(data as Product);
                }
            } catch (e: any) {
                console.error(e);
                setError(e.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center">Loading product...</div>;
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-6 py-10 text-center">
                <p className="text-red-600">{error || 'Product not found.'}</p>
                <Link to="/products" className="text-[#AB2724] hover:underline mt-4 inline-block">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7E9E9]">
            <div className="container mx-auto px-6 py-10">
                <Link to="/products" className="text-[#AB2724] hover:underline mb-6 inline-block">
                    ← Back to Products
                </Link>

                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-1/2 object-cover rounded-lg shadow-lg"
                    />

                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-3xl font-bold text-[#561412]">{product.name}</h1>

                        <p className="text-[#AB2724] text-2xl font-semibold">
                            ${product.price.toFixed(2)}
                        </p>

                        {product.description && (
                            <p className="text-[#561412]">{product.description}</p>
                        )}

                        <button
                            onClick={() =>
                                addItem({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                })
                            }
                            className="bg-[#AB2724] text-white px-6 py-3 rounded hover:bg-[#781B19] transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;