import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../Types/Product';

const sampleProducts: Product[] = [
    { id: 1, name: 'Knight Figurine', price: 19.99, image: '/products/knight.png', category: 'Figures', description: 'A finely detailed knight ready for battle.' },
    { id: 2, name: 'Battle Tank', price: 29.99, image: '/products/tank.png', category: 'Vehicles', description: 'Armored tank model for tabletop warfare.' },
    { id: 3, name: 'Elf Archer', price: 24.99, image: '/products/elf-archer.png', category: 'Figures', description: 'Graceful elf archer with intricate bow design.' },
    { id: 4, name: 'Wizard Tower', price: 34.99, image: '/products/tower.png', category: 'Structures', description: 'Mystical tower emitting arcane energy.' },
    { id: 5, name: 'Cannon', price: 21.5, image: '/products/cannon.png', category: 'Vehicles', description: 'Heavy-duty cannon for siege scenarios.' },
    { id: 6, name: 'Goblin Pack', price: 14.75, image: '/products/goblin-pack.png', category: 'Figures', description: 'Squad of mischievous goblins ready to swarm.' },
];

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = sampleProducts.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-10">
                <p className="text-center text-[#561412]">Product not found.</p>
                <div className="text-center mt-4">
                    <Link to="/products" className="text-[#AB2724] hover:underline">← Back to Products</Link>
                </div>
            </div>
        );
    }

    return (
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
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-[#561412] mb-4">{product.name}</h1>
                    <p className="text-[#AB2724] text-2xl font-semibold mb-6">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-[#561412] mb-6">{product.description}</p>
                    <button className="bg-[#AB2724] text-white px-6 py-3 rounded hover:bg-[#781B19] transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
