
import React, { useState } from 'react';
import './Custom.css';

const Custom = () => {
  const [frontDesign, setFrontDesign] = useState('camiseta1');
  const [backDesign, setBackDesign] = useState('camiseta1');

  const handleFrontDesignChange = (design) => {
    setFrontDesign(design);
  };

  const handleBackDesignChange = (design) => {
    setBackDesign(design);
  };

  return (
    <div className="custom-container">
      <h1 className="custom-title">Customiza</h1>
      <div className="custom-content">
        <div className="custom-left">
          <div className="custom-options-horizontal">
            <div className="custom-option" onClick={() => handleFrontDesignChange('DiseñoA1')}>
              <img src="/img/DiseñoA1.png" alt="Design 1" />
            </div>
            <div className="custom-option" onClick={() => handleFrontDesignChange('DiseñoA2')}>
              <img src="/img/DiseñoA2.png" alt="Design 2" />
            </div>
            <div className="custom-option" onClick={() => handleFrontDesignChange('DiseñoA3')}>
              <img src="/img/DiseñoA3.png" alt="Design 3" />
            </div>
          </div>
          <div className="custom-images-horizontal">
            <div className="custom-image-left">
              {frontDesign && <img src={`/img/${frontDesign}.png`} alt="Front Design" />}
            </div>
            <div className="custom-image-right">
              {backDesign && <img src={`/img/${backDesign}.png`} alt="Back Design" />}
            </div>
          </div>
        </div>
        <div className="custom-right">
          <div className="custom-options-vertical">
            <div className="custom-option" onClick={() => handleBackDesignChange('DiseñoB1')}>
              <img src="/img/DiseñoB1.png" alt="Design 4" />
            </div>
            <div className="custom-option" onClick={() => handleBackDesignChange('DiseñoB2')}>
              <img src="/img/DiseñoB2.png" alt="Design 5" />
            </div>
            <div className="custom-option" onClick={() => handleBackDesignChange('DiseñoB3')}>
              <img src="/img/DiseñoB3.png" alt="Design 6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
