import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/SidebarCart.css';

function SidebarCart({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

  // Calcular el total redondeado
  const total = Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));

  return (
    <div className={`sidebar-cart ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-cart__close" onClick={onClose}>×</button>
      <h2>Carrito de Compras</h2>
      <div className="sidebar-cart__items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="sidebar-cart__item">
              <img src={item.image} alt={item.name} className="sidebar-cart__item-image" />
              <div className="sidebar-cart__item-details">
                <p>{item.name}</p>
                <p>Precio: ${Math.round(item.price)}</p>

                <div className="sidebar-cart__quantity-controls">
                  <button 
                    className="sidebar-cart__quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="sidebar-cart__quantity">{item.quantity}</span>
                  <button 
                    className="sidebar-cart__quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>

                <button 
                  className="sidebar-cart__remove-btn" 
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Tu carrito está vacío.</p>
        )}
      </div>

      <div className="sidebar-cart__total">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <button className="sidebar-cart__checkout">Continuar Compra</button>
    </div>
  );
}

export default SidebarCart;
