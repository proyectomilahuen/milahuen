import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

// Datos estáticos proporcionados
const rows = [
  { name: 'Almendras', category: 'frutos-secos', price: 5000 },
  { name: 'Nueces', category: 'frutos-secos', price: 4000 },
  { name: 'Maní tostado', category: 'frutos-secos', price: 3000 },
  { name: 'Coco laminado', category: 'frutos-secos', price: 4500 },
  { name: 'Cranberris', category: 'frutos-secos', price: 5500 },
  { name: 'Ciruela sin cuesco', category: 'frutos-secos', price: 6000 },
  { name: 'Chía', category: 'semillas', price: 2000 },
  { name: 'Linaza', category: 'semillas', price: 2500 },
  { name: 'Pepas de zapallo', category: 'semillas', price: 4000 },
  { name: 'Maravilla pelada', category: 'semillas', price: 3500 },
  { name: 'Avena integral', category: 'cereales-integrales', price: 3000 },
  { name: 'Arroz integral', category: 'cereales-integrales', price: 4500 },
  { name: 'Quínoa', category: 'cereales-integrales', price: 5000 },
  { name: 'Lentejas rojas', category: 'legumbres', price: 3000 },
  { name: 'Lentejas baby', category: 'legumbres', price: 3200 },
  { name: 'Porotos rojos', category: 'legumbres', price: 4000 },
  { name: 'Mantequilla de maní', category: 'envasados', price: 8000 },
  { name: 'Mix Puesco', category: 'envasados', price: 6000 },
  { name: 'Mix Lahuén', category: 'envasados', price: 7000 },
  { name: 'Mix Murta', category: 'envasados', price: 6500 },
];

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term) {
      setFilteredResults([]);
      return;
    }

    const results = rows.filter((row) =>
      row.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredResults(results);
  };

  const handleResultClick = (category) => {
    setSearchTerm('');
    setFilteredResults([]);
    navigate(`/${category}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar__logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar__links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li
          className="navbar__link-dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={closeDropdown}
        >
          <Link to="/productos">Productos</Link>
          {isDropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-column">
                <Link to="/frutos-secos">Frutos Secos</Link>
                <Link to="/semillas">Semillas</Link>
                <Link to="/cereales-integrales">Cereales Integrales</Link>
              </div>
              <div className="dropdown-column">
                <Link to="/legumbres">Legumbres</Link>
                <Link to="/envasados">Envasados</Link>
              </div>
              <div className="dropdown-column">
                <Link to="/nuevos-productos">Nuevos Productos</Link>
                <Link to="/mas-vendidos">Más Vendidos</Link>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link to="/sustentabilidad">Sustentabilidad</Link>
        </li>
        <li>
          <Link to="/nosotros">¿Quiénes somos?</Link>
        </li>
        <li>
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
        </li>
      </ul>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="¿Qué estás buscando?..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FaSearch className="navbar__search-icon" />
        {filteredResults.length > 0 && (
          <div className="navbar__search-results">
            {filteredResults.map((item) => (
              <div
                key={item.name}
                className="search-result-item"
                onClick={() => handleResultClick(item.category)}
              >
                <span className="search-result-name">{item.name}</span>
                <span className="search-result-price">${item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
