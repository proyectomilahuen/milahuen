import React from "react";
import "../styles/Modal.css";

const Modal = ({ children }) => {
  const handleClose = () => {
    window.location.replace("/inventario");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button className="modal-close-btn" onClick={handleClose}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Modal;
