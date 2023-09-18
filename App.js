import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'q2uFRkbKAVftxi_L2RgkS5k5rld2Mkp4g83XRUwtG-Y';
const BASE_URL = 'https://api.unsplash.com';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState(''); // Estado para armazenar a consulta de pesquisa

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/search/photos?client_id=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        setPhotos(data.results);
      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
      }
    };

    fetchPhotos();
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

      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img
              src={photo.urls.small} // Usar "small" para imagens menores
              alt={photo.alt_description || 'Photo'}
              className="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
