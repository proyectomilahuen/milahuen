import React from "react";
import { FaWhatsapp } from "react-icons/fa"; 
import "../styles/FloatingButton.css"; 

const FloatingButton = () => {
  const handleClick = () => {
  
    window.location.href = "https://wa.me/56976232524"; 
  };

  return (
    <button className="floating-btn" onClick={handleClick}>
      <FaWhatsapp size={30} color="#fff" />
    </button>
  );
};

export default FloatingButton;
