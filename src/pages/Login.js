import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [isLogin, setIsLogin] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    const response = await api.get(`/users/${email}`);

    //const { id } = response.data;

    history.push(`/main`);
  }

  async function handleRegister(e) {
    e.preventDefault();

    const response = await api.post(`/users`,{
      name,
      email
    });

    //const { id } = response.data;

    history.push(`/main`);
  }

  async function handleForm() {
    setIsLogin(!isLogin);
  }

  if(!isLogin){
    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <img src={logo} alt="BSB-Eats"/>
          <h1>Login</h1>
          <input 
            placeholder="Digite seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit">Enviar</button>
          <p onClick={ handleForm }>Clique aqui para cadastrar um novo usuário</p>
        </form>
      </div>
    )
  } else {
    return (
      <div className="login-container">
        <form onSubmit={handleRegister}>
          <img src={logo} alt="BSB-Eats"/>
          <h1>Registro</h1>
          <input 
            placeholder="Digite seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            placeholder="Digite seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit">Enviar</button>
          <p onClick={ handleForm }>Clique aqui se você já possui um login</p>
        </form>
      </div> 
    )
  }
}