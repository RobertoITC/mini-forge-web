import React, { useState, useEffect } from 'react';
import type { Product } from '../Types/Product';
import SearchBar from '../Components/SearchBar';
import FilterSidebar from '../Components/FilterSidebar';
import ProductCard from '../Components/ProductCard';
import { supabase } from '../Lib/supabaseClient';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ────────────────────────────────────────────────────────────
    // Fetch directly from Supabase
    // ────────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*');          // add .order('name') if you like
                if (error) throw error;
                setProducts(data as Product[]);
            } catch (e: any) {
                console.error(e);
                setError(e.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // unique category list
    const categories = Array.from(new Set(products.map(p => p.category)));

    // filter by category + search
    const filtered = products.filter(p =>
        (selectedCategory === '' || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">Loading products...</div>;
    if (error)   return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen bg-[#F7E9E9]">
            <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/4">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </aside>

                {/* Products grid */}
                <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(prod => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default ProductsPage;