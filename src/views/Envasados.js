// src/views/Envasados.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductView.css';

function Envasados() {
  const envasadosProducts = [
    { id: 1, image: '/images/mantequilla_mani.png', name: 'Mantequilla de maní', price: 6000 },
    { id: 2, image: '/images/mix_puesco.png', name: 'Mix Puesco', price: 5000 },
    { id: 3, image: '/images/mix_lahuen.png', name: 'Mix Lahuén', price: 5200 },
    { id: 4, image: '/images/mix_murta.png', name: 'Mix Murta', price: 5400 }
  ];

  return (
    <div className="product-view">
      <h2 className="product-view__title">Envasados</h2>

      <div className="product-view__grid">
        {envasadosProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Envasados;
