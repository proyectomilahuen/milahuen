import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import FloatingButton from '../components/FloatingButton';
import '../styles/ProductView.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

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
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const baseURL = 'https://milahuen.netlify.app/images/';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://emporio-milahuen.onrender.com/api/productos/');
        const productsData = response.data.map(product => ({
          id: product.id,
          image: product.image ? `${baseURL}${product.image.split('/').pop()}` : null,
          name: product.name,
          price: product.price
        }));
        setProducts(productsData);
        setFeaturedProducts(productsData.slice(0, 3)); // Assuming the first 3 products are featured
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
        {products.map((product) => (
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

export default ProductView;