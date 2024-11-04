import React from 'react';
import '../styles/BenefitCard.css';

function BenefitCard({ animation, title, description }) {
  return (
    <div className="benefit-card">
      <div className="benefit-card__image">
        {animation}
      </div>
      <h3 className="benefit-card__title">{title}</h3>
      <p className="benefit-card__description">{description}</p>
    </div>
  );
}

export default BenefitCard;