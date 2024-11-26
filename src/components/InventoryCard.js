import React from 'react';
import '../styles/InventoryCard.css';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir

function InventoryCard({ image, name, onClick }) { // Ahora recibimos onClick como prop

  return (
    <div className="inventory-card" onClick={onClick}>
      <img src={image} alt={name} className="inventory-card__image" />
      <h3 className="inventory-card__name">{name}</h3>
    </div>
  );
}

export default InventoryCard;