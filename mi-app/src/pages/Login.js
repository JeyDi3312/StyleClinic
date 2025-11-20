// Importaciones de React, hooks, Bootstrap y otros componentes.
import React, { useState } from 'react';
import { Form, Button, Container, Card, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Cliente HTTP para la llamada a la API de login.
import './Login.css';
import { useAuth } from '../context/AuthContext'; // Hook para acceder a la función de `login` del contexto.

/**
 * Componente Login
 * Renderiza un formulario para que los usuarios inicien sesión.
 * Maneja la lógica de la llamada a la API de autenticación y la gestión del estado de la UI (errores, etc.).
 */
function Login() {
  // 1. Estado local del componente.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(false); // Para el modal de privacidad.
  const handleClosePrivacy = () => setShowPrivacy(false);
  const [error, setError] = useState(''); // Para mostrar mensajes de error de la API.
  
  // 2. Hooks de navegación y autenticación.
  const navigate = useNavigate();
  const { login } = useAuth(); // Se obtiene la función `login` del AuthContext.

  /**
   * Maneja el envío del formulario de login.
   * @param {Event} e - El evento del formulario.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recarga de la página.
    setError(''); // Limpia errores anteriores al iniciar un nuevo intento.

    // Lógica de login para el administrador (caso especial)
    if (email === 'admin@gmail.com' && password === '123') {
      login('admin-token'); // Llama al `login` del contexto con un token falso.
      navigate('/admin'); // Redirige al panel de administrador.
      return;
    }

    // Lógica de login para usuarios estándar
    try {
      // a. Se realiza la llamada a la API usando axios.
      //    Es una petición POST al endpoint `/api/users/login`.
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email, // El cuerpo de la petición (payload) contiene el email y la contraseña.
        password
      });

      // b. Si la llamada es exitosa.
      if (response.data.success) {
        // El backend devuelve un objeto con `success: true` y un `token` JWT.
        // Se llama a la función `login` del AuthContext, pasándole el token recibido.
        // El AuthContext se encargará de guardar el token, decodificarlo y actualizar el estado de autenticación.
        login(response.data.token);
        navigate('/'); // Redirige al usuario a la página de inicio.
      } else {
        // Caso improbable si la API siempre devuelve errores con códigos 4xx/5xx.
        setError('Credenciales inválidas');
      }
    } catch (err) {
      // c. Si la llamada a la API falla.
      //    Se extrae el mensaje de error específico devuelto por el backend.
      //    La API puede devolver `passwordincorrect` o `emailnotfound`.
      const message = err.response?.data?.passwordincorrect || err.response?.data?.emailnotfound || 'Error al iniciar sesión';
      setError(message); // Se establece el mensaje de error para mostrarlo en la UI.
    }
  };

  // 3. Renderizado del componente.
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 login-container">
      <Card className="login-card p-5 position-relative">
        <h2 className="text-center mb-4">INICIAR SESIÓN</h2>
        <p className="text-center mb-4 text-muted">
          Escribe tu correo electrónico y contraseña para iniciar sesión:
        </p>

        {/* Muestra una alerta si hay un mensaje de error en el estado. */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          {/* Inputs controlados para email y contraseña */}
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

        {/* Modal para la política de privacidad */}
        <Modal show={showPrivacy} onHide={handleClosePrivacy} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Aviso de Privacidad</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-justify" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <p><strong>STYLE CLINIC S.A.S.</strong>, ... </p> {/ * Contenido del modal omitido por brevedad */}
          </Modal.Body>
        </Modal>
      </Card>
    </Container>
  );
}

export default Login;
