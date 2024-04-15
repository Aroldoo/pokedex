import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./Components/PokemonThumbnail";

function App() {
    const [kantoPokemons, setKantoPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
    const [addedPokemonIds, setAddedPokemonIds] = useState(new Set());

    const fetchKantoPokemons = async (url) => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setNextPage(data.next);
            const kantoPokemonData = await Promise.all(data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const pokemonData = await res.json();
                if (pokemonData.id <= 151 && !addedPokemonIds.has(pokemonData.id)) { // Check for Kanto Pokemon (IDs 1-151) and avoid duplicates
                    setAddedPokemonIds((prevIds) => new Set(prevIds.add(pokemonData.id)));
                    return pokemonData;
                } else {
                    return null;
                }
            }));
            setKantoPokemons((prevPokemons) => [...prevPokemons, ...kantoPokemonData.filter(Boolean)]);
        } catch (error) {
            console.error("Error fetching Kanto Pokemon:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKantoPokemons(nextPage);
    }, [nextPage]);

    return (
        <div className="app-container">
            <h1>Pokemon Kingdom</h1>
            <div className="pokemon-container">
                <div className="all-container">
                    {kantoPokemons.map((pokemon) => (
                        <PokemonThumbnail
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.sprites.other.dream_world.front_default}
                            type={pokemon.types[0].type.name}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            stats={pokemon.stats}
                        />
                    ))}
                </div>
                {loading && <p>Loading...</p>}
                {!loading && nextPage && (
                    <button className="load-more" onClick={() => fetchKantoPokemons(nextPage)}>
                        Load More Kanto Pokemons
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
