import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList({ pokemon }) {
  const [pokePic, setPokePic] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
      .then((res) => {
        setPokePic(res.data.sprites.front_default);
      });
  }, [pokemon]);

  return (
    <div className="pokemon-card">
      {pokemon.name}
      <br />
      <img src={pokePic} />
    </div>
  );
}

export default PokemonList;
