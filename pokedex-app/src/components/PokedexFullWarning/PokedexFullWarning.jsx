import { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

function PokedexFullWarning () {
    const isPokedexFullWarning = useGameStore((state) => state.isPokedexFullWarning);
    const playerPosition = useGameStore((state) => state.playerPosition);
    const closePokedexFullWarning = useGameStore((state) => state.closePokedexFullWarning);

    useEffect(() => {
        if (isPokedexFullWarning) {
            const timer = setTimeout (() => closePokedexFullWarning(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isPokedexFullWarning, closePokedexFullWarning]);

    if (!isPokedexFullWarning) return null;

    return (
        <div
        className="absolute bg-blue-50 border border-blue-400 text-blue-900 text-sm px-4 py-3 rounded-lg shadow-lg text-center max-w-xs"
        style={{
            left: playerPosition.x + 32,
            top: playerPosition.y -70,
            transform: 'translateX(-50%)',
        }} 
        >
        <strong>Pokédex cheia!</strong>
        <br />
        Libere espaço na sua Pokédex antes de capturar outro Pokémon.
        </div>
    );

}

export default PokedexFullWarning;
