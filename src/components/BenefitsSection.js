import React, { useContext } from 'react';
import BenefitCard from './BenefitCard';
import { ReuseContext } from '../context/ReuseContext';
import '../styles/BenefitsSection.css';

function BenefitsSection() {
  const { reuseCount } = useContext(ReuseContext);

  // Cálculo aproximado de los beneficios, en vdd desconozco la conversión xD
  const treesSaved = (reuseCount * 0.1).toFixed(0);
  const waterSaved = (reuseCount * 0.9).toFixed(0);

  const benefits = [
    {
      id: 1,
      image: '/images/tree.jpg',
      title: 'Tala de árboles evitada',
      description: `Al reutilizar frascos, aproximadamente se evitaron ${treesSaved} árboles.`,
    },
    {
      id: 2,
      image: '/images/water.png',
      title: 'Ahorro de agua',
      description: `Gracias a la economía circular, se ahorraron aproximadamente ${waterSaved} litros de agua.`,
    },
  ];

  return (
    <div className="benefits-section">
      <div className="benefits-section__content">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            image={benefit.image}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>

      <div className="benefits-section__reward">
        <p className="benefits-section__reward-text">
          Reutilizar es una de las prácticas más efectivas en la economía circular.
          Al hacerlo, reducimos el impacto ambiental y promovemos un uso más consciente de los recursos.
          <br /><br />
          Reutiliza tus frascos y Milahuén te premia con descuentos especiales.
        </p>
        <img src="/images/reward.png" alt="Premios por reutilización" className="benefits-section__reward-image" />
      </div>
    </div>
  );
}

export default BenefitsSection;