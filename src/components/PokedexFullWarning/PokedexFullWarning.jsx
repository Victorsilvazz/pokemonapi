import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";

function PokedexFullWarning() {
  const isPokedexFullWarning = useGameStore(
    (state) => state.isPokedexFullWarning,
  );
  const playerPosition = useGameStore((state) => state.playerPosition);
  const closePokedexFullWarning = useGameStore(
    (state) => state.closePokedexFullWarning,
  );

  useEffect(() => {
    if (isPokedexFullWarning) {
      const timer = setTimeout(() => closePokedexFullWarning(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPokedexFullWarning, closePokedexFullWarning]);

  if (!isPokedexFullWarning) return null;

  return (
    <img
      src="/pokedex-cheia.png"
      alt="Pokédex cheia! Libere espaço na sua Pokédex antes de capturar outro Pokémon."
      className="absolute"
      style={{
        left: playerPosition.x + 32,
        top: playerPosition.y + 60,
        transform: "translateX(-50%)",
        width: 220,
      }}
    />
  );
}

export default PokedexFullWarning;
