import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [showPrivacy, setShowPrivacy] = useState(false);
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

  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleClosePrivacy = () => setShowPrivacy(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviamos el objeto formData completo al backend
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('Usuario registrado:', response.data);
      setMensaje('Usuario registrado con éxito');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      const errMsg = error.response?.data?.email || error.response?.data?.message || error.response?.data || 'Error en el registro';
      setMensaje(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <p>Completa la información que se indica a continuación:</p>

      <form className="register-form" onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="id_usuario"
            onChange={handleChange}
            required
          />
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

      {mensaje && typeof mensaje === 'string' && (
        <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>
      )}

      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/Login">Iniciar sesión</Link>
      </p>

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
         {/* Contenido del modal omitido por brevedad */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
