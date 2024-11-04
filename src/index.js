import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import { CartProvider } from './context/CartContext';
import { ReuseProvider } from './context/ReuseContext';


ReactDOM.render(
  <React.StrictMode>
    <ReuseProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </ReuseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
