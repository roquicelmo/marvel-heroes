'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaStar } from "react-icons/fa";

export default function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <header className="bg-cyan-800 text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                    <Link href="/heroes" className="text-2xl font-bold">
                        Marvel Heroes
                    </Link>
                </div>

                <div className="flex-1 max-w-md relative">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Buscar heróis..."
                            className="w-full p-2 rounded-l text-white border-cyan-600 border-2 placeholder:text-cyan-500! placeholder:italic focus-visible:outline-0 "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 px-4 py-2 rounded-r cursor-pointer"
                            disabled={!searchTerm.trim()}
                        >
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>

                <div className='h-full'>
                    <Link href="/fav" className="bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold flex gap-1.5 items-center">
                        <FaStar />
                        <span>Favoritos</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}