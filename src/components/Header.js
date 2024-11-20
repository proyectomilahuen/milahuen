import React, { useContext, useState, useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaBars, FaUser, FaTimes, FaChevronDown } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header({ onCartClick }) {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null); // Referencia para el menú de perfil
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Detecta clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setProductsDropdownOpen(false);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
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

          <div ref={profileRef} className="header__profile">
            <FaUser className="header__login-icon" aria-label="Login" onClick={toggleProfileMenu} />
            {isProfileOpen && (
              <div className="header__profile-menu">
                {user ? (
                  <>
                    <p className="profile-menu-item greeting">Hola, {user.username}</p>

                    {user.username === "pingeso" && (
                      <Link to="/inventario" className="profile-menu-item">
                        Inventario
                      </Link>
                    )}

                    <Link to="/perfil" className="profile-menu-item">
                      Mi Perfil
                    </Link>
                    <Link to="/pedidos" className="profile-menu-item">
                      Mis Pedidos
                    </Link>
                    <button className="profile-menu-item logout-button" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="profile-menu-item">
                      Iniciar Sesión
                    </Link>
                    <Link to="/registro" className="profile-menu-item">
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
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
