import React from 'react';
import ProductCard from '../components/ProductCard';
import  FloatingButton from '../components/FloatingButton' ;
import '../styles/ProductView.css';

function CerealesIntegrales() {
  const cerealesProducts = [
    { id: 1, image: '/images/avena_integral.png', name: 'Avena Integral', price: 2800 },
    { id: 2, image: '/images/arroz_integral.png', name: 'Arroz Integral', price: 3000 },
    { id: 3, image: '/images/quinua.png', name: 'Quínoa', price: 4500 }
  ];

  return (
    <div className="product-view">
      <h2 className="product-view__title">Cereales Integrales</h2>

      <div className="product-view__grid">
        {cerealesProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
      <FloatingButton />
    </div>
  );
}

export default CerealesIntegrales;
