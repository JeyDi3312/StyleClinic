// Importaciones de React, hooks y componentes de terceros.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // Cliente HTTP para realizar la petición de registro a la API.
import './Register.css';

/**
 * Componente Register
 * Proporciona un formulario para que nuevos usuarios se registren en la aplicación.
 * Recopila los datos del usuario y los envía al backend para crear una nueva cuenta.
 */
function Register() {
  // 1. Estado local del componente.
  const [showPrivacy, setShowPrivacy] = useState(false); // Para el modal de privacidad.
  
  // `formData` almacena todos los valores del formulario en un único objeto.
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    id_usuario: '',
    password: '',
    direccion: '',
    telefono: '',
    city: '',
    country: ''
  });

  // `mensaje` almacena los mensajes de feedback (éxito o error) para el usuario.
  const [mensaje, setMensaje] = useState('');

  // Hook para la navegación programática.
  const navigate = useNavigate();

  const handleClosePrivacy = () => setShowPrivacy(false);

  /**
   * Manejador genérico para actualizar el estado `formData` cuando el usuario escribe en un input.
   * @param {Event} e - El evento de cambio del input.
   */
  const handleChange = (e) => {
    // Se utiliza el `name` del input para saber qué propiedad del objeto `formData` actualizar.
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /**
   * Maneja el envío del formulario de registro.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página.

    try {
      // a. Se realiza la petición POST a la API con los datos del formulario.
      //    El endpoint es `/api/users/register`.
      //    El cuerpo de la petición es el objeto `formData` completo.
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      
      // b. Si la petición es exitosa:
      console.log('Usuario registrado:', response.data);
      setMensaje('Usuario registrado con éxito');
      
      // Se establece un temporizador para redirigir al usuario a la página de login después de 1.5 segundos,
      // dándole tiempo para leer el mensaje de éxito.
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      // c. Si la petición falla:
      console.error('Error en el registro:', error.response?.data || error.message);
      // Se intenta extraer un mensaje de error específico de la respuesta de la API.
      // Esto es útil para informar al usuario si, por ejemplo, el correo electrónico ya está en uso.
      const errMsg = error.response?.data?.email || error.response?.data?.message || error.response?.data || 'Error en el registro';
      setMensaje(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)); // Se muestra el error en la UI.
    }
  };

  // 3. Renderizado del componente.
  return (
    <div className="register-container">
      <h2>Registro</h2>
      <p>Completa la información que se indica a continuación:</p>

      <form className="register-form" onSubmit={handleSubmit}>
        {/* Inputs del formulario. Cada uno está asociado a una propiedad de `formData` mediante su `name`. */}
        <div>
          <label>Nombre</label>
          <input type="text" name="nombre" onChange={handleChange} required />
        </div>

        <div>
          <label>Apellidos</label>
          <input type="text" name="apellido" onChange={handleChange} required />
        </div>

        <div>
          <label>Correo electrónico</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
     
        <div>
          <label>Identificación</label>
          <input type="text" name="id_usuario" onChange={handleChange} required />
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <div>
          <label>Dirección</label>
          <input type="text" name="direccion" onChange={handleChange} />
        </div>

        <div>
          <label>Teléfono</label>
          <input type="text" name="telefono" onChange={handleChange} />
        </div>

        <div>
          <label>Ciudad</label>
          <input type="text" name="city" onChange={handleChange} />
        </div>

        <div>
          <label>País</label>
          <input type="text" name="country" onChange={handleChange} />
        </div>

        <button className="black-button" type="submit">Crear cuenta</button>
      </form>

      {/* Muestra el mensaje de feedback (éxito o error) */}
      {mensaje && typeof mensaje === 'string' && (
        <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>
      )}

      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/Login">Iniciar sesión</Link>
      </p>

      {/* Botón y Modal para la política de privacidad */}
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
