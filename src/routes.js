import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import NewRestaurant from './pages/register/NewRestaurant';
import NewMeal from './pages/register/NewMeal';
import Restaurant from './pages/Restaurant';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/cadastro-restaurante" component={NewRestaurant} />
        <Route path="/restaurant/:id" component={Restaurant} />
        <Route path="/cadastro-refeicao" component={NewMeal} />
      </Switch>
    </BrowserRouter>
  );
}