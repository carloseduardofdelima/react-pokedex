import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import PokemonCard from '../../components/PokemonCard';

import './style.css';
import logo from '../../img/pokeball.png';


export default function PokemonList () {
    
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

    //Promise.all retona o array só após todas as requisiçôes
    //Traz as requisicoes na ordem
    let info_pokemon = await Promise.all(data.map( async pokemon => {
      let pokeData = await api.get(`pokemon/${pokemon.name}`);
      return pokeData.data;
    }));

    setPokemons(info_pokemon);
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
          <li><a href="/">Home</a></li>
          <li><a href="/">Sobre</a></li>
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
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonCard id={pokemon.id} name={pokemon.name} types={pokemon.types} />
            </Link>
            )
          })}
          
        </ul>
        <footer>
          <p>© 2020 <a href="https://github.com/carloseduardofdelima">Carlos Eduardo</a>. Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </footer>
      </div>
    </div>
  );
}