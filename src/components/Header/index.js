'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import marvel_logo from '../../../public/marvel_logo.png'


export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const router = useRouter()

    const pushSearch = (searchTerm) => {
        router.push(`/heroes?nameStartsWith=${searchTerm}&page=1`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            pushSearch(searchTerm);
            setShowMobileSearch(false); // Fecha a busca após enviar em mobile
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            pushSearch(searchTerm);
            setShowMobileSearch(false); // Fecha a busca após enviar em mobile
        }
    };


    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        setSearchTerm(''); // Limpa o campo ao alternar
    };

    return (
        <header className="bg-white  p-4">
            {/* Layout para desktop (md para cima) */}
            <div className="hidden md:container md:mx-auto md:flex md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                    <Link href="/heroes">
                        <Image src={marvel_logo} alt='logo' className='h-[80px] w-auto' />
                    </Link>
                </div>

                <div className="flex-1 max-w-md relative">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Buscar heróis..."
                            className="w-full px-6 py-3 rounded-l-full text-gray-600 border-r-0 border-gray-400 border-2 placeholder:text-gray-400! placeholder:italic focus-visible:outline-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            type="submit"
                            className="bg-red-500 px-4 text-white py-2 rounded-r-full cursor-pointer hover:bg-red-600 transition-colors"
                            disabled={!searchTerm.trim()}
                        >
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>

                <div className='h-full'>
                    <Link href="heroes/favorites" className="bg-gray-200 text-gray-500 px-6 py-3 rounded-full font-semibold flex gap-1.5 items-center hover:bg-red-500 hover:text-white transition-colors">
                        <FaHeart />
                        <span>Favoritos</span>
                    </Link>
                </div>
            </div>

            {/* Layout para mobile (md para baixo) */}
            <div className="md:hidden">
                <div className="flex items-center justify-between">
                    <Link href="/heroes">
                        <Image src={marvel_logo} alt='logo' className='h-[80px] w-auto' />
                    </Link>

                    <div className="flex gap-4">
                        <button
                            onClick={toggleMobileSearch}
                            className="p-3 rounded-full cursor-pointer text-gray-600 bg-gray-200"
                        >
                            <FiSearch size={20} />
                        </button>

                        <Link href="/heroes/favorites" className="p-3 rounded-full cursor-pointer text-gray-600 bg-gray-200">
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
                                className="w-full py-2 px-6 border-r-0  rounded-l-full cursor-pointer text-gray-600 border-gray-400 border-2 placeholder:text-gray-400! placeholder:italic focus-visible:outline-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-red-500 px-4 text-white py-2 rounded-r-full cursor-pointer hover:bg-red-600 transition-colors"
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