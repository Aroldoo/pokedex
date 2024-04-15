import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeApi = () => {
    // Estado para armazenar a lista de Pokémon
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        // Função para buscar a lista de Pokémon
        const fetchPokemonList = async () => {
            try {
                // Usando Axios para fazer uma solicitação GET para a PokeAPI
                // Este endpoint retorna uma lista dos primeiros Pokémon disponíveis
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
                setPokemonList(response.data.results); // Armazena a lista de Pokémon no estado
            } catch (error) {
                console.error("Erro ao buscar a lista de Pokémon:", error);
            }
        };

        fetchPokemonList();
    }, []); // O array vazio indica que este efeito não depende de nenhuma variável de estado e deve ser executado apenas uma vez após a montagem do componente.

    // Renderiza a lista de Pokémon, se disponível
    return (
        <div>
            <h1>Lista de Pokémon</h1>
            {pokemonList.length > 0 ? (
                <ul>
                    {pokemonList.map(pokemon => (
                        <li key={pokemon.name}>{pokemon.name}</li> // Chave e nome do Pokémon
                    ))}
                </ul>
            ) : (
                <div>Carregando...</div> // Estado de carregamento
            )}
        </div>
    );
};

export default PokeApi;
