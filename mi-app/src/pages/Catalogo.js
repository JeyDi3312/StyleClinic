import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import './Catalogo.css';

function Catalogo() {
  
const [productos, setProductos] = useState([]);

 useEffect(() => {
    // Apuntamos al nuevo backend de Node.js
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
  <div className="Custom-catalogo">
    <Container className="mt-1 pt-3">
      <h2 className="text-center text-black mb-4">Nuestra Colección</h2>
      <Row>
      {/* Usamos los nuevos nombres de la API: _id, name, price, image, size */}
      {productos.map((producto) => (
       <Col key={producto._id} md={4} className="mb-4">
      <ProductCard
        id={producto._id} // ID de MongoDB es _id
        name={producto.name}
        price={producto.price}
        image={producto.image}
        size={producto.size} 
      />
    </Col>
  ))}
</Row>

    </Container>
  </div>
); 

}

export default Catalogo;
