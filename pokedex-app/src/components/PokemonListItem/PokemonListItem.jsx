import { getTypeColors } from "../../data/typeColors";

function PokemonListItem({ pokemon, onRemove }) {
  const height = (pokemon.height / 10).toFixed(1);
  const weight = (pokemon.weight / 10).toFixed(1);
  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat;
  const type = pokemon.types[0].type.name;

  return (
    <div className="flex items-center gap-4 bg-white/60 border border-amber-800/10 px-4 py-3 mb-3">
      <div className="bg-white rounded-lg border border-amber-800/40 p-1">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-20 h-20"
        />
      </div>

      <div className="flex-1">
        <p className="font-bold text-sm capitalize">{pokemon.name}</p>
        <span
          className={`${getTypeColors(type)} text-white text-xs px-2.5 py-1 rounded-full uppercase inline-block mt-1`}
        >
          {type}
        </span>
      </div>

      <div className="w-px h-17 bg-amber-800/40" />

      <div className="text-sm text-gray-700 text-center w-20">
        <p className="font-semibold">HP</p>
        <p>
          {hp}/{hp}
        </p>
      </div>

      <div className="w-px h-17 bg-amber-800/40" />

      <div className="text-sm text-gray-700 text-center w-20">
        <p className="font-semibold">ALTURA</p>
        <p>{height} M</p>
      </div>

      <div className="w-px h-17 bg-amber-800/40" />

      <div className="text-sm text-gray-700 text-center w-20">
        <p className="font-semibold">PESO</p>
        <p>{weight} KG</p>
      </div>

      <button
        onClick={() => onRemove(pokemon.name)}
        className="hover:opacity-70 transition-opacity"
      >
        <img src="/lixeira.png" alt="Excluir" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default PokemonListItem;
