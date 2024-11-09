import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import '../styles/ProductView.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Componentes de flecha personalizados
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow next-arrow" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow prev-arrow" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
}

function ProductView() {
  const featuredProducts = [
    { id: 101, image: '/images/mix_puesco.png', name: 'Mix Puesco', price: 6000 },
    { id: 102, image: '/images/mix_lahuen.png', name: 'Mix Lahuén', price: 7000 },
    { id: 103, image: '/images/mix_murta.png', name: 'Mix Murta', price: 6500 },
  ];

  const allProducts = [
    
    // Frutos Secos
    { id: 1, image: '/images/almendras.png', name: 'Almendras', price: 5000 },
    { id: 2, image: '/images/nuez.png', name: 'Nueces', price: 4000 },
    { id: 3, image: '/images/mani.png', name: 'Maní Tostado', price: 3000 },
    { id: 4, image: '/images/coco_laminado.png', name: 'Coco Laminado', price: 4500 },
    { id: 5, image: '/images/cranberris.png', name: 'Cranberris', price: 5500 },
    { id: 6, image: '/images/ciruelas.png', name: 'Ciruelas Sin cuesco', price: 6000 },
  
    // Semillas
    { id: 7, image: '/images/chia.png', name: 'Chía', price: 2000 },
    { id: 8, image: '/images/linaza.png', name: 'Linaza', price: 2500 },
    { id: 9, image: '/images/pepas_de_zapallo.png', name: 'Pepas de zapallo', price: 4000 },
    { id: 10, image: '/images/maravilla_pelada.png', name: 'Maravilla pelada', price: 3500 },
  
    // Cereales Integrales
    { id: 11, image: '/images/avena_integral.png', name: 'Avena integral', price: 3000 },
    { id: 12, image: '/images/arroz_integral.png', name: 'Arroz integral', price: 4500 },
    { id: 13, image: '/images/quinua.png', name: 'Quínoa', price: 5000 },
  
    // Legumbres
    { id: 14, image: '/images/lentejas_rojas.png', name: 'Lentejas Rojas', price: 3000 },
    { id: 15, image: '/images/lentejas_baby.png', name: 'Lentejas Baby', price: 3200 },
    { id: 16, image: '/images/porotos_rojos.png', name: 'Porotos rojos', price: 4000 },
  
    // Envasados
    { id: 17, image: '/images/mantequilla_mani.png', name: 'Mantequilla de maní', price: 8000 },
    { id: 18, image: '/images/mix_puesco.png', name: 'Mix Puesco', price: 6000 },
    { id: 19, image: '/images/mix_lahuen.png', name: 'Mix Lahuén', price: 7000 },
    { id: 20, image: '/images/mix_murta.png', name: 'Mix Murta', price: 6500 },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="product-view">
      <div className="product-view__carousel">
        <Slider {...carouselSettings}>
          {featuredProducts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </Slider>
      </div>

      <h2 className="product-view__title">Productos Destacados</h2>
      <div className="product-view__grid featured">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>

      <h2 className="product-view__title">Todos los Productos</h2>
      <div className="product-view__grid">
        {allProducts.map((product) => (
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

export default ProductView;
