import { create } from 'zustand';
import { QUADRANTS, INITIAL_POSITION } from '../data/mapLayout';
import { getRandomPokemonByType } from '../services/pokeApi'

const MAX_CAPTURED = 6;

export const useGameStore = create((set, get) => ({
    playerPosition: INITIAL_POSITION,
    isPlayerVisible: true,
    currentQuadrant: null,

    isSearching: false,
    encounterPokemon: null,
    isPokedexFullWarning: false,

    capturedPokemons: [],
    isPokedexOpen:false,

    toast: null,

    async goToQuadrant(quadrantName) {
        const quadrant = QUADRANTS[quadrantName];

        if (get().capturedPokemons.length >= MAX_CAPTURED) {
            set({isPokedexFullWarning: true});
            return;
        }

        set({isPlayerVisible: false, currentQuadrant: quadrantName });

        setTimeout(() => {
            set({ playerPosition: quadrant.position, isPlayerVisible: true});
        }, 300);

        setTimeout(() => {
            get().searchPokemon();
        }, 600);
    },

    async searchPokemon() {
        const quadrantName = get().currentQuadrant;
        const quadrant = QUADRANTS[quadrantName];

        set({ isSearching: true, encounterPokemon: null });

        const types = quadrant.types;
        const randomType = types[Math.floor(Math.random() * types.length)];
        const pokemon = await getRandomPokemonByType(randomType);

        set({ isSearching: false, encounterPokemon: pokemon});
    },
    
        capturePokemon() {
        const pokemon = get().encounterPokemon;
        if (!pokemon) return;

        set ((state) => ({
            capturedPokemons: [...state.capturedPokemons, pokemon],
            encounterPokemon: null,
            toast: { message: 'Pokemon capturado com sucesso!', type: 'success'},
        }));

        setTimeout(() => set({ toast: null }), 3000);           
    },

    removePokemon(pokemonName) {
        set((state) => ({
            capturedPokemons: state.capturedPokemons.filter((p) => p.name !== pokemonName),
            toast: { message: 'Pokemon excluído com sucesso!', type: 'error' },
        }));

        setTimeout(() => set ({ toast: null }), 3000);
    },
    
   goBack() {
    set({ playerPosition: null, isPlayerVisible: false });
    setTimeout(() => {
      set({ playerPosition: INITIAL_POSITION, isPlayerVisible: true, currentQuadrant: null });      
    }, 300);
   },

   closePokedexFullWarning() {
    set({ isPokedexFullWarning: false });
   },

   togglePokedex() {
    set((state) => ({ isPokedexOpen: !state.isPokedexOpen }));
   },
}));