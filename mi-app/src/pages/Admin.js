import React, { useState } from 'react';
import { Button, Modal, Form, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import './Custom.css';
import { useAuth } from '../context/AuthContext';

function Admin() {
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState({
    nombreproducto: '',
    imageproducto: '',
    priceproducto: '',
    descriptionproducto: '',
    cantidadproducto: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetState = () => {
    setError('');
    setSuccess('');
    setProductId('');
    setProduct({
      nombreproducto: '',
      imageproducto: '',
      priceproducto: '',
      descriptionproducto: '',
      cantidadproducto: ''
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    resetState();
  };
  const handleEditModalShow = () => setShowEditModal(true);

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    resetState();
  };
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = async () => {
    setError('');
    setProduct({ nombreproducto: '' }); 
    try {
      const response = await axios.get(`http://localhost:8080/api/productos/${productId}`);
      setProduct(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Producto inexistente');
      } else {
        setError('Error al buscar el producto');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8080/api/productos', product);
      if (response.status === 201) {
        setSuccess('Producto creado exitosamente');
        resetState();
        handleClose();
      }
    } catch (err) {
      setError('Error al crear el producto');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(`http://localhost:8080/api/productos/${productId}`, product);
      setSuccess('Producto actualizado exitosamente');
      resetState();
      handleEditModalClose();
    } catch (err) {
      setError('Error al actualizar el producto');
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://localhost:8080/api/productos/${productId}`);
      setSuccess('Producto eliminado exitosamente');
      resetState();
      handleDeleteModalClose();
    } catch (err) {
      setError('Error al eliminar el producto');
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid className="py-5">
          <h1 className="display-5 fw-bold">Panel de administrador</h1>
          <p className="col-md-8 fs-4">
            Este es el panel de administrador. Desde aquí puedes gestionar los productos, ver pedidos y administrar otros aspectos de la tienda.
          </p>
        </Container>
      </div>

      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Header as="h5">Acciones Rápidas</Card.Header>
        <Card.Body>
          <Card.Title>Gestión de Productos</Card.Title>
          <Card.Text>
            Añade, edita o elimina productos del catálogo de la tienda.
          </Card.Text>
          <div className="d-flex flex-column">
            <Button variant="dark" onClick={handleShow} className="mb-2">
              Agregar Producto
            </Button>
            <Button variant="dark" onClick={handleEditModalShow} className="mb-2">
              Editar Producto
            </Button>
            <Button variant="dark" onClick={handleDeleteModalShow}>
              Eliminar Producto
            </Button>
          </div>
        </Card.Body>
      </Card>

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control type="text" name="nombreproducto" value={product.nombreproducto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductImage">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control type="text" name="imageproducto" value={product.imageproducto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="priceproducto" value={product.priceproducto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descriptionproducto" value={product.descriptionproducto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" name="cantidadproducto" value={product.cantidadproducto} onChange={handleChange} required />
            </Form.Group>
            <Button variant="dark" type="submit">
              Guardar Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="edit-productId">
              <Form.Label>ID del Producto</Form.Label>
              <div className="d-flex">
                <Form.Control type="text" value={productId} onChange={handleIdChange} required className="me-2" />
                <Button variant="dark" onClick={handleFetchProduct}>Buscar</Button>
              </div>
            </Form.Group>

            {product.nombreproducto && (
              <>
                <Form.Group className="mb-3" controlId="formProductName-edit">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control type="text" name="nombreproducto" value={product.nombreproducto} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductImage-edit">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control type="text" name="imageproducto" value={product.imageproducto} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductPrice-edit">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="number" name="priceproducto" value={product.priceproducto} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductDescription-edit">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3} name="descriptionproducto" value={product.descriptionproducto} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductQuantity-edit">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control type="number" name="cantidadproducto" value={product.cantidadproducto} onChange={handleChange} required />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Actualizar Producto
                </Button>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="delete-productId">
            <Form.Label>ID del Producto</Form.Label>
            <div className="d-flex">
              <Form.Control type="text" value={productId} onChange={handleIdChange} required className="me-2" />
              <Button variant="dark" onClick={handleFetchProduct}>Buscar</Button>
            </div>
          </Form.Group>

          {product.nombreproducto && (
            <div>
              <h5>{product.nombreproducto}</h5>
              <p><strong>ID:</strong> {product.idproducto}</p>
              <p><strong>Precio:</strong> ${product.priceproducto}</p>
              <p><strong>Cantidad:</strong> {product.cantidadproducto}</p>
              <p><strong>Descripción:</strong> {product.descriptionproducto}</p>
              <img src={product.imageproducto} alt={product.nombreproducto} style={{ maxWidth: '100px' }} />
              <hr />
              <p className="text-danger">¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
              <Button variant="danger" onClick={handleDelete}>Eliminar Definitivamente</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Admin;
