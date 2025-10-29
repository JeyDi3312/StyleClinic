import React, { useState } from 'react';
import { Form, Button, Container, Card, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const handleClosePrivacy = () => setShowPrivacy(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        email,
        password
      });

      if (response.status === 200) {

        const usuarios = response.data;
        console.log('Usuario autenticado: ', usuarios)
        
        localStorage.setItem('usuario', JSON.stringify(usuarios));


        navigate('/');

        
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
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
            <p><strong>STYLE CLINIC S.A.S.</strong>, identificada en su condición de responsable y/o encargada del tratamiento de datos de carácter personal, informa a sus clientes, colaboradores, contratistas y/o proveedores, y en general a todas las personas que hayan facilitado o que en el futuro faciliten sus datos de carácter personal, que los mismos serán incorporados a la BASE DE DATOS titularidad de la empresa.</p>
            
            <p><strong>STYLE CLINIC S.A.S.</strong> informa que en cumplimiento de la Ley 1581 de 2012 ha adoptado las medidas legales, técnicas y organizativas necesarias para evitar la pérdida, acceso o alteración de los datos personales a los que da tratamiento. Así mismo, su objetivo es garantizar la seguridad e integridad de estos datos durante todo el tratamiento ejercido.</p>

            <h5>Clientes</h5>
            <ul>
              <li>Gestionar los datos personales de los clientes actuales y futuros de los servicios ofrecidos.</li>
              <li>Gestionar los procesos de pago y cobro.</li>
              <li>Enviar comunicaciones comerciales y publicitarias por cualquier medio.</li>
              <li>Elaboración de encuestas de satisfacción y entrevistas de opinión.</li>
              <li>Almacenamiento de fotografías, datos biométricos y documentos personales para autenticar identidad.</li>
            </ul>

            <h5>Contratistas y/o Proveedores</h5>
            <ul>
              <li>Garantizar la correcta integración de los datos y expedientes.</li>
              <li>Gestionar la compra de productos y servicios.</li>
              <li>Procesos de selección, evaluación y adjudicación de contratos.</li>
              <li>Realizar pagos a contratistas y/o proveedores.</li>
              <li>Controlar el acceso físico y lógico a instalaciones y activos.</li>
            </ul>

            <h5>Empleados</h5>
            <ul>
              <li>Gestionar procesos de reclutamiento, contratación, comunicaciones internas.</li>
              <li>Gestionar participación en programas corporativos o sociales.</li>
              <li>Controlar asistencia, desempeño, acceso a instalaciones y activos.</li>
              <li>Administrar cuentas bancarias para nómina y beneficios laborales.</li>
              <li>Gestionar capacitación y evaluación de habilidades y competencias.</li>
            </ul>

            <p><strong>STYLE CLINIC S.A.S.</strong> garantiza el ejercicio de los derechos de acceso, rectificación y cancelación en los términos previstos en la normatividad vigente. Estos podrán ser solicitados por correo electrónico a la dirección <strong>juridico@styleclinic.com.co</strong>. El titular podrá ejercer sus derechos constitucionales relacionados con la protección de datos personales dirigiéndose a <strong>juridico@styleclinic.com.co</strong> indicando en el asunto el derecho que desea ejercer.</p>
          </Modal.Body>
        </Modal>
      </Card>
    </Container>
  );
}

export default Login;