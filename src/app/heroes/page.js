'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getHeroes } from '@/services/marvelService';
import Header from '@/components/Header';
import CardHero from '@/components/CardHero';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';

export default function HeroesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [heroes, setHeroes] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const page = parseInt(searchParams.get('page') || '1');
    const orderBy = searchParams.get('orderBy') || 'name';
    const nameStartsWith = searchParams.get('nameStartsWith') || '';
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const fetchHeroes = async () => {
            setLoading(true);
            try {
                const params = { offset, limit, orderBy };
                if (nameStartsWith) params.nameStartsWith = nameStartsWith;

                const data = await getHeroes(params);
                setHeroes(data.results);
                setTotal(data.total);
            } catch (error) {
                console.error('Error fetching heroes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroes();
    }, [page, orderBy, nameStartsWith, offset]);

    const handleSearch = (searchTerm) => {
        router.push(`/heroes?nameStartsWith=${searchTerm}&page=1&orderBy=${orderBy}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header onSearch={handleSearch} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
                    <p>Loading heroes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header onSearch={handleSearch} />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <Filters orderBy={orderBy} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {heroes.map(hero => (
                            <CardHero key={hero.id} hero={hero} />
                        ))}
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} />
                </div>
            </main>
        </div>
    );
}