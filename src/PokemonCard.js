import React from 'react';
import axios from 'axios';

const PokemonCard = ({ pokemon }) => {
  return (
    <div>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
