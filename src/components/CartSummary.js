import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartSummary.css';

function CartSummary() {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const total = Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  const applyCoupon = () => {
    const validCoupons = {
      'DESCUENTO10': 0.1,
      'DESCUENTO20': 0.2,
      'LAVACALOLA': 1,
    };

    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
      setCouponMessage(`Cupón aplicado: ${coupon}`);
    } else {
      setDiscount(0);
      setCouponMessage('Cupón no válido.');
    }
  };

  const totalWithDiscount = total - total * discount;

  return (
    <div className="cart-summary">
      <h2>Resumen de la Compra</h2>

      <div className="cart-summary__content">
        <div className="cart-summary__items">
          <div className="cart-summary__header">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-summary__item">
                <div className="cart-summary__item-name">
                  <img src={item.image} alt={item.name} className="cart-summary__item-image" />
                  <span>{item.name}</span>
                </div>
                <div className="cart-summary__item-quantity">
                  <div className="cart-summary__quantity-controls">
                    <button 
                      className="cart-summary__quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="cart-summary__quantity">{item.quantity}</span>
                    <button 
                      className="cart-summary__quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-summary__item-price">
                  <span>${Math.round(item.price * item.quantity)}</span>
                </div>
                <button 
                  className="cart-summary__remove-btn" 
                  onClick={() => removeItem(item.id)}
                  title="Eliminar"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
        </div>

        <div className="cart-summary__coupon">
          <label htmlFor="coupon">¿Tienes un cupón?</label>
          <input
            type="text"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Ingresa tu cupón"
          />
          <button className="cart-summary__apply-coupon" onClick={applyCoupon}>Aplicar Cupón</button>
          {couponMessage && <p className="cart-summary__coupon-message">{couponMessage}</p>}
        </div>
      </div>

      <div className="cart-summary__total">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      {discount > 0 && (
        <div className="cart-summary__total">
          <span>Descuento:</span>
          <span>-${Math.round(total * discount)}</span>
        </div>
      )}

      <div className="cart-summary__total">
        <span>Total con Descuento:</span>
        <span>${Math.round(totalWithDiscount)}</span>
      </div>

      <button className="cart-summary__finalize">Finalizar Compra</button>
    </div>
  );
}

export default CartSummary;
