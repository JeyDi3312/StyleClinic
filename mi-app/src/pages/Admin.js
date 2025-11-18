import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Form, Container, Alert, Card, Table, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Admin.css'; // Importa los estilos del tema claro

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete'
  
  const [currentProduct, setCurrentProduct] = useState(null);
  // El estado del formulario ya no incluye 'size'
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    countInStock: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/products',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/');
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los productos. Asegúrate de que el servidor backend esté corriendo.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + (product.countInStock || 0), 0);
    return { totalProducts, totalStock };
  }, [products]);

  const handleClose = () => {
    setShowModal(false);
    setModalType('');
    setCurrentProduct(null);
    // El formulario se resetea sin el campo 'size'
    setFormData({ name: '', image: '', price: '', description: '', countInStock: '' });
    setError('');
  };

  const handleShow = (type, product = null) => {
    setSuccess('');
    setModalType(type);
    if (product) {
      setCurrentProduct(product);
      // El formulario se rellena sin el campo 'size'
      setFormData({
        name: product.name || '',
        image: product.image || '',
        price: product.price || '',
        description: product.description || '',
        countInStock: product.countInStock || '',
      });
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // formData ya no contiene 'size', por lo que no se enviará
    const action = modalType === 'add' ? api.post('/', formData) : api.put(`/${currentProduct._id}`, formData);
    const successMsg = modalType === 'add' ? 'Producto creado exitosamente' : 'Producto actualizado exitosamente';

    try {
      await action;
      setSuccess(successMsg);
      fetchProducts();
      handleClose();
    } catch (err) {
      setError(`Error al ${modalType === 'add' ? 'crear' : 'actualizar'} el producto.`);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    try {
      await api.delete(`/${currentProduct._id}`);
      setSuccess('Producto eliminado exitosamente');
      fetchProducts();
      handleClose();
    } catch (err) {
      setError('Error al eliminar el producto.');
      console.error(err);
    }
  };

  const renderModalContent = () => {
    if (!modalType) return null;

    if (modalType === 'delete') {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>¿Estás seguro de que deseas eliminar el producto <strong>{currentProduct?.name}</strong>?</p>
            <p className="text-danger">Esta acción no se puede deshacer.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Definitivamente</Button>
          </Modal.Footer>
        </>
      );
    }

    if (modalType === 'add' || modalType === 'edit') {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'add' ? 'Agregar Nuevo' : 'Editar'} Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>URL de Imagen</Form.Label><Form.Control type="text" name="image" value={formData.image} onChange={handleChange} required /></Form.Group>
                <Row>
                    <Col><Form.Group className="mb-3"><Form.Label>Precio</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required /></Form.Group></Col>
                    <Col><Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required /></Form.Group></Col>
                    {/* El campo Talla ha sido eliminado del formulario */}
                </Row>
                <Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required /></Form.Group>
              <Button variant="dark" type="submit" className="w-100">{modalType === 'add' ? 'Guardar Producto' : 'Actualizar Cambios'}</Button>
            </Form>
          </Modal.Body>
        </>
      );
    }
    return null;
  };

  return (
    <Container fluid className="admin-container-light">
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {error && !showModal && <Alert variant="danger">{error}</Alert>}

      <div className="admin-header-light">
        <h1 className="display-5">Panel de Administrador</h1>
        <p className="fs-5">
          Bienvenido. Desde aquí puedes gestionar los productos, ver pedidos y administrar otros aspectos de la tienda.
        </p>
      </div>

      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="stat-card-light h-100">
            <Card.Body>
              <div className="stat-icon-light">📦</div>
              <div className="stat-info-light">
                <Card.Title>Total de Productos</Card.Title>
                <Card.Text>{stats.totalProducts}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="stat-card-light h-100">
            <Card.Body>
              <div className="stat-icon-light">📊</div>
              <div className="stat-info-light">
                <Card.Title>Unidades en Stock</Card.Title>
                <Card.Text>{stats.totalStock}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="stat-card-light h-100">
            <Card.Body>
              <div className="stat-icon-light">💵</div>
              <div className="stat-info-light">
                <Card.Title>Ventas (Próximamente)</Card.Title>
                <Card.Text>$0</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="products-card-light">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          Catálogo de Productos
          <Button variant="dark" onClick={() => handleShow('add')}>
            + Agregar Producto
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="dark" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <Table hover responsive className="m-0">
              <thead>
                <tr>
                  <th className="ps-3">Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  {/* La columna Talla ha sido eliminada de la tabla */}
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map(product => (
                  <tr key={product._id}>
                    <td className="ps-3">{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.countInStock}</td>
                    {/* La celda de la talla ha sido eliminada */}
                    <td className="text-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => handleShow('edit', product)} className="me-2">Editar</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleShow('delete', product)}>Eliminar</Button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No hay productos para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        {renderModalContent()}
      </Modal>
    </Container>
  );
}

export default Admin;
