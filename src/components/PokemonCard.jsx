// src/components/PokemonCard.js
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="pokemon-card-inner">
        <h3>{pokemon.name}</h3>
        <p>ID: {pokemon.id}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
