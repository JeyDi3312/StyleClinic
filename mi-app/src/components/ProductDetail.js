import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Image, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar el producto:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!producto) {
      console.warn("producto no está listo aún");
      return;
    }

    if (!selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    const productToAdd = {
        idproducto: producto.idproducto,
        nombreproducto: producto.nombreproducto,
        priceproducto: producto.priceproducto,
        imageproducto: producto.imageproducto,
        talla: selectedSize,
    };

    console.log("Agregando al carrito:", productToAdd);
    addToCart(productToAdd);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="text-center mt-5">
        <h3>Producto no encontrado</h3>
      </Container>
    );
  }

  const defaultTallas = ["S", "M", "L", "XL"];
  const tallas = producto.tallaproducto && producto.tallaproducto.length > 0 
    ? producto.tallaproducto.split(',').map(t => t.trim()) 
    : defaultTallas;

  return (
    <Container className="Productdetail-custom py-5">
      <Row>
        <Col md={6}>
          <Image src={producto.imageproducto} fluid />
        </Col>
        <Col md={6}>
          <h2>{producto.nombreproducto}</h2>
          <p>{producto.descriptionproducto}</p>
          <h4>${producto.priceproducto}</h4>

          <div className="my-3">
            <strong>Talla:</strong>
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
          </div>

          <Button 
            variant="dark" 
            onClick={handleAddToCart} 
            className="mt-3"
            disabled={!selectedSize}
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
