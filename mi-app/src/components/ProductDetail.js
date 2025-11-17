import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Image, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import './ProductDetail.css';

function ProductDetail() {
  // 1. Obtenemos el `id` del producto de la URL
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // 2. Apuntamos al nuevo endpoint del backend de Node.js
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

    // 3. Creamos el objeto a añadir con los nombres de la nueva API
    const productToAdd = {
        _id: producto._id,       // Usamos _id de MongoDB
        name: producto.name,       // `name` en lugar de `nombreproducto`
        price: producto.price,     // `price` en lugar de `priceproducto`
        image: producto.image,     // `image` en lugar de `imageproducto`
        size: selectedSize,     // La talla seleccionada
    };

    addToCart(productToAdd);
    alert("Producto añadido al carrito!"); // Feedback para el usuario
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

  // 4. Las tallas ahora vienen de un array `sizes`
  const tallas = producto.sizes || ["S", "M", "L", "XL"];

  return (
    <Container className="Productdetail-custom py-5">
      <Row>
        <Col md={6}>
          {/* 5. Usamos los nuevos nombres de campo para mostrar la info */}
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
            disabled={!selectedSize} // El botón se activa solo si se elige una talla
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
