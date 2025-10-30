import React, { useState } from 'react';
import './Custom.css';

const Custom = () => {
  const [frontDesign, setFrontDesign] = useState('DiseñoA1');
  const [backDesign, setBackDesign] = useState('DiseñoB1');
  const [size, setSize] = useState('M');

  const handleFrontDesignChange = (design) => setFrontDesign(design);
  const handleBackDesignChange = (design) => setBackDesign(design);
  const handleSizeChange = (selectedSize) => setSize(selectedSize);

  const frontDesigns = ['DiseñoA1', 'DiseñoA2', 'DiseñoA3'];
  const backDesigns = ['DiseñoB1', 'DiseñoB2', 'DiseñoB3'];
  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    console.log('Producto añadido al carrito:');
    console.log('Diseño Delantero:', frontDesign);
    console.log('Diseño Trasero:', backDesign);
    console.log('Talla:', size);
  };

  return (
    <div className="customizer-container">
      <header className="customizer-header">
        <h1>Crea tu propio estilo</h1>
        <p>Personaliza tu camiseta con nuestros diseños exclusivos.</p>
      </header>

      <main className="customizer-main-content">
        <section className="preview-area">
          <div className="tshirt-preview-wrapper">
            <h3 className="tshirt-preview-title">Vista Delantera</h3>
            <div className="tshirt-display-panel">
              {frontDesign && (
                <img
                  src={`/img/${frontDesign}.png`}
                  alt="Vista previa del diseño delantero"
                  className="preview-image"
                />
              )}
            </div>
          </div>

          <div className="tshirt-preview-wrapper">
            <h3 className="tshirt-preview-title">Vista Trasera</h3>
            <div className="tshirt-display-panel">
              {backDesign && (
                <img
                  src={`/img/${backDesign}.png`}
                  alt="Vista previa del diseño trasero"
                  className="preview-image"
                />
              )}
            </div>
          </div>
        </section>

        <section className="options-area">
          <div className="design-selection-group">
            <h3 className="design-selection-title">Diseño Delantero</h3>
            <div className="design-options-grid">
              {frontDesigns.map((design) => (
                <div
                  key={design}
                  className={`design-choice-box ${frontDesign === design ? 'selected' : ''}`}
                  onClick={() => handleFrontDesignChange(design)}
                >
                  <img src={`/img/${design}.png`} alt={`${design} thumbnail`} />
                </div>
              ))}
            </div>
          </div>

          <div className="design-selection-group">
            <h3 className="design-selection-title">Diseño Trasero</h3>
            <div className="design-options-grid">
              {backDesigns.map((design) => (
                <div
                  key={design}
                  className={`design-choice-box ${backDesign === design ? 'selected' : ''}`}
                  onClick={() => handleBackDesignChange(design)}
                >
                  <img src={`/img/${design}.png`} alt={`${design} thumbnail`} />
                </div>
              ))}
            </div>
          </div>

          <div className="size-selection-group">
            <h3 className="size-selection-title">Elige tu Talla</h3>
            <div className="size-options-grid">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`size-choice-btn ${size === s ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </section>
      </main>
    </div>
  );
};

export default Custom;
