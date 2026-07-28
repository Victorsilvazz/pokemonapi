export const INITIAL_POSITION = { x: 924, y: 470 };
export const MAP_WIDTH = 1920;
export const MAP_HEIGHT = 1080;

export const QUADRANTS = {
    grama: {
        position: { x: 676, y: 180 },
        types: ['bug', 'flying', 'electric'],
    },
    cemiterio: {
        position: { x:1385, y: 135 },
        types: ['ghost', 'psychic'],
    },
    agua: {
        position: { x: 628, y: 575 },
        types: ['water', 'ice'],
    },
    caverna: {
        position: { x: 1383, y: 720 },
        types: ['rock', 'ground', 'fire'],
    },
};

export function getQuadrantFromClick(x, y) {
const isLeft = x < MAP_WIDTH / 2;
const isTop = y < MAP_HEIGHT / 2;

if (isTop && isLeft) return 'grama';
if (isTop && !isLeft) return 'cemiterio';
if (!isTop && isLeft) return 'agua';
return 'caverna'
}