import { useState } from 'react';
import GameMap from './components/GameMap/GameMap';
import { QUADRANTS, INITIAL_POSITION } from './data/mapLayout';
import { getRandomPokemonByType } from './services/pokeApi';
import './App.css';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <GameMap/>
      </div>
  );

  async function handleQuadrantClick(quadrantName) {
    const quadrant = QUADRANTS[quadrantName];
    setPlayerPosition(quadrant.position);

    const types = quadrant.types;
    const randomType = types[Math.floor(Math.random() * types.length)];

    const pokemon = await getRandomPokemonByType(randomType);
    console.log(pokemon);
  }
  
}
export default App;