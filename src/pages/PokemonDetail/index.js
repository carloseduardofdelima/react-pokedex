import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        api.get(`/pokemon/${id}`)
        .then(response => {
            setPokemon(response.data);
            console.log(response.data)
    });

  }, []);

  function goBack() {
    navigate.push('/');
  }

    

    return (
     <div className="detail">
       <header className="detail-header">
         <h1>Pokedex</h1>
         <h2>{`No. ${pokemon.id}`}</h2>
       </header>

       <button id="back-button" onClick={goBack}><FaArrowLeft />Back</button>
       
        <div className="pokemon-detail">
          <img id="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="pokemon"/>
          <ul className="info">
          <li>{`Name: ${pokemon.name}`}</li>
          <li>{`Height: ${pokemon.height}`}</li>
          <li>{`Weight: ${pokemon.weight}`}</li>
          <li>{`Base Experience: ${pokemon.base_experience}`}</li>
          </ul>
        </div>
     </div>
    )
};