import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__categories">
        <a href="/category-x">Categoría X</a>
        <a href="/category-y">Categoría Y</a>
        <a href="/category-z">Categoría Z</a>
      </div>
      <div className="footer__socials">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
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
