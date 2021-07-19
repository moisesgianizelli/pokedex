import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [lastPage, setLastPage] = useState(); //variavel

  useEffect(async () => {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=' + currentPage * 20,
    );
    // parseInt(setLastPage,10)
    //console.log(response.data.count / 20);

    setLastPage(parseInt(response.data.count / 20, 10));

    const pokemons2 = [];
    for (const pokemon of response.data.results) {
      const response2 = await axios.get(pokemon.url);
      pokemons2.push(response2.data);
    }

    setPokemons(pokemons2);
  }, [currentPage]);

  return (
    <div className="App">
      {selectedPokemon ? (
        <div PokemonCard></div>
      ) : (
        <>
          {pokemons.map((pokemon) => (
            <div
              onClick={() => {
                setSelectedPokemon(pokemon);
              }}
            >
              <p>{pokemon.name}</p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          ))}
          <div className="page-buttons">
            <button
              onClick={() => {
                if (currentPage == 0) {
                  return;
                }
                setCurrentPage(currentPage - 1);
              }}
              className="previous"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (currentPage === lastPage) {
                  return;
                }
                setCurrentPage(currentPage + 1);
              }}
              className="next"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
