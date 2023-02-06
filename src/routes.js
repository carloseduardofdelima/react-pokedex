import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

export default function Rotas() {
    return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<PokemonList/>} />
        <Route path="/pokemon/:id" element={<PokemonDetail/>} />
    </Routes>
    </BrowserRouter>
    )
}