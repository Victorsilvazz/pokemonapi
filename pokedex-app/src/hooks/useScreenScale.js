import { useState, useEffect } from 'react';

function calculateScale(mapWidth, mapHeight) {
    const scaleX = window.innerWidth / mapWidth;
    const scaleY = window.innerHeight / mapHeight

    return Math.min(scaleX, scaleY);

}

export function useScreenScale(mapWidth, mapHeight) {
    const [scale, setScale] = useState(() => calculateScale(mapWidth, mapHeight));

    useEffect(() => {
        function handleResize() {
            setScale(calculateScale(mapWidth, mapHeight));
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        }, [mapWidth, mapHeight]);

        return scale;
}