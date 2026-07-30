import { useGameStore } from "../../store/gameStore";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import PokedexEmptyState from "../PokedexEmptyState/PokedexEmptyState";

function PokedexModal() {
  const isPokedexOpen = useGameStore((state) => state.isPokedexOpen);
  const capturedPokemons = useGameStore((state) => state.capturedPokemons);
  const togglePokedex = useGameStore((state) => state.togglePokedex);
  const removePokemon = useGameStore((state) => state.removePokemon);

  if (!isPokedexOpen) return null;

  if (capturedPokemons.length === 0) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
        onClick={(event) => {
          event.stopPropagation();
          togglePokedex();
        }}
      >
        <div className="relative" onClick={(event) => event.stopPropagation()}>
          <img
            src="/pokedex-vazia.png"
            alt="Pokémons capturados. Sua Pokédex está vazia. Explore o mapa e capture seu primeiro Pokémon para começar sua coleção."
            className="w-[450px]"
          />
          <button
            onClick={togglePokedex}
            className="absolute top-4 right-4 w-6 h-6"
            aria-label="Fechar"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div
        className="bg-amber-50 border-2 border-amber-800/20 rounded-xl shadow-2xl p-6 w-[800px] max-h-[80vh] flex flex-col"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Pokémons capturados"
      >
        <div className="flex justify-between items-center border-b border-amber-800/10 pb-3 mb-3">
          <span className="font-bold uppercase tracking-wide">
            Pokémons Capturados
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {capturedPokemons.length}/6
            </span>
            <button
              onClick={togglePokedex}
              className="text-gray-500 hover:text-gray-800 text-lg"
              aria-label="Fechar Pokédex"
            >
              X
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {capturedPokemons.map((pokemon) => (
            <PokemonListItem
              key={pokemon.name}
              pokemon={pokemon}
              onRemove={removePokemon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokedexModal;
