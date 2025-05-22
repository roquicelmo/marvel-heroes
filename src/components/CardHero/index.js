'use client';

import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { FaHeart, FaRegHeart } from "react-icons/fa";



export default function CardHero({ hero }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(hero.id);
  };

  const getFavoriteLabel = (favorite) => {
    if (favorite) {
      return <div className="flex items-center justify-center gap-1.5"><FaHeart /><span>Favorito</span></div>
    }
    else {
      return <div className="flex items-center justify-center gap-1.5"><FaRegHeart /><span>Favoritar</span></div>
    }
  }


  return (
    <Link href={`/heroes/${hero.id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{hero.name}</h3>
          <div className="mt-auto">
            <button
              onClick={handleFavorite}
              className={`cursor-pointer px-3 py-1 rounded-full w-full transition-colors ${isFavorite(hero.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 hover:text-gray-600 hover:bg-gray-300'}`}
            >
              {isFavorite(hero.id) ? getFavoriteLabel(true) : getFavoriteLabel(false)}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}