import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';


export async function getPokemonByType(type) {
  const response = await axios.get(`${BASE_URL}/type/${type}`);
  return response.data.pokemon;
}

export async function getRandomPokemonByType(type) {
  const typeList = await getPokemonByType(type);
  const randomIndex = Math.floor(Math.random() * typeList.length);
  const chosen = typeList[randomIndex].pokemon;

  const response = await axios.get(chosen.url);
  return response.data;
}   