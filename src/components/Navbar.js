import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar__logo">
        <img src="/images/logo.png" alt="Logo" />
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
          <Link to="/inventario">Inventario</Link>
        </li>
      </ul>
      <div className="navbar__search">
        <input type="text" placeholder="¿Qué estás buscando?..." />
        <FaSearch className="navbar__search-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
