import React from 'react';
import '../styles/BenefitCard.css';

function BenefitCard({ image, title, description }) {
  return (
    <div className="benefit-card">
      <img src={image} alt={title} className="benefit-card__image" />
      <h3 className="benefit-card__title">{title}</h3>
      <p className="benefit-card__description">{description}</p>
    </div>
  );
}

export default BenefitCard;
