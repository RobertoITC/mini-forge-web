import React from 'react';


const SearchBar: React.FC<{ searchTerm: string; setSearchTerm: (val: string) => void }> = ({ searchTerm, setSearchTerm }) => (
    <div className="mb-6">
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-4 bg-white border border-white border-2 rounded rounded-full focus:outline-none focus:border-[#AB2724] transition"
        />
    </div>
);

export default SearchBar;