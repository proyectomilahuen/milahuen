import React, { useContext } from 'react';
import '../styles/ProductCard.css';
import { CartContext } from '../context/CartContext';

function ProductCard({ image, name, price }) {
  const { addToCart } = useContext(CartContext);

  const product = { id: name, image, name, price };

  const handleAddToCart = () => {
    console.log("Producto agregado:", product);
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-card__content">
        <img src={image} alt={name} className="product-card__image" />
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">${price}</p>
      </div>
      <div className="product-card__actions">
        <button 
          className="product-card__button add-to-cart" 
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
        <button className="product-card__button buy-now">Comprar ahora</button>
      </div>
    </div>
  );
}

export default ProductCard;
