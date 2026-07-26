import { create } from 'zustand';
import { QUADRANTS } from '../data/mapLayout';
import { getRandomPokemonByType } from '../services/pokeApi'

const MAX_CAPTURED = 6;

export const useGameStore = create((set, get) => ({
    playerPosition: QUADRANTS.grama.position,
    isPlayerVisible: true,

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

        set({isPlayerVisible: false});

        setTimeout(() => {
            set({ playerPosition: quadrant.position, isPlayerVisible: true});
        }, 300);

        setTimeout( async () => {
            set({ isSearching: true});

            const types = quadrant.types;
            const randomType = types [Math.floor(Math.random() * types.length)];
            const pokemon = await getRandomPokemonByType(randomType);

            set({ isSearching: false, encounterPokemon: pokemon });
        }, 600);
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
            capturedPokemons: state.capturedPokemons.filter((p) => p.name !== pokemonName)
            toast: { message: 'Pokemon excluído com sucesso!', type: 'error' },
        }));

        setTimeout(() => set ({ toast: null }), 3000);
    },
    
   goBack() {
    set({ playerPosition: null, isPlayerVisible: false });
    setTimeout(() => {
      set({ playerPosition: QUADRANTS.grama.position, isPlayerVisible: true });      
    }, 300);
   },

   closePokedexFullWarning() {
    set({ isPokedexFullWarning: false });
   },

   togglePokedex() {
    set((state) => ({ isPokedexOpen: !state.isPokedexOpen }));
   },
}));