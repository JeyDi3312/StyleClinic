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

    const productToAdd = {
        idproducto: producto.idproducto,
        nombreproducto: producto.nombreproducto,
        priceproducto: producto.priceproducto,
        imageproducto: producto.imageproducto,
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
          <Button variant="dark" onClick={handleAddToCart} className="mt-3">
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
