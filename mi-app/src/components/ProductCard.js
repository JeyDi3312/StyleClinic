import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import SizeModal from './SizeModal'; 

// Las props ahora son id, name, price, image, size para coincidir con la nueva API
function ProductCard({ id, name, price, image, size }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = (e) => {
    e.stopPropagation(); 
    setShowModal(true);   
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  // Navegamos usando el nuevo `id` de MongoDB
  const handleClick = () => {
    navigate(`/producto/${id}`);
  };
  
  // El objeto producto usa los nuevos nombres de propiedades
  const product = { id, name, price, image, size };

  return (
    <>
      <Card className="product-card text-white" onClick={handleClick} style={{ cursor: 'pointer' }}>
        {/* Usamos las nuevas props para mostrar la información */}
        <Card.Img src={image} className="product-image" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Button variant="light" onClick={handleOpenModal}>
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>

      {/* Pasamos el objeto producto actualizado al modal */}
      {showModal && <SizeModal product={product} onClose={handleCloseModal} />}
    </>
  );
}

export default ProductCard;
