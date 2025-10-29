import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './ProductCarousel.css';
import { useCart } from '../context/CartContext';

function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(response => {
        setProducts(response.data.slice(0, 4));
      })
      .catch(error => {
        console.error('Error al cargar productos del carrusel:', error);
      });
  }, []);

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
                  <Card key={product.idproducto} className="product-card">
                    <Card.Img variant="top" src={product.imageproducto} />
                    <Card.Body>
                      <Card.Title>{product.nombreproducto}</Card.Title>
                      <Card.Text>${product.priceproducto}</Card.Text>
                      <Button
                        variant="light"
                        onClick={() =>
                          addToCart({
                            idproducto: product.idproducto,
                            nombreproducto: product.nombreproducto,
                            priceproducto: product.priceproducto,
                            imageproducto: product.imageproducto
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
