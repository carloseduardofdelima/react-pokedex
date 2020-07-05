import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

export default function Routes() {
    return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={PokemonList} />
        <Route path="/pokemon/:id" component={PokemonDetail} />
    </Switch>
    </BrowserRouter>
    )
}