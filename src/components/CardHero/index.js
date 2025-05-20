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
    if(favorite){
        return <div className="flex items-center justify-center gap-1.5"><FaHeart/><span>Favorito</span></div>
    }
    else{
        return <div className="flex items-center justify-center gap-1.5"><FaRegHeart/><span>Favoritar</span></div>
    }
  }


  return (
    <Link href={`/heroes/${hero.id}`} className="block h-full">
      <div className="bg-cyan-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
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
              className={`cursor-pointer px-3 py-1 rounded-full w-full ${isFavorite(hero.id) ? 'bg-cyan-600 text-white border-2 border-transparent' : 'bg-transparent border-2 border-cyan-700 text-cyan-500 hover:text-cyan-400 hover:border-cyan-400'}`}
            >
              {isFavorite(hero.id) ? getFavoriteLabel(true) : getFavoriteLabel(false)}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}