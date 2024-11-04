import React, { useContext } from 'react';
import '../styles/Header.css';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

function Header({ onCartClick }) {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
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
      <div className="header__logo">
        <img src="/images/logo.png" alt="Milahuén Logo" className="header__logo-image" />
      </div>
      <div className="header__actions">
        <button aria-label="Buscar">
          <FaSearch />
        </button>
        <button aria-label="Carrito" className="header__cart-button" onClick={onCartClick}>
          <FaShoppingCart />
          {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
        </button>
        <button className="header__login-button">Iniciar Sesión</button>
      </div>
    </header>
  );
}

export default Header;
