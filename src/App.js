import React, { useState, useEffect } from 'react';
import './App.css';

import api from './api';

import logo from './img/pokeball.png';


function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    api.get('/pokemon?limit=20')
    .then(response => {
      loadInfo(response.data.results);
    });

  }, []);

  function loadInfo(data) {

    let info_pokemon = data.map( async pokemon => {
      let pokeData = await api.get(`pokemon/${pokemon.name}`)
      .then(response => {
        setPokemons(pokemons => [...pokemons, response.data]);
      });
    });

  };


  return (
    <div className="App">
      <header>
        <img src={logo} alt="pokebola" id="pokeball"/>
        <h2>Pokedex</h2>

        <input type="text" name="pokemon" placeholder="Busque"/>
        
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
              <h2>{pokemon.types[0].type.name}</h2>
              </li>
            )
          })}
        

        </ul>
      </div>
    </div>
  );
}

export default App;
