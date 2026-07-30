import { useGameStore } from "../../store/gameStore";

function PokedexButton() {
  const capturedPokemons = useGameStore((state) => state.capturedPokemons);
  const togglePokedex = useGameStore((state) => state.togglePokedex);

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        togglePokedex();
      }}
      className="absolute top-22 left-3 z-40 flex flex-col items-center"
    >
      <div className="relative bg-orange-400 border-2 border-orange-200 rounded-lg p-2 shadow-md">
        <img
          src="/pokedex.png"
          alt="Pokédex"
          className="w-28"
          style={{ height: 97 }}
        />
        <span className="absolute -top-3 -right-3 bg-gray-100 text-orange-400 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md">
          {capturedPokemons.length}
        </span>
      </div>
    </button>
  );
}

export default PokedexButton;
