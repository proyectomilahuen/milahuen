import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Search = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredItems([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://emporio-milahuen.onrender.com/admin/api/product/?q=${searchTerm}`
      );

      // Asegúrate de que response.data sea un array
      const results = Array.isArray(response.data) ? response.data : [];
      setFilteredItems(results);
    } catch (err) {
      console.error("Error al buscar productos:", err);
      setError("Hubo un error al buscar productos. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="search-results">
        {isLoading && <p>Cargando resultados...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="search-item">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>
          ))
        ) : (
          !isLoading && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
