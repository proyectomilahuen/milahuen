import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductView.css';

function Legumbres() {
  const legumbresProducts = [
    { id: 1, image: '/images/lentejas_rojas.png', name: 'Lentejas Rojas', price: 2500 },
    { id: 2, image: '/images/lentejas_baby.png', name: 'Lentejas Baby', price: 2200 },
    { id: 3, image: '/images/porotos_rojos.png', name: 'Porotos Rojos', price: 2800 }
  ];

  return (
    <div className="product-view">
      <h2 className="product-view__title">Legumbres</h2>

      <div className="product-view__grid">
        {legumbresProducts.map((product) => (
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

export default Legumbres;
