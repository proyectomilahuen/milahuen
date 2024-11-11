import React, { useContext } from 'react';
import '../styles/InventoryCard.css';



function InventoryCard({ image, name }) {

    const product = { id: name, image, name };


    return (
        <div className="inventory-card">
            <img src={image} alt={name} className="inventory-card__image" />
            <h3 className="inventory-card__name">{name}</h3>
        </div>
    );
}

export default InventoryCard;