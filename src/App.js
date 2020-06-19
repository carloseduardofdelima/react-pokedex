import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'
import './App.css';

import api from './services/api';

import logo from './img/pokeball.png';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/pokemon?limit=20')
    .then(response => {
      loadInfo(response.data.results);
    });

  }, []);

  async function loadInfo(data) {

    let info_pokemon = await data.map( async pokemon => {
      let pokeData = await api.get(`pokemon/${pokemon.name}`)
      .then(response => {
        setPokemons(pokemons => [...pokemons, response.data]);
      });
    });
  };

  function handleSearch(e) {
    let input = e.target.value;
    setSearch(input);
  };

  async function searchPokemon() {
    await api.get(`pokemon/${search}`)
    .then(response => {
      setPokemons([response.data]);
    });

  };


  return (
    <div className="App">
      <header>
        <img src={logo} alt="pokebola" id="pokeball"/>
        <h2>Pokedex</h2>

        <label>
        <FaSearch id="search_icon" onClick={searchPokemon}/>
        <input type="text" name="pokemon" placeholder="Busque" onChange={handleSearch}/>
        </label>
        
        <ul className="navbar">
          <li><a href="#">Home</a></li>
          <li><a href="#">Sobre</a></li>
        </ul>
        
      </header>

      <div className="main">
      <h2>Pokemons</h2>

        <ul className="pokemon-list">

          {pokemons.map(pokemon => {
            return (
              <li key={pokemon.id} className="pokemon-card">
              <h2>{`#${pokemon.id}`}</h2>
              <img id="pokemon_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="#"/>
              <h2>{pokemon.name}</h2>
              <h2 className="types">{pokemon.types.map(types => `${types.type.name} `)}</h2>
              </li>
            )
          })}
        

        </ul>
      </div>
    </div>
  );
}

export default App;
