'use client';

import { useEffect, useState } from 'react';
import { getHeroes } from '@/services/marvelService';
import { useFavorites } from '@/hooks/useFavorites';
import CardHero from '@/components/CardHero';
import { WrapperDataComponent } from '@/components/WrapperDataComponent';

export default function FavoritesPage() {
    const [favoriteHeroes, setFavoriteHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const { favorites } = useFavorites();

    useEffect(() => {
        const fetchFavoriteHeroes = async () => {

            try {
                setLoading(true)
                const params = { offset: 0, limit: 100, orderBy: 'name' };
                const response = await getHeroes(params);
                const filtered = response.results.filter(hero =>
                    favorites.includes(hero.id)
                );
                setFavoriteHeroes(filtered);
                setError(false)
            } catch (error) {
                setError(true)
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteHeroes();
    }, [favorites]);

    return (

        <div className={`container mx-auto min-h-full p-4 ${loading ? 'items-center justify-center flex' : ''}`}>

            <WrapperDataComponent isLoading={loading} hasError={error} tryAgain={() => router.refresh()}>
                <>
                    <h1 className="text-2xl font-bold mb-6">Seus Heróis favoritos</h1>

                    {loading ? null : favoriteHeroes.length > 0 ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favoriteHeroes.map(hero => (
                                <CardHero key={hero.id} hero={hero} />
                            ))}
                        </div>
                    ) : (<p className="text-center text-gray-500">Você não tem heróis nos favoritos</p>)}
                </>
            </WrapperDataComponent>
        </div>

    );
}