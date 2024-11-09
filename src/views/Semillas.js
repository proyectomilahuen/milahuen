import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductView.css';

function Semillas() {
  const semillasProducts = [
    { id: 1, image: '/images/chia.png', name: 'Chía', price: 2500 },
    { id: 2, image: '/images/linaza.png', name: 'Linaza', price: 2700 },
    { id: 3, image: '/images/pepazapallo.png', name: 'Pepas de zapallo', price: 3000 },
    { id: 4, image: '/images/maravillapelada.png', name: 'Maravilla pelada', price: 3200 }
  ];

  return (
    <div className="product-view">
      <h2 className="product-view__title">Semillas</h2>

      <div className="product-view__grid">
        {semillasProducts.map((product) => (
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

export default Semillas;
