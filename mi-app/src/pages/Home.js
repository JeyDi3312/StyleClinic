import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import './Home.css';

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(response => {
        setProductos(response.data.slice(0, 3));
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div className="home-dark">
      <ProductCarousel />
      <Container className="mt-1 pt-3">
        <h2 className="text-center text-black mb-4">Nuestra Colección</h2>
        <Row>
          {productos.map(producto => (
            <Col key={producto.idproducto} md={4} className="mb-4">
              <ProductCard
                idproducto={producto.idproducto}
                nombreproducto={producto.nombreproducto}
                priceproducto={producto.priceproducto}
                imageproducto={producto.imageproducto}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
