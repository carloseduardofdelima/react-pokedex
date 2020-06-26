import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './App.css';

import api from './services/api';

import logo from './img/pokeball.png';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/pokemon?limit=20')
    .then(response => {
      loadInfo(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
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

  async function goPrevPage() {
    if (prevPage === null) {
      return;
    }

    await api.get(prevPage)
    .then(response => {
      setPokemons([]);
      loadInfo(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    });

  };

  async function goNextPage() {
    await api.get(nextPage)
    .then(response => {
      setPokemons([]);
      loadInfo(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
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

      <nav>
      <button onClick={goPrevPage}><FaChevronLeft /></button>
      <button onClick={goNextPage}><FaChevronRight /></button>
      </nav>

        <ul className="pokemon-list">

          {pokemons.length === 0 ? <h1>Loading...</h1> : pokemons.map(pokemon => {
            return (
              <li key={pokemon.id} className="pokemon-card">
              <h2>{`#${pokemon.id}`}</h2>
              <img id="pokemon_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="#"/>
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <div className="types">{pokemon.types.map(types => <span className={types.type.name}>{types.type.name}</span>)}</div>
              </li>
            )
          })};
        

        </ul>
      </div>
    </div>
  );
}

export default App;
