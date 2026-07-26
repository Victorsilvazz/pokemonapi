import { useGameStore } from '../../store/gameStore'
import { MAP_WIDTH, MAP_HEIGHT, getQuadrantFromClick } from '../../data/mapLayout';

function GameMap() {
       const playerPosition = useGameStore((state) => state.playerPosition);
       const isPlayervisible = useGameStore((state) => state.isPlayervisible);
       const goToQuadrant = useGameStore((state) => state.goToQuadrant);

       function handleMapClick(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const quadrantName = getQuadrantFromClick(clickX, clickY);
        goToQuadrant(quadrantName);
       }

    return (
        <div
        onClick={handleMapClick}
        className="relative cursor-pointer"
        style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/mapa.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
        >
      <img
      src="/ash.png"    
      alt="Ash"
      className="absolute transition-all duration-300"
      style={{
        width:64,
        height:64,
        left: playerPosition.x,
        top: playerPosition.y,
      }}
      />
     </div> 
    );
}

export default GameMap;