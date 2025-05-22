'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getHeroById } from '@/services/marvelService';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdMenuBook, MdMovie } from "react-icons/md";
import CardInfoHero from '@/components/CardInfoHero';
import { FaNewspaper } from "react-icons/fa6";
import { WrapperDataComponent } from '@/components/WrapperDataComponent';
import { Error } from '@/components/Error';


export default function HeroDetailPage() {

    const { id } = useParams();
    const router = useRouter();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await getHeroById(id);
                setHero(data);
                setError(false)
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchHero();
    }, [id]);

    const handleFavorite = () => {
        toggleFavorite(hero.id);
    };

    const getFavoriteLabel = (favorite) => {
        if (favorite) {
            return <div className="flex items-center justify-center gap-1.5"><FaHeart /><span className='hidden lg:block'>Favorito</span></div>
        }
        else {
            return <div className="flex items-center justify-center gap-1.5"><FaRegHeart /><span className='hidden lg:block'>Favoritar</span></div>
        }
    }
    console.log('hero', hero)

    return (
        <div className={`container mx-auto p-6 h-full ${loading || error ? 'flex items-center justify-center' : ''}`}>
            <WrapperDataComponent isLoading={loading} tryAgain={() => router.refresh()} hasError={error}>
                {hero && (
                    <div className="overflow-hidden">
                        <div className="flex-col-reverse md:flex-row flex gap-3">

                            <div className="p-6 md:w-1/2 rounded-lg">
                                <div className="flex justify-between items-start mb-6">
                                    <div className='flex gap-5'>
                                        <Link
                                            href={`/heroes`}
                                            className="bg-gray-300 hidden md:flex gap-3 items-center justify-center py-2 cursor-pointer px-3 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-300"
                                        >
                                            <FaArrowLeft />
                                        </Link>
                                        <h1 className="text-3xl font-bold text-red-500">{hero.name}</h1>
                                    </div>
                                    <button
                                        onClick={handleFavorite}
                                        className={`px-4 py-2 cursor-pointer rounded-full ${isFavorite(hero.id) ? 'bg-red-500 text-white' : 'bg-gray-200 hover:text-gray-600 hover:bg-gray-300'}`}
                                    >
                                        {isFavorite(hero.id) ? getFavoriteLabel(true) : getFavoriteLabel(false)}
                                    </button>
                                </div>

                                <div className="mb-8 p-4">
                                    <h2 className="text-xl font-semibold mb-2 ">Descrição</h2>
                                    <p className="">{hero.description ? hero.description : 'Não há descrições disponíveis para este herói'}</p>
                                </div>

                                <div className="space-y-4 flex justify-between gap-3 flex-col">
                                    <CardInfoHero label="Quadrinhos em que aparece:" icon={<MdMenuBook className="text-red-500" size={48} />} items={hero.comics.available} />
                                    <CardInfoHero label="Séries em que aparece:" icon={<MdMovie className="text-red-500" size={48} />} items={hero.series.available} />
                                    <CardInfoHero label="Histórias em que aparece:" icon={<FaNewspaper className="text-red-500" size={48} />} items={hero.stories.available} />
                                </div>
                            </div>

                            <div className="md:w-1/2 rounded-lg overflow-hidden h-[400px] md:h-auto">
                                <div className='md:hidden'>
                                    <Link
                                        href={`/heroes`}
                                        className="flex gap-3 items-center justify-center py-2 cursor-pointer px-3 rounded-full bg-gray-300 hover:text-gray-600 hover:bg-gray-300"
                                    >
                                        <FaArrowLeft />
                                        <span>Voltar</span>
                                    </Link>

                                </div>
                                <img
                                    src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                                    alt={hero.name}
                                    className="w-full h-full object-cover mt-5 md:mt-0 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ) || <Error message={'Não encontramos informações do Herói'} tryAgain={() => router.refresh()} />}
            </WrapperDataComponent>
        </div>
    )
}