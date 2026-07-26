import { useState } from 'react';
import GameMap from './components/GameMap/GameMap';
import { QUADRANTS, INITIAL_POSITION } from './data/mapLayout';
import { getRandomPokemonByType } from './services/pokeApi';
import './App.css';

function App() {
  const [playerPosition, setPlayerPosition] = useState(INITIAL_POSITION);

  async function handleQuadrantClick(quadrantName) {
    const quadrant = QUADRANTS[quadrantName];
    setPlayerPosition(quadrant.position);

    const types = quadrant.types;
    const randomType = types[Math.floor(Math.random() * types.length)];

    const pokemon = await getRandomPokemonByType(randomType);
    console.log(pokemon);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <GameMap playerPosition={playerPosition} onQuadrantClick={handleQuadrantClick} />
      </div>
  );
}

export default App;