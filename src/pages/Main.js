import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Main({history}) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function loadRestaurants() {
      const response = await api.get('/restaurants');

      setRestaurants(response.data);
    }

    loadRestaurants();
  }, []);

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="BSB-Eats" />
      </Link>
      { restaurants.length > 0 ? (
        <ul>  
          {restaurants.map(restaurant => (
            <li key={restaurant.id}>
              <img src={restaurant.thumbnail} alt={restaurant.name} />
              <footer>
                <strong>{restaurant.name}</strong> <span>{restaurant.email}</span>
                <p>Taxa de Entrega: {restaurant.delivery_tax ? `R$${restaurant.delivery_tax}` : 'GRATUITO'}</p>
                <button onClick={ () => history.push(`/restaurant/${restaurant.id}`) }>Ver Cardápio</button>
              </footer>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Nenhum restaurante disponível :(</div>
      ) }
    </div>
  )
}