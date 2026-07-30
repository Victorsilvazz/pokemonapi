import { useGameStore } from "../../store/gameStore";
import { getMapConfig, getQuadrantFromClick } from "../../data/mapLayout";
import { useOrientation } from "../../hooks/useOrientation";
import { useScreenScale } from "../../hooks/useScreenScale";
import { useEffect } from "react";
import SearchBalloon from "../SearchBalloon/SearchBalloon";
import EncounterModal from "../EncounterModal/EncounterModal";
import PokedexFullWarning from "../PokedexFullWarning/PokedexFullWarning";
import PokedexButton from "../PokedexButton/PokedexButton";
import PokedexModal from "../PokedexModal/PokedexModal";
import Toast from "../Toast/Toast";

function GameMap() {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const isPlayerVisible = useGameStore((state) => state.isPlayerVisible);
  const goToQuadrant = useGameStore((state) => state.goToQuadrant);

  const setOrientation = useGameStore((state) => state.setOrientation);

  const isPortrait = useOrientation();
  const { MAP_WIDTH, MAP_HEIGHT, MAP_IMAGE } = getMapConfig(isPortrait);
  const scale = useScreenScale(MAP_WIDTH, MAP_HEIGHT);

  useEffect(() => {
    setOrientation(isPortrait);
  }, [isPortrait, setOrientation]);

  function handleMapClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / scale;
    const clickY = (event.clientY - rect.top) / scale;

    const quadrantName = getQuadrantFromClick(
      clickX,
      clickY,
      MAP_WIDTH,
      MAP_HEIGHT,
    );
    goToQuadrant(quadrantName);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        onClick={handleMapClick}
        className="relative cursor-pointer flex-shrink-0"
        style={{
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          backgroundImage: `url(${MAP_IMAGE})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <img
          src="/ash.png"
          alt="Ash"
          className={`absolute transition-all duration-300 ${isPlayerVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            width: 64,
            height: 64,
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
    </div>
  );
}

export default GameMap;
