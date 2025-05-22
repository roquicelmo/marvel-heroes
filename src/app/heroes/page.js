'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getHeroes } from '@/services/marvelService';
import CardHero from '@/components/CardHero';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import Loading from '@/components/Loading'
import { WrapperDataComponent } from '@/components/WrapperDataComponent';
import { useRouter } from 'next/navigation';

const HeroesContent = () => {
  const searchParams = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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
        setError(false)

      } catch (error) {
        setError(true)
        console.error('Error fetching heroes:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, [page, orderBy, nameStartsWith, offset]);

  return (

    <div className={`flex flex-col min-h-[calc(100vh-140px)] ${loading || error ? 'items-center justify-center' : ''}`}>
      <WrapperDataComponent isLoading={loading} hasError={error} tryAgain={() => router.refresh()}>

        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <Filters orderBy={orderBy} />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {heroes.map(hero => (
                  <CardHero key={hero.id} hero={hero} />
                ))}
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-white py-2 mt-auto shadow-(--pagination-shadow)">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <Pagination currentPage={page} totalPages={totalPages} filters={{ orderBy: orderBy }} />
              </div>
            </div>
          </div>
        </>

      </WrapperDataComponent>
    </div>

  );
}

export default function HeroesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <HeroesContent />
    </Suspense>
  )
}