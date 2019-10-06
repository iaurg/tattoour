import React from 'react';
import Routes from './routes';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Tattoour"/>
      <div className="content">
        <Routes></Routes>        
      </div>
    </div>
  );
}

export default App;
