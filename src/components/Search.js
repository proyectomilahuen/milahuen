import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Search = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

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

      const results = Array.isArray(response.data) ? response.data : [];
      setFilteredItems(results);
      setSearchOpen(true);
    } catch (err) {
      console.error("Error al buscar productos:", err);
      setError("Hubo un error al buscar productos. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef}>
      <Navbar onSearch={handleSearch} />
      {isSearchOpen && (
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
      )}
    </div>
  );
};

export default Search;
