import { useGameStore } from "../../store/gameStore";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import { getTypeColors } from "../../data/typeColors";

function EncounterModal() {
  const encounterPokemon = useGameStore((state) => state.encounterPokemon);
  const capturePokemon = useGameStore((state) => state.capturePokemon);
  const togglePokedex = useGameStore((state) => state.togglePokedex);
  const removePokemon = useGameStore((state) => state.removePokemon);
  const searchPokemon = useGameStore((state) => state.searchPokemon);
  const goBack = useGameStore((state) => state.goBack);
  const searchToken = useGameStore((state) => state.searchToken);

  if (!encounterPokemon) return null;

  const pokemonName = encounterPokemon.name;
  const pokemonImage = encounterPokemon.sprites.front_default;
  const pokemonType = encounterPokemon.types[0].type.name;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-amber-50 border-2 border-amber-800/20 rounded-xl shadow-2xl p-5 flex-col pointer-events-auto"
        style={{ width: 370, height: 366 }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label={`Pokémon encontrado: ${pokemonName}`}
      >
        <div className="flex justify-between items-center border-b border-amber-800/10 pb-3 mb-4">
          <span className="font-bold text-gray-900 uppercase tracking-wide">
            {pokemonName}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Tipo:</span>
            <span
              className={`${getTypeColors(pokemonType)} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase`}
            >
              {pokemonType}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img src={pokemonImage} alt={pokemonName} className="w-40 h-40" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={capturePokemon}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
          >
            CAPTURAR
          </button>

          <button
            onClick={() => searchPokemon(searchToken)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-md transition-colors"
          >
            CONTINUAR PROCURANDO
          </button>
          <button
            onClick={goBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-bold py-2.5 rounded-md transition-colors"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default EncounterModal;
