import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'q2uFRkbKAVftxi_L2RgkS5k5rld2Mkp4g83XRUwtG-Y';
const BASE_URL = 'https://api.unsplash.com';

const App = () => {
  const [fotos, setFotos] = useState([]);
  const [query, setQuery] = useState(''); 

  useEffect(() => {
    const buscarFotos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/search/photos?client_id=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        setFotos(data.results);
      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
      }
    };

    buscarFotos();
  }, [query]);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="app">
      <img src="https://i.imgur.com/VStxduv.png" alt="Logo" className="logo" />

      <div className="search">
        <input
          type="text"
          placeholder="Pesquisar fotos..."
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <div className="foto-grid">
        {fotos.map((foto) => (
          <div key={foto.id} className="foto">
            <a
              href={foto.urls.full} 
              download={`${foto.id}.jpg`} 
              className="download-link"
            >
              <img
                src={foto.urls.small} 
                alt={foto.alt_description || 'Photo'}
                className="image"
              />
            </a>
          </div>
        ))}
      </div>
      
      <footer className="footer">
        {'Site desenvolvido por Twelve Gallery'}
      </footer>
    </div>
  );
};

export default App;