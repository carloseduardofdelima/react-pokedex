import React from 'react';

export default function PokemonCard(props) {
    return (
    
    <li key={props.id} className="pokemon-card">
        <h2>{`#${props.id}`}</h2>
        <img id="pokemon_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt="#"/>
        <h2 className="pokemon-name">{props.name}</h2>
        <div className="types">{props.types.map(types => <span id={types.type.name} className={types.type.name}>{types.type.name}</span>)}</div>
    </li>

    )
};