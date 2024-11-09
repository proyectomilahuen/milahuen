import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import { CartProvider } from './context/CartContext';
import { ReuseProvider } from './context/ReuseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ReuseProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ReuseProvider>
    </Router>
  </React.StrictMode>
);
