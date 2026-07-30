import { create } from "zustand";
import { getMapConfig } from "../data/mapLayout";
import { getRandomPokemonByType } from "../services/pokeApi";

const MAX_CAPTURED = 6;

function getInitialIsPortrait() {
  if (typeof window === "undefined") return false;
  return window.innerHeight > window.innerWidth;
}

export const useGameStore = create((set, get) => ({
  isPortrait: getInitialIsPortrait(),
  playerPosition: getMapConfig(getInitialIsPortrait()).INITIAL_POSITION,
  isPlayerVisible: true,
  currentQuadrant: null,

  isSearching: false,
  encounterPokemon: null,
  isPokedexFullWarning: false,

  capturedPokemons: [],
  isPokedexOpen: false,

  toast: null,

  searchToken: 0,

  setOrientation(isPortrait) {
    if (get().isPortrait === isPortrait) return;

    const { INITIAL_POSITION } = getMapConfig(isPortrait);

    set((state) => ({
      isPortrait,
      playerPosition: INITIAL_POSITION,
      currentQuadrant: null,
      encounterPokemon: null,
      isSearching: false,
      searchToken: state.searchToken + 1,
    }));
  },

  async goToQuadrant(quadrantName) {
    const { QUADRANTS } = getMapConfig(get().isPortrait);
    const quadrant = QUADRANTS[quadrantName];

    if (get().capturedPokemons.length >= MAX_CAPTURED) {
      set({ isPokedexFullWarning: true });
      return;
    }

    const token = get().searchToken;

    set({ isPlayerVisible: false, currentQuadrant: quadrantName });

    setTimeout(() => {
      if (get().searchToken !== token) return;
      set({ playerPosition: quadrant.position, isPlayerVisible: true });
    }, 300);

    setTimeout(() => {
      if (get().searchToken !== token) return;
      get().searchPokemon(token);
    }, 600);
  },

  async searchPokemon(token) {
    const quadrantName = get().currentQuadrant;
    const { QUADRANTS } = getMapConfig(get().isPortrait);
    const quadrant = QUADRANTS[quadrantName];

    if (get().searchToken !== token) return;

    set({ isSearching: true, encounterPokemon: null });

    const types = quadrant.types;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const MIN_SEARCH_TIME = 2500;

    const [pokemon] = await Promise.all([
      getRandomPokemonByType(randomType),
      new Promise((resolve) => setTimeout(resolve, MIN_SEARCH_TIME)),
    ]);

    if (get().searchToken !== token) return;

    set({ isSearching: false, encounterPokemon: pokemon });
  },

  capturePokemon() {
    const pokemon = get().encounterPokemon;
    if (!pokemon) return;

    set((state) => ({
      capturedPokemons: [...state.capturedPokemons, pokemon],
      encounterPokemon: null,
      toast: { message: "Pokemon capturado com sucesso!", type: "success" },
    }));

    setTimeout(() => set({ toast: null }), 3000);
  },

  removePokemon(pokemonName) {
    set((state) => ({
      capturedPokemons: state.capturedPokemons.filter(
        (p) => p.name !== pokemonName,
      ),
      toast: { message: "Pokemon excluído com sucesso!", type: "error" },
    }));

    setTimeout(() => set({ toast: null }), 3000);
  },

  goBack() {
    set({ encounterPokemon: null, isPlayerVisible: false });
    setTimeout(() => {
      const { INITIAL_POSITION } = getMapConfig(get().isPortrait);
      set({
        playerPosition: INITIAL_POSITION,
        isPlayerVisible: true,
        currentQuadrant: null,
      });
    }, 300);
  },

  closePokedexFullWarning() {
    set({ isPokedexFullWarning: false });
  },

  togglePokedex() {
    set((state) => ({ isPokedexOpen: !state.isPokedexOpen }));
  },
}));
