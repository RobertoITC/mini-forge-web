import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../Types/Product';
import { useCart } from '../Contexts/CartContext';
//aceternity ui tilt card


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addItem } = useCart(); // ✅ hook inside component body

    return (

        <Link to={`/product/${product.id}`} className="block">
            <div className="bg-white rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                />
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <p className="text-[#AB2724] font-bold mb-4">
                    ${product.price.toFixed(2)}
                </p>
                <button
                    onClick={e => {
                        e.preventDefault(); // prevent navigation
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                    }}
                    className="bg-[#AB2724] text-white px-4 py-2 rounded hover:bg-[#781B19] transition"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;