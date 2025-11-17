import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './ProductCarousel.css';
import { useCart } from '../context/CartContext';

function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // 1. Cambiar la URL del endpoint al nuevo servidor
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        // Tomamos los primeros 4 productos para el carrusel
        setProducts(response.data.slice(0, 4));
      })
      .catch(error => {
        console.error('Error al cargar productos del carrusel:', error);
      });
  }, []);

  // Agrupamos los productos de 2 en 2 para el carrusel
  const groupSize = 2;
  const productGroups = [];
  for (let i = 0; i < products.length; i += groupSize) {
    productGroups.push(products.slice(i, i + groupSize));
  }

  return (
    <div className="carousel-section">
      <Container>
        <h2 className="text-center mb-5 text-white">New Collection</h2>
        <Carousel indicators={false} controls={true}>
          {productGroups.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex justify-content-center gap-4 custom-carousel">
                {group.map(product => (
                  // 2. Usar el nuevo _id que genera MongoDB
                  <Card key={product._id} className="product-card">
                    {/* 3. Usar los nuevos nombres de campo: image, name, price */}
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button
                        variant="light"
                        onClick={() =>
                          // 4. Usar los nuevos nombres de campo al agregar al carrito
                          addToCart({
                            _id: product._id, // Usamos _id
                            name: product.name,
                            price: product.price,
                            image: product.image
                          })
                        }
                      >
                        Agregar al carrito
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default ProductCarousel;
