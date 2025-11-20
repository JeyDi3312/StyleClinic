import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import SizeModal from './SizeModal'; 

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

  const handleClick = () => {
    navigate(`/producto/${id}`);
  };
  
  const product = { _id: id, name, price, image, size };

  return (
    <>
      <Card className="product-card text-white" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Card.Img src={image} className="product-image" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Button variant="light" onClick={handleOpenModal}>
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>

      {showModal && <SizeModal product={product} onClose={handleCloseModal} />}
    </>
  );
}

export default ProductCard;
