export const INITIAL_POSITION_LANDSCAPE = { x: 922, y: 545 };
export const MAP_WIDTH_LANDSCAPE = 1920;
export const MAP_HEIGHT_LANDSCAPE = 1080;
export const MAP_IMAGE_LANDSCAPE = '/mapa.png';

export const QUADRANTS_LANDSCAPE = {
    grama: {
        position: { x: 657, y: 220 },
        types: ['bug', 'flying', 'electric'],
    },
    cemiterio: {
        position: { x:1418, y: 170 },
        types: ['ghost', 'psychic'],
    },
    agua: {
        position: { x: 605, y: 650 },
        types: ['water', 'ice'],
    },
    caverna: {
        position: { x: 1418, y: 800 },
        types: ['rock', 'ground', 'fire'],
    },
};

export const MAP_WIDTH_PORTRAIT = 1080;
export const MAP_HEIGHT_PORTRAIT = 1920;
export const INITIAL_POSITION_PORTRAIT = { x: 507, y: 1000};
export const MAP_IMAGE_PORTRAIT = '/mapa-retrato.png';

export const QUADRANTS_PORTRAIT = {
    grama: {
        position: { x: 354, y: 435 },
        types: ['bug', 'flying', 'electric'],
    },
    cemiterio: {
        position: { x: 783, y: 321 },
        types: ['ghost', 'psychic'],
    },
    agua: {
        position: { x:324, y: 1210 },
        types: ['water', 'ice'],
    },
    caverna: {
        position: { x: 782, y: 1465},
        types: ['rock', 'ground', 'fire'],
    },
};

export function getQuadrantFromClick(x, y, mapWidth, mapHeight) {
const isLeft = x < mapWidth / 2;
const isTop = y < mapHeight / 2;

if (isTop && isLeft) return 'grama';
if (isTop && !isLeft) return 'cemiterio';
if (!isTop && isLeft) return 'agua';
return 'caverna';
}

export function getMapConfig(isPortrait) {
    if (isPortrait) {
        return {
            MAP_WIDTH: MAP_WIDTH_PORTRAIT,
            MAP_HEIGHT: MAP_HEIGHT_PORTRAIT,
            MAP_IMAGE: MAP_IMAGE_PORTRAIT,
            QUADRANTS: QUADRANTS_PORTRAIT,
            INITIAL_POSITION: INITIAL_POSITION_PORTRAIT,
        };
    
}

return {
         MAP_WIDTH: MAP_WIDTH_LANDSCAPE,
         MAP_HEIGHT: MAP_HEIGHT_LANDSCAPE,
         MAP_IMAGE: MAP_IMAGE_LANDSCAPE,
         QUADRANTS: QUADRANTS_LANDSCAPE,
         INITIAL_POSITION: INITIAL_POSITION_LANDSCAPE,
   };
}