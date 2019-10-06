import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots(){
      const user_id = localStorage.getItem("user");
      const response = await api.get('/dashboard', {
        headers: {user_id}
      })
      setSpots(response.data)
    }
    loadSpots();
  } ,[])

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage:`url(${spot.thumbnail_url})` }}></header>
            <strong>{spot.studio}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
          </li>          
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo studio</button>
      </Link>
    </>
  );
}
