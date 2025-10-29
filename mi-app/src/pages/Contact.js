import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '90vh', marginTop: '6rem' }}>
      <Container className="py-5" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4 fw-bold">Contáctanos</h2>
        <p className="text-center text-muted mb-4">
          ¿Tienes preguntas? Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Tu nombre completo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@correo.com" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formMessage">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí..." />
          </Form.Group>

          <div className="text-center">
            <Button variant="dark" type="submit">
              Enviar mensaje
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Contact;
