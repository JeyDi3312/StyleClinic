import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ idproducto, nombreproducto, priceproducto, imageproducto }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart({ idproducto, nombreproducto, priceproducto, imageproducto });
  };

  const handleClick = () => {
    navigate(`/producto/${idproducto}`);
  };

  return (
    <Card className="product-card text-white" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card.Img src={imageproducto} className="product-image" />
      <Card.Body>
        <Card.Title>{nombreproducto}</Card.Title>
        <Card.Text>${priceproducto}</Card.Text>
        <Button variant="light" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
