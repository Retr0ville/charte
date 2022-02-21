import React from 'react';
import './App.css';
import Home from './pages/Home';

const App = () => (
  <div className="">
    <header className="fs-1 fw-bold d-flex align-items-center justify-content-center py-2 mb-4 w-100">

      <a className="img-brand" href="/">
        <img src="https://img.icons8.com/nolan/64/movie.png" width="50" height="50" className="d-flex" alt="Kando" />
      </a>
      <div className="brand">
        Charte&trade;
      </div>
    </header>
    <Home />
  </div>
);

export default App;
