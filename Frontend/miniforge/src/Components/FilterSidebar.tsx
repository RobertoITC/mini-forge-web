
import React from 'react';

const FilterSidebar: React.FC<{
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
}> = ({ categories, selectedCategory, setSelectedCategory }) => (
    <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Filter by Category</h3>
        <ul>
            <li>
                <button
                    className={`block w-full text-left hover:text-[#AB2724] py-1 ${selectedCategory === '' ? 'underline decoration-4' : ''}`}
                    onClick={() => setSelectedCategory('')}
                >
                    All
                </button>
            </li>
            {categories.map(cat => (
                <li key={cat}>
                    <button
                        className={`block w-full hover:text-[#AB2724] text-left py-1 ${selectedCategory === cat ? 'underline decoration-4' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default FilterSidebar;