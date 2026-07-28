function PokedexEmptyState() {
    return (
        <div className="flex justify-center py-4">
        <img
        src="/pokedex-vazia.png"
        alt="Sua Pokédex está vazia. Explore o mapa e capture seu primeiro Pokémon para começar sua coleção."
        className="w-64"
        />
        </div>
    );
}

export default PokedexEmptyState;