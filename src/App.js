import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import PokemonList from './PokemonList';

//https://pokeapi.co/api/v2/pokemon

function App() {
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon',
  );
  const [pokemon, setPokemon] = useState([]);
  const [nextBtnUrl, setNextBtnUrl] = useState();
  const [prevBtnUrl, setPrevBtnUrl] = useState();

  useEffect(() => {
    axios.get(currentPageUrl).then((res) => {
      setNextBtnUrl(res.data.next);
      setPrevBtnUrl(res.data.previous);

      setPokemon(res.data.results);
    });
  }, [currentPageUrl]);

  const Pagination = (e) => {
    if (e.target.textContent === 'Next') {
      setCurrentPageUrl(nextBtnUrl);
    }
    if (e.target.textContent === 'Previous') {
      setCurrentPageUrl(prevBtnUrl);
    }
  };

  return (
    <div className="App">
      {pokemon.map((pokemon) => (
        <PokemonList pokemon={pokemon} />
      ))}
      <div className="page-buttons">
        <button onClick={Pagination} className="previous">
          Previous
        </button>

        <button onClick={Pagination} className="next">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
