import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__categories">
        <Link to="/frutos-secos">Frutos Secos</Link>
        <Link to="/semillas">Semillas</Link>
        <Link to="/cereales-integrales">Cereales Integrales</Link>
        <Link to="/legumbres">Legumbres</Link>
        <Link to="/envasados">Envasados</Link>
      </div>
      <div className="footer__socials">
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
    </footer>
  );
}

export default Footer;
