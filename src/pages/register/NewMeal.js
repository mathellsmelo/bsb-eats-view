import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function NewMeal({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [idRestaurant, setIdRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function loadRestaurants() {
      const response = await api.get('/restaurants');

      setRestaurants(response.data);
    }

    loadRestaurants();
  }, []);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('name', name);
    data.append('price', price);
    data.append('restaurant_id', idRestaurant);

    await api.post('/meals', data);

    history.push(`/restaurant/${idRestaurant}`);
  }

  function getIdRestaurant(e) {
    const selectedIndex = e.target.options.selectedIndex;
    const id = e.target.options[selectedIndex].getAttribute('data-key');
    console.log(id);
    setIdRestaurant(id);
  }

  return (
    <div className="form-style-5">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend><span className="number">2</span> Cadastro de Refeições</legend>
          <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="meal">Nome: *</label>
          <input 
            id="name"
            type="text"
            name="field1"
            placeholder="O nome da sua refeição"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="price">Preço da refeição: * <span>(em branco para GRATUITO)</span></label>
          <input 
            id="price"
            type="number"
            placeholder="Valor cobrado pela refeição"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />

            <div>
                <select onChange={event => getIdRestaurant(event)}>
                    <option key={0} data-key={0} value={'---'}></option>
                    {restaurants.map((restaurant, key) => 
                        <option key={key} data-key={restaurant.id} value={restaurant.name}>
                        {restaurant.name}
                        </option>
                    )}
                </select>
            </div>

          <button type="submit" className="btn">Cadastrar</button>
        </fieldset>
      </form>
    </div>
  )
}