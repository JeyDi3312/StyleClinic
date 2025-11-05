import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import SizeModal from './SizeModal'; // Import the modal

function ProductCard({ idproducto, nombreproducto, priceproducto, imageproducto, tallaproducto }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // This function will be called when the user clicks the main add to cart button
  const handleOpenModal = (e) => {
    e.stopPropagation(); // Prevent the card's own click event
    setShowModal(true);   // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  // This will navigate to the product detail page
  const handleClick = () => {
    navigate(`/producto/${idproducto}`);
  };
  
  const product = { idproducto, nombreproducto, priceproducto, imageproducto, tallaproducto };

  return (
    <>
      <Card className="product-card text-white" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Card.Img src={imageproducto} className="product-image" />
        <Card.Body>
          <Card.Title>{nombreproducto}</Card.Title>
          <Card.Text>${priceproducto}</Card.Text>
          <Button variant="light" onClick={handleOpenModal}>
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>

      {/* Render the modal conditionally */}
      {showModal && <SizeModal product={product} onClose={handleCloseModal} />}
    </>
  );
}

export default ProductCard;
