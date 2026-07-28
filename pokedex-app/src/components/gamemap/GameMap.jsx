import { useGameStore } from '../../store/gameStore'
import { MAP_WIDTH, MAP_HEIGHT, getQuadrantFromClick } from '../../data/mapLayout';
import SearchBalloon from '../SearchBalloon/SearchBalloon';
import EncounterModal from '../EncounterModal/EncounterModal';
import PokedexFullWarning from '../PokedexFullWarning/PokedexFullWarning';
import PokedexButton from '../PokedexButton/PokedexButton';
import PokedexModal from '../PokedexModal/PokedexModal';
import Toast from '../Toast/Toast';

function GameMap() {
       const playerPosition = useGameStore((state) => state.playerPosition);
       const isPlayerVisible = useGameStore((state) => state.isPlayerVisible);
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
      className={`absolute transition-all duration-300 ${isPlayerVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width:64,
        height:64,
        left: playerPosition.x,
        top: playerPosition.y,
      }}
      />
      <SearchBalloon />
      <PokedexFullWarning />
      <EncounterModal />
      <PokedexButton />
      <PokedexModal />
      <Toast />
     </div> 
    );

}

export default GameMap;