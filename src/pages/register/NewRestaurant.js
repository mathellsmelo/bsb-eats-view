import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function NewRestaurant({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('name', name);
    data.append('email', email);
    data.append('price', price);

    await api.post('/restaurants', data);

    history.push('/main');
  }

  return (
    <div className="form-style-5">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend><span className="number">1</span> Cadastro de Restaurantes</legend>
          <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="restaurant">Nome: *</label>
          <input 
            id="name"
            type="text"
            name="field1"
            placeholder="O nome do seu restaurante"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="techs"> Email: *</label>
          <input 
            id="email"
            name="field2"
            type="email"
            placeholder="Email para contato dos clientes"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <label htmlFor="price">Taxa de Entrega: * <span>(em branco para GRATUITO)</span></label>
          <input 
            id="price"
            type="number"
            placeholder="Valor cobrado por entrega"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
          <button type="submit" className="btn">Cadastrar</button>
        </fieldset>
      </form>
    </div>
  )
}