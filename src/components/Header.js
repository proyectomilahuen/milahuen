import React, { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaBars, FaUser, FaTimes, FaChevronDown } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ onCartClick }) {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setProductsDropdownOpen(false);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!isProductsDropdownOpen);
  };

  return (
    <>
      <header className="header">
        <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Menú">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
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
          <button aria-label="Carrito" className="header__cart-button" onClick={onCartClick}>
            <FaShoppingCart />
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </button>
          <Link to="/login">
            <FaUser className="header__login-icon" aria-label="Login" />
          </Link>
        </div>
      </header>

      <Navbar />

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="close-menu" onClick={toggleMobileMenu} aria-label="Cerrar menú">×</button>
          <a href="/" onClick={toggleMobileMenu}>Inicio</a>
          
          <div className="mobile-menu__divider-top"></div>
          
          <div onClick={toggleProductsDropdown} className="mobile-menu__dropdown">
            Productos
            <FaChevronDown className="dropdown-arrow" />
          </div>
          
          {isProductsDropdownOpen && (
            <div className="mobile-menu__dropdown-content">
              <a href="/frutos-secos" onClick={toggleMobileMenu}>Frutos Secos</a>
              <a href="/semillas" onClick={toggleMobileMenu}>Semillas</a>
              <a href="/cereales-integrales" onClick={toggleMobileMenu}>Cereales Integrales</a>
              <a href="/legumbres" onClick={toggleMobileMenu}>Legumbres</a>
              <a href="/envasados" onClick={toggleMobileMenu}>Envasados</a>
            </div>
          )}
          
          <div className="mobile-menu__divider-bottom"></div>
          
          <a href="/sustentabilidad" onClick={toggleMobileMenu}>Sustentabilidad</a>
          <a href="/nosotros" onClick={toggleMobileMenu}>Nosotros</a>
        </div>
      )}
    </>
  );
}

export default Header;
