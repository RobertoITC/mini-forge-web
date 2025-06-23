import React, { useState } from 'react';
import type {Product} from "../Types/Product.ts";
import ProductCard from "../Components/ProductCard";
import SearchBar from "../Components/SearchBar";
import FilterSidebar from "../Components/FilterSidebar";


const sampleProducts: Product[] = [
    { id: 1, name: 'Knight Figurine', price: 19.99, image: '/products/knight.png', category: 'Figures' },
    { id: 2, name: 'Battle Tank', price: 29.99, image: '/products/tank.png', category: 'Vehicles' },
    { id: 3, name: 'Elf Archer', price: 24.99, image: '/products/elf-archer.png', category: 'Figures' },
    { id: 4, name: 'Wizard Tower', price: 34.99, image: '/products/tower.png', category: 'Structures' },
    { id: 5, name: 'Cannon', price: 21.5, image: '/products/cannon.png', category: 'Vehicles' },
    { id: 6, name: 'Goblin Pack', price: 14.75, image: '/products/goblin-pack.png', category: 'Figures' },
];

// Main products page
const ProductsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = Array.from(new Set(sampleProducts.map(p => p.category)));

    const filteredProducts = sampleProducts.filter(p => {
        return (
            (selectedCategory === '' || p.category === selectedCategory) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        // Background color
        <div className="bg-[#F7E9E9] min-h-screen">

            <div className="container mx-auto w-screen px-6 py-10 flex flex-col md:flex-row gap-8">
                {/* Left filter + search */}
                <aside className="md:w-1/4">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </aside>

                {/* Product grid */}
                <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default ProductsPage;

