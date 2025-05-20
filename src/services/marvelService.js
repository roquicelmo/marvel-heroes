import axios from 'axios';
import md5 from 'md5';

const MARVEL_PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;

const marvelApi = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  timeout: 10000,
});

marvelApi.interceptors.request.use(config => {
  const ts = new Date().getTime();
  const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  
  config.params = {
    ...config.params,
    ts,
    apikey: MARVEL_PUBLIC_KEY,
    hash
  };
  
  return config;
});

export const getHeroes = async ({ offset = 0, limit = 20, orderBy = 'name', nameStartsWith = '' }) => {
  const params = { offset, limit, orderBy };
  if (nameStartsWith) params.nameStartsWith = nameStartsWith;
  
  const response = await marvelApi.get('/characters', { params });
  return response.data.data;
};

export const getHeroById = async (id) => {
  const response = await marvelApi.get(`/characters/${id}`);
  if (response.data.data.count === 0) {
    throw new Error('Hero not found');
  }
  return response.data.data.results[0];
};