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
    axios.get(`http://localhost:5000/api/products/${id}`)
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
      console.warn("El producto no está cargado todavía");
      return;
    }

    if (!selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    const productToAdd = {
        _id: producto._id,       
        name: producto.name,       
        price: producto.price,     
        image: producto.image,     
        size: selectedSize,     
    };

    addToCart(productToAdd);
    alert("Producto añadido al carrito!"); 
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

  const tallas = producto.sizes || ["S", "M", "L", "XL"];

  return (
    <Container className="Productdetail-custom py-5">
      <Row>
        <Col md={6}>
          <Image src={producto.image} fluid />
        </Col>
        <Col md={6}>
          <h2>{producto.name}</h2>
          <p>{producto.description}</p>
          <h4>${producto.price}</h4>

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
