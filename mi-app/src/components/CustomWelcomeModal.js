import React from 'react';
import './CustomWelcomeModal.css';

const CustomWelcomeModal = ({ onContinue }) => {
  return (
    <div className="welcome-modal-backdrop">
      <div className="welcome-modal-content">
        <h2 className="welcome-modal-title">¡Bienvenido a la customización!</h2>
        <p className="welcome-modal-text">
          Aquí podrás soltar tu creatividad. Elige el color de tu camiseta y luego personaliza la parte delantera y trasera con nuestros diseños exclusivos. ¡Vamos a crear algo único!
        </p>
        <button className="welcome-modal-button" onClick={onContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default CustomWelcomeModal;
