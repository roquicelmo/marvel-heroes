'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

export default function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setShowMobileSearch(false); // Fecha a busca após enviar em mobile
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            onSearch(searchTerm);
            setShowMobileSearch(false); // Fecha a busca após enviar em mobile
        }
    };

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        setSearchTerm(''); // Limpa o campo ao alternar
    };

    return (
        <header className="bg-cyan-800 text-white p-4">
            {/* Layout para desktop (md para cima) */}
            <div className="hidden md:container md:mx-auto md:flex md:flex-row items-center justify-between gap-4">
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
                            className="w-full p-2 rounded-l text-white border-cyan-600 border-2 placeholder:text-cyan-500! placeholder:italic focus-visible:outline-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 px-4 py-2 rounded-r cursor-pointer hover:bg-cyan-600 transition-colors"
                            disabled={!searchTerm.trim()}
                        >
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>

                <div className='h-full'>
                    <Link href="#" className="bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold flex gap-1.5 items-center hover:bg-cyan-600 transition-colors">
                        <FaHeart />
                        <span>Favoritos</span>
                    </Link>
                </div>
            </div>

            {/* Layout para mobile (md para baixo) */}
            <div className="md:hidden">
                <div className="flex items-center justify-between">
                    <Link href="/heroes" className="text-2xl font-bold">
                        Marvel Heroes
                    </Link>

                    <div className="flex gap-4">
                        <button
                            onClick={toggleMobileSearch}
                            className="p-2 rounded-full cursor-pointer hover:bg-cyan-700 transition-colors"
                        >
                            <FiSearch size={20} />
                        </button>

                        <Link href="#" className="p-2 rounded-full cursor-pointer hover:bg-cyan-700 transition-colors">
                            <FaHeart size={20} />
                        </Link>
                    </div>
                </div>

                {/* Campo de busca mobile (aparece somente quando ativado) */}
                {showMobileSearch && (
                    <div className="mt-4">
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                placeholder="Buscar heróis..."
                                className="w-full p-2 rounded-l cursor-pointer text-white border-cyan-600 border-2 placeholder:text-cyan-500! placeholder:italic focus-visible:outline-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-cyan-500 px-4 py-2 rounded-r cursor-pointer hover:bg-cyan-600 transition-colors"
                                disabled={!searchTerm.trim()}
                            >
                                <FiSearch size={20} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </header>
    );
}