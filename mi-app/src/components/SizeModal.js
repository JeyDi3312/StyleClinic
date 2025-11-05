import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from 'react-bootstrap';
import './SizeModal.css';

function SizeModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  const defaultTallas = ["S", "M", "L", "XL"];
  const tallas = product.tallaproducto && product.tallaproducto.length > 0
    ? product.tallaproducto.split(',').map(t => t.trim())
    : defaultTallas;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla.');
      return;
    }
    
    const productToAdd = {
      ...product,
      talla: selectedSize,
    };

    addToCart(productToAdd);
    onClose();
  };

  // A simpler, more direct modal design
  return (
    <div className="modal-backdrop" onClick={onClose}> 
      <div className="modal-content-simple" onClick={e => e.stopPropagation()}> 
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        <h5 className="modal-title">Selecciona tu talla</h5>
        
        <div className="size-selector">
          {tallas.map(talla => (
            <div
              key={talla}
              className={`size-box ${selectedSize === talla ? 'selected' : ''}`}
              onClick={() => setSelectedSize(talla)}
            >
              {talla}
            </div>
          ))}
        </div>

        <Button 
          variant="dark" 
          onClick={handleAddToCart} 
          disabled={!selectedSize}
          className="mt-3 w-100"
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default SizeModal;
