import React, { useState, useEffect } from "react";
import '../styles/carousel.css';
import ReuseInfo from '../components/ReuseInfo';
import BenefitsSection from '../components/BenefitsSection';

const Carousel2 = ({ data }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
    }, 6000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="carousel-container">
      {/* Carrusel de fondo */}
      <div className="carousel-background">
        {data.map((item, idx) => (
          <img
            key={idx}
            src={item.src}  // Ruta de la imagen en 'public/images'
            alt={item.alt}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        ))}
      </div>

      {/* Componentes dentro del carrusel (encima de las imágenes) */}
      <div className="carousel-content">
        <ReuseInfo />
        <BenefitsSection />
      </div>
    </div>
  );
};

export default Carousel2;
