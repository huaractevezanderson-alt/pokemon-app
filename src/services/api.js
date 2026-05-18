import axios from 'axios';

// ===== POKÉMON API =====
const POKEAPI = 'https://pokeapi.co/api/v2';

export const getPokemon = async (nameOrId) => {
  const response = await axios.get(`${POKEAPI}/pokemon/${nameOrId}`);
  return response.data;
};

export const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 151) + 1;
  return getPokemon(randomId);
};

// ===== RICK & MORTY API =====
const RMAPI = 'https://rickandmortyapi.com/api';

export const getRMCharacter = async (id) => {
  const response = await axios.get(`${RMAPI}/character/${id}`);
  return response.data;
};

export const getRandomRMCharacter = async () => {
  const randomId = Math.floor(Math.random() * 826) + 1;
  return getRMCharacter(randomId);
};

// ===== CHUCK NORRIS API =====
const CNAPI = 'https://api.chucknorris.io/jokes';

export const getRandomJoke = async () => {
  const response = await axios.get(`${CNAPI}/random`);
  return response.data;
};