import React, { useState } from 'react';
import api from '../../services/api';


// import { Container } from './styles';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event){
    event.preventDefault();
    const response = await api.post('/sessions', {email});
    const { _id } = response.data;
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }
  
  return (
    <>
    <p>
      Ofereça <strong>spots</strong> para tatuadores e traga <strong>talentos</strong> para seu estudio
    </p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail *</label>
      <input type="email" name="email" id="email" placeholder="Seu e-mail" value={email} onChange={event => setEmail(event.target.value)}/>

      <button className="btn" type="submit">Entrar</button>
    </form>
    </>
  );
}
