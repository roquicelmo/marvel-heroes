'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'marvelFavorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storedFavorites = localStorage.getItem(FAVORITES_KEY);
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    const toggleFavorite = (heroId) => {
        setFavorites(prevFavorites => {
            let newFavorites;

            if (prevFavorites.includes(heroId)) {
                newFavorites = prevFavorites.filter(id => id !== heroId);
            } else {
                newFavorites = [...prevFavorites, heroId];
            }

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            return newFavorites;
        });
    };


    const isFavorite = (heroId) => {
        return favorites.includes(heroId);
    };

    return {
        favorites,
        isFavorite,
        toggleFavorite
    };
}