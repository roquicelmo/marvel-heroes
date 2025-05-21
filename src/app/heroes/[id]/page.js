'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getHeroById } from '@/services/marvelService';
import { useFavorites } from '@/hooks/useFavorites';
import Header from '@/components/Header';
import Link from 'next/link';
import Accordion from '@/components/Accordion';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Loading from '@/components/Loading';

const HeroDetailContent = () => {
    const { id } = useParams();
    const router = useRouter();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await getHeroById(id);
                setHero(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHero();
    }, [id]);

    const handleFavorite = () => {
        toggleFavorite(hero.id);
    };

    const handleSearch = (searchTerm) => {
        router.push(`/heroes?nameStartsWith=${searchTerm}&page=1`);
    };

    const getFavoriteLabel = (favorite) => {
        if (favorite) {
            return <div className="flex items-center justify-center gap-1.5"><FaHeart /><span>Favorito</span></div>
        }
        else {
            return <div className="flex items-center justify-center gap-1.5"><FaRegHeart /><span>Favoritar</span></div>
        }
    }

    if (loading) {
        return (

            <div className="min-h-screen">
                <Header onSearch={handleSearch} />
                <div className="container mx-auto p-4 text-center">
                    <p>Loading hero details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen">
                <Header onSearch={handleSearch} />
                <div className="container mx-auto p-4 text-center text-red-500">
                    <p>{error}</p>
                    <Link href="/heroes" className="text-blue-500 mt-4 inline-block">
                        Back to Heroes List
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header onSearch={handleSearch} />

            <main className="container mx-auto p-6 h-full">


                <div className="overflow-hidden">
                    <div className="flex-col md:flex-row flex gap-3">
                        <div className="md:w-1/3 rounded-lg overflow-hidden h-[300px] md:h-[400px]">
                            <div className='flex justify-between md:hidden'>
                                <Link
                                    href={`/heroes`}
                                    className="flex gap-3 items-center justify-center py-2 cursor-pointer px-3 rounded-full bg-transparent border-2 border-cyan-700 text-cyan-500 hover:text-cyan-400 hover:border-cyan-400"
                                >
                                    <FaArrowLeft />
                                    <span>Voltar</span>
                                </Link>
                                <button
                                    onClick={handleFavorite}
                                    className={`px-4 py-2 cursor-pointer rounded-full ${isFavorite(hero.id) ? 'bg-cyan-600 text-white border-2 border-transparent' : 'bg-transparent border-2 border-cyan-700 text-cyan-500 hover:text-cyan-400 hover:border-cyan-400'}`}
                                >
                                    {isFavorite(hero.id) ? getFavoriteLabel(true) : getFavoriteLabel(false)}
                                </button>

                            </div>
                            <div className='hidden md:block'>
                                <Link
                                    href={`/heroes`}
                                    className="flex gap-3 items-center justify-center py-2 cursor-pointer px-3 rounded-full bg-transparent border-2 border-cyan-700 text-cyan-500 hover:text-cyan-400 hover:border-cyan-400"
                                >
                                    <FaArrowLeft />
                                    <span>Voltar</span>
                                </Link>

                            </div>
                            <img
                                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                                alt={hero.name}
                                className="w-full h-full object-cover mt-5 rounded-lg"
                            />
                        </div>

                        <div className="p-6 md:w-2/3 bg-cyan-900 rounded-lg shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-3xl font-bold">{hero.name}</h1>
                                <button
                                    onClick={handleFavorite}
                                    className={`px-4 py-2 cursor-pointer rounded-full ${isFavorite(hero.id) ? 'bg-cyan-600 text-white border-2 border-transparent' : 'bg-transparent border-2 border-cyan-700 text-cyan-500 hover:text-cyan-400 hover:border-cyan-400'}`}
                                >
                                    {isFavorite(hero.id) ? getFavoriteLabel(true) : getFavoriteLabel(false)}
                                </button>
                            </div>

                            <div className="mb-8 p-4 bg-cyan-950 rounded-lg">
                                <h2 className="text-xl font-semibold mb-2 text-cyan-200">Description</h2>
                                {hero.description ? (
                                    <p className="text-cyan-500">{hero.description}</p>
                                ) : (
                                    <p className="text-cyan-500">Não há descrições disponíveis para este herói</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Accordion title="Quadrinhos" items={hero.comics.items} />
                                <Accordion title="Séries" items={hero.series.items} />
                                <Accordion title="Histórias" items={hero.stories.items} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function HeroDetailPage() {

    <Suspense fallback={<Loading />}><HeroDetailContent /></Suspense>
}