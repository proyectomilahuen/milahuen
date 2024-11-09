import React, { useContext } from 'react';
import BenefitCard from './BenefitCard';
import { ReuseContext } from '../context/ReuseContext';
import WaterAnimation from './WaterAnimation';
import TreeAnimation from './TreeAnimation';
import '../styles/BenefitsSection.css';

function BenefitsSection() {
  const { reuseCount } = useContext(ReuseContext);

  // Cálculo aproximado de los beneficios
  const treesSaved = (reuseCount * 0.1).toFixed(0);
  const waterSaved = (reuseCount * 0.9).toFixed(0);

  const benefits = [
    {
      id: 1,
      animation: <TreeAnimation />,
      title: 'Tala de árboles evitada',
      description: (
        <>
          Al reutilizar frascos, aproximadamente se evitaron <strong>{treesSaved} árboles</strong>.
        </>
      ),
    },
    {
      id: 2,
      animation: <WaterAnimation />,
      title: 'Ahorro de agua',
      description: (
        <>
          Gracias a la economía circular, se ahorraron aproximadamente <strong>{waterSaved} litros de agua</strong>.
        </>
      ),
    },
  ];

  return (
    <div className="benefits-section">
      <div className="benefits-section__content">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            image={benefit.image}
            animation={benefit.animation}
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
