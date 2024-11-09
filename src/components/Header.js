import React, { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaSearch, FaBars, FaUser } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import '../styles/Header.css';

function Header({ onCartClick }) {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        {/* Menú de hamburguesa para móviles */}
        <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Menú">
          <FaBars />
        </button>
        
        {/* Redes sociales */}
        <div className="header__socials">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/emporiomilahuen/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>

        {/* Logo */}
        <div className="header__logo">
          <img src="/images/logo.png" alt="Milahuén Logo" className="header__logo-image" />
        </div>

        {/* Acciones (carrito y login) */}
        <div className="header__actions">
          <button aria-label="Carrito" className="header__cart-button" onClick={onCartClick}>
            <FaShoppingCart />
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </button>
          {/* Icono de login (persona) visible en todas las resoluciones */}
          <FaUser className="header__login-icon" aria-label="Login" />
        </div>
      </header>

      {/* Navbar solo visible en pantallas grandes */}
      <Navbar />

      {/* Menú móvil que se muestra al hacer clic en el botón hamburguesa */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="/" onClick={toggleMobileMenu}>Inicio</a>
          <a href="/productos" onClick={toggleMobileMenu}>Productos</a>
          <a href="/sustentabilidad" onClick={toggleMobileMenu}>Sustentabilidad</a>
          <a href="/contacto" onClick={toggleMobileMenu}>Contacto</a>
        </div>
      )}
    </>
  );
}

export default Header;
