import { useGameStore } from '../../store/gameStore';

function SearchBalloon() {
    const isSearching = useGameStore((state) => state.isSearching);
    const playerPosition = useGameStore((state) => state.playerPosition);

    if (!isSearching) return null;

    return (
        <img
        src="/balao.png"
        alt="Procurando Pokémon..."
        className="absolute"
        style={{
            left: playerPosition.x + 26,
            top: playerPosition.y +60,
            transform: 'translateX(-50%)',
            width: 180,
        }}
        />
    );
}

export default SearchBalloon;