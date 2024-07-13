// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import PokemonList from './components/PokemonList';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const pokemonPromises = response.data.results.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);
        return pokemonResponse.data;
      });
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemons(pokemonData);
    };
    fetchPokemons();
  }, []);

  const handleSearch = () => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(results);
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <PokemonList pokemons={filteredPokemons.length > 0 ? filteredPokemons : pokemons} />
    </div>
  );
};

export default App;
