import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>StyleClinic</h5>
            <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </Col>
          <Col md={4}>
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/">Inicio</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href='/Contact'>Contáctanos</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <p>Email: StyleClinic.service@gmail.com</p>
            <p>Tel: +57 313 290 0304</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
