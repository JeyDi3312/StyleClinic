import React, { useState } from 'react';
import { Form, Button, Container, Card, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const handleClosePrivacy = () => setShowPrivacy(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // La lógica de administrador se puede mantener o migrar a un sistema de roles en el futuro
    if (email === 'admin@gmail.com' && password === '123') {
      // Este login es temporal y no genera token, se podría mejorar
      login('admin-token'); // Se pasa un token falso o se maneja diferente
      navigate('/admin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      if (response.data.success) {
        // El backend devuelve un token, lo pasamos a nuestro AuthContext
        login(response.data.token);
        navigate('/');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      const message = err.response?.data?.passwordincorrect || err.response?.data?.emailnotfound || 'Error al iniciar sesión';
      setError(message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 login-container">
      <Card className="login-card p-5 position-relative">
        <h2 className="text-center mb-4">INICIAR SESIÓN</h2>
        <p className="text-center mb-4 text-muted">
          Escribe tu correo electrónico y contraseña para iniciar sesión:
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mb-3">
            INICIAR SESIÓN
          </Button>
        </Form>

        <div className="text-center">
          <span className="text-muted">¿No tienes una cuenta? </span>
          <Link to="/Register">Registro</Link>
        </div>

        <div className="text-start mt-2">
          <Button
            className="privacy-button"
            style={{ all: 'unset', color: 'grey', fontSize: '0.8rem', cursor: 'pointer' }}
            onClick={() => setShowPrivacy(true)}
          >
            Privacy Policy
          </Button>
        </div>

       
        <Modal show={showPrivacy} onHide={handleClosePrivacy} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Aviso de Privacidad</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-justify" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <p><strong>STYLE CLINIC S.A.S.</strong>, ... </p> {/* Contenido del modal omitido por brevedad */}
          </Modal.Body>
        </Modal>
      </Card>
    </Container>
  );
}

export default Login;
