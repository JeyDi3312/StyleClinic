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
      const response = await axios.post('http://localhost:8080/api/usuarios/register', formData);
      console.log('Usuario registrado:', response.data);
      setMensaje('Usuario registrado con éxito');
      setTimeout(() => {
        navigate ('/login');
      },1500);
      
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      const errMsg = error.response?.data?.message || error.response?.data || error.message || 'Error en el registro';
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
    </div>
  );
}

export default Register;
