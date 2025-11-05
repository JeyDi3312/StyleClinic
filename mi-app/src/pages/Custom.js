import React, { useState } from 'react';
import './Custom.css';
import CustomWelcomeModal from '../components/CustomWelcomeModal';

const Custom = () => {
  // State management
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null); // 'negro' or 'blanco'
  const [frontDesign, setFrontDesign] = useState(null);
  const [backDesign, setBackDesign] = useState(null);
  const [size, setSize] = useState('M');

  // Design sets
  const designs = {
    negro: {
      front: ['DiseñoA1', 'DiseñoA2', 'DiseñoA3', 'DiseñoA4', 'DiseñoA5'],
      back: ['DiseñoB1', 'DiseñoB2', 'DiseñoB3', 'DiseñoB4', 'DiseñoB5'],
    },
    blanco: {
      front: ['DiseñoC1', 'DiseñoC2', 'DiseñoC3', 'DiseñoC4', 'DiseñoC5'],
      back: ['DiseñoD1', 'DiseñoD2', 'DiseñoD3', 'DiseñoD4', 'DiseñoD5'],
    },
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  // Handlers
  const handleContinue = () => setShowWelcomeModal(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Set default designs when color is selected
    setFrontDesign(designs[color].front[0]);
    setBackDesign(designs[color].back[0]);
  };
  
  const handleChangeColor = () => {
      setSelectedColor(null);
      setFrontDesign(null);
      setBackDesign(null);
  }

  const handleFrontDesignChange = (design) => setFrontDesign(design);
  const handleBackDesignChange = (design) => setBackDesign(design);
  const handleSizeChange = (selectedSize) => setSize(selectedSize);

  const handleAddToCart = () => {
    if (!selectedColor || !frontDesign || !backDesign || !size) {
      alert('Por favor, completa tu diseño antes de añadirlo al carrito.');
      return;
    }
    console.log('Producto añadido al carrito:');
    console.log('Color:', selectedColor);
    console.log('Diseño Delantero:', frontDesign);
    console.log('Diseño Trasero:', backDesign);
    console.log('Talla:', size);
    // Here you would typically call a function from a CartContext, for example
  };

  // Determine which designs to show
  const availableDesigns = selectedColor ? designs[selectedColor] : { front: [], back: [] };

  return (
    <>
      {showWelcomeModal && <CustomWelcomeModal onContinue={handleContinue} />}

      <div className="customizer-container">
        <header className="customizer-header">
          <h1>Crea tu propio estilo</h1>
          <p>Personaliza tu camiseta con nuestros diseños exclusivos.</p>
        </header>

        {!showWelcomeModal && (
          <main className="customizer-main-content">
            {/* --- PREVIEW AREA --- */}
            <section className="preview-area">
              <div className="tshirt-preview-wrapper">
                <h3 className="tshirt-preview-title">Vista Delantera</h3>
                <div className={`tshirt-display-panel ${selectedColor || 'default-bg'}`}>
                  {frontDesign && <img src={`/img/${frontDesign}.png`} alt="Preview Front" className="preview-image" />}
                </div>
              </div>
              <div className="tshirt-preview-wrapper">
                <h3 className="tshirt-preview-title">Vista Trasera</h3>
                <div className={`tshirt-display-panel ${selectedColor || 'default-bg'}`}>
                  {backDesign && <img src={`/img/${backDesign}.png`} alt="Preview Back" className="preview-image" />}
                </div>
              </div>
            </section>

            {/* --- OPTIONS AREA --- */}
            <section className="options-area">
              {/* Step 1: Color Selection */}
              {!selectedColor && (
                <div className="selection-step">
                  <h3 className="selection-title">Paso 1: Elige un color</h3>
                  <div className="color-selector">
                    <div className="color-option-wrapper">
                       <div className="color-option negro" onClick={() => handleColorSelect('negro')}></div>
                       <span>Negro</span>
                    </div>
                    <div className="color-option-wrapper">
                       <div className="color-option blanco" onClick={() => handleColorSelect('blanco')}></div>
                       <span>Blanco</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 & 3: Design and Size Selection */}
              {selectedColor && (
                <>
                  <div className="design-selection-group">
                    <h3 className="design-selection-title">Diseño Delantero</h3>
                    <div className="design-options-grid">
                      {availableDesigns.front.map((design) => (
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
                      {availableDesigns.back.map((design) => (
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

                   <button onClick={handleChangeColor} className="change-color-btn">Cambiar Color</button>
                  <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!frontDesign || !backDesign}>
                    Añadir al carrito
                  </button>
                </>
              )}
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default Custom;
