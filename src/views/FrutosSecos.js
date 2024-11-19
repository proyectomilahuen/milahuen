import React from 'react';
import ProductCard from '../components/ProductCard';
import  FloatingButton from '../components/FloatingButton' ;
import '../styles/ProductView.css';

function FrutosSecos() {
  const frutosSecosProducts = [
    { id: 1, image: '/images/almendras.png', name: 'Almendras', price: 5000 },
    { id: 2, image: '/images/nuez.png', name: 'Nueces', price: 4000 },
    { id: 3, image: '/images/mani.png', name: 'Maní', price: 3000 },
    { id: 4, image: '/images/coco.png', name: 'Coco Laminado', price: 4500 },
    { id: 5, image: '/images/cranberris.png', name: 'Cranberris', price: 6000 },
    { id: 6, image: '/images/ciruelas.png', name: 'Ciruelas Sin cuesco', price: 5500 }
  ];

  return (
    <div className="product-view">
      <h2 className="product-view__title">Frutos Secos</h2>

      <div className="product-view__grid">
        {frutosSecosProducts.map((product) => (
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

export default FrutosSecos;
