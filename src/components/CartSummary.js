import axios from 'axios';
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartSummary.css';

function CartSummary() {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const total = Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  const totalWithDiscount = total - total * discount;

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

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post('https://emporio-milahuen.onrender.com/api/boleta/', {
        cartItems,
        total: totalWithDiscount,
        name,
        email,
        contactNumber,
        address,
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'boleta.pdf');
        document.body.appendChild(link);
        link.click();
      } else {
        console.error('Error al generar el PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const validateAndSubmitOrder = async () => {
    if (!name || !email || !contactNumber || !address) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('https://emporio-milahuen.onrender.com/api/ordenes/', {
        name,
        address,
        order_date: new Date().toISOString(),
        contact_number: contactNumber,
        email,
        status: 'pendiente',
        total_price: totalWithDiscount,
        user: null,
      });

      if (response.status === 201) {
        const orderId = response.data.id;

        // Iterar sobre cartItems y hacer POST a orden_items
        for (const item of cartItems) {
          await axios.post('https://emporio-milahuen.onrender.com/api/orden_items/', {
            quantity: item.quantity,
            price_at_purchase: item.price,
            order: orderId,
            product: item.id,
          });
        }

        await handleGeneratePDF();
      } else {
        console.error('Error al crear la orden:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

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

      <div className="cart-summary__invoice full-width">
        <h2 className="invoice-title">Factura de Compra</h2>

        <div className="cart-summary__total">
          <div className="total-row">
            <span className="total-label">Total con Descuento:</span>
            <span className="total-value">${Math.round(totalWithDiscount)}</span>
          </div>
        </div>

        <div className="cart-summary__user-info">
          <div className="input-group">
            <label htmlFor="name">Nombre Cliente</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pablo"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan.pablo@gmail.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="contactNumber">Número de Contacto</label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="56944486840"
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Avenida Dorsal 4321, Lo Prado"
            />
          </div>
        </div>

        <button className="finalize-btn" onClick={validateAndSubmitOrder}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default CartSummary;