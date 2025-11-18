import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Form, Container, Alert, Card, Table, Spinner, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // e.g., 'product-add', 'order-detail'
  
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '', price: '', description: '', countInStock: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const api = axios.create({ baseURL: 'http://localhost:5000/api' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError('Error al cargar los productos.');
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      setError('Error al cargar las órdenes.');
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + (p.countInStock || 0), 0),
    totalOrders: orders.length,
    totalSales: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
  }), [products, orders]);

  const handleClose = () => {
    setShowModal(false);
    setModalType('');
    setCurrentProduct(null);
    setCurrentOrder(null);
    setFormData({ name: '', image: '', price: '', description: '', countInStock: '' });
    setError('');
  };

  const handleShow = (type, item = null) => {
    setError('');
    setSuccess('');
    setModalType(type);
    if (type.startsWith('product')) {
      if (item) {
        setCurrentProduct(item);
        setFormData({ name: item.name || '', image: item.image || '', price: item.price || '', description: item.description || '', countInStock: item.countInStock || '' });
      }
    } else if (type.startsWith('order')) {
      setCurrentOrder(item);
    }
    setShowModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const type = modalType.split('-')[1];
    const action = type === 'add' ? api.post('/products', formData) : api.put(`/products/${currentProduct._id}`, formData);
    try {
      await action;
      setSuccess(`Producto ${type === 'add' ? 'creado' : 'actualizado'} con éxito.`);
      fetchProducts();
      handleClose();
    } catch (err) { setError(`Error al ${type === 'add' ? 'crear' : 'actualizar'} el producto.`); }
  };

  const handleProductDelete = async () => {
    try {
      await api.delete(`/products/${currentProduct._id}`);
      setSuccess('Producto eliminado con éxito.');
      fetchProducts();
      handleClose();
    } catch (err) { setError('Error al eliminar el producto.'); }
  };
  
  // Aquí irá la lógica para marcar como enviado
  const handleMarkAsDelivered = () => {
    alert('Funcionalidad para marcar como enviado próximamente.');
    // Lógica para actualizar la orden en el backend y luego en el estado
  };

  const renderModalContent = () => {
    if (modalType.startsWith('product')) {
      const type = modalType.split('-')[1];
      if (type === 'delete') return (
        <><Modal.Header closeButton><Modal.Title>Eliminar Producto</Modal.Title></Modal.Header><Modal.Body><p>¿Seguro que quieres eliminar <strong>{currentProduct?.name}</strong>?</p></Modal.Body><Modal.Footer><Button variant="secondary" onClick={handleClose}>Cancelar</Button><Button variant="danger" onClick={handleProductDelete}>Eliminar</Button></Modal.Footer></>
      );
      return (
        <><Modal.Header closeButton><Modal.Title>{type === 'add' ? 'Agregar' : 'Editar'} Producto</Modal.Title></Modal.Header><Modal.Body><Form onSubmit={handleProductSubmit}><Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></Form.Group><Form.Group className="mb-3"><Form.Label>URL de Imagen</Form.Label><Form.Control type="text" name="image" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required /></Form.Group><Row><Col><Form.Group className="mb-3"><Form.Label>Precio</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required /></Form.Group></Col><Col><Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" name="countInStock" value={formData.countInStock} onChange={(e) => setFormData({...formData, countInStock: e.target.value})} required /></Form.Group></Col></Row><Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required /></Form.Group><Button variant="dark" type="submit" className="w-100">Guardar</Button></Form></Modal.Body></>
      );
    }

    if (modalType === 'order-detail' && currentOrder) return (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><strong>ID del Pedido:</strong> {currentOrder._id}</p>
            <p><strong>Fecha:</strong> {new Date(currentOrder.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${currentOrder.totalPrice.toFixed(2)}</p>
            <hr />
            <h6><strong>Dirección de Envío</strong></h6>
            <p className="mb-0">{currentOrder.shippingAddress.address}</p>
            <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}, {currentOrder.shippingAddress.country}</p>
            <hr />
            <h6><strong>Artículos del Pedido</strong></h6>
            <ListGroup variant="flush">
            {currentOrder.orderItems.map(item => (
                <ListGroup.Item key={item.product} className="d-flex justify-content-between align-items-center">
                <span>
                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '15px' }} />
                    {item.name} (x{item.quantity})
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button variant="success" onClick={handleMarkAsDelivered} disabled={currentOrder.isDelivered}>
                {currentOrder.isDelivered ? 'Ya fue Enviado' : 'Marcar como Enviado'}
            </Button>
        </Modal.Footer>
        </>
    );
    return null;
  };

  return (
    <Container fluid className="admin-container-light">
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {error && !showModal && <Alert variant="danger">{error}</Alert>}

      <div className="admin-header-light">
        <h1 className="display-5">Panel de Administrador</h1>
        <p className="fs-5">Gestión de productos, pedidos y estadísticas de la tienda.</p>
      </div>

      <Row className="mb-4">
          <Col md={3}><Card className="stat-card-light h-100"><Card.Body><div className="stat-icon-light">📦</div><div className="stat-info-light"><Card.Title>Total Productos</Card.Title><Card.Text>{stats.totalProducts}</Card.Text></div></Card.Body></Card></Col>
          <Col md={3}><Card className="stat-card-light h-100"><Card.Body><div className="stat-icon-light">📊</div><div className="stat-info-light"><Card.Title>Unidades en Stock</Card.Title><Card.Text>{stats.totalStock}</Card.Text></div></Card.Body></Card></Col>
          <Col md={3}><Card className="stat-card-light h-100"><Card.Body><div className="stat-icon-light">🛒</div><div className="stat-info-light"><Card.Title>Total Órdenes</Card.Title><Card.Text>{stats.totalOrders}</Card.Text></div></Card.Body></Card></Col>
          <Col md={3}><Card className="stat-card-light h-100"><Card.Body><div className="stat-icon-light">💵</div><div className="stat-info-light"><Card.Title>Ventas Totales</Card.Title><Card.Text>${stats.totalSales.toFixed(2)}</Card.Text></div></Card.Body></Card></Col>
      </Row>

      <Card className="mb-4 products-card-light">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">Catálogo de Productos<Button variant="dark" onClick={() => handleShow('product-add')}>+ Agregar Producto</Button></Card.Header>
        <Card.Body className="p-0">{loading ? <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div> : <Table hover responsive className="m-0"><thead><tr><th className="ps-3">Nombre</th><th>Precio</th><th>Stock</th><th className="text-center">Acciones</th></tr></thead><tbody>{products.length > 0 ? products.map(p => (<tr key={p._id}><td className="ps-3">{p.name}</td><td>${p.price}</td><td>{p.countInStock}</td><td className="text-center"><Button variant="outline-secondary" size="sm" onClick={() => handleShow('product-edit', p)} className="me-2">Editar</Button><Button variant="outline-danger" size="sm" onClick={() => handleShow('product-delete', p)}>Eliminar</Button></td></tr>)) : <tr><td colSpan="4" className="text-center py-4">No hay productos.</td></tr>}</tbody></Table>}</Card.Body>
      </Card>

      <Card className="products-card-light">
        <Card.Header as="h5">Gestión de Pedidos</Card.Header>
        <Card.Body className="p-0">{loadingOrders ? <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div> : <Table hover responsive className="m-0"><thead><tr><th className="ps-3">Fecha</th><th>Cliente/Envío</th><th>Total</th><th>Pagado</th><th>Enviado</th><th className="text-center">Acciones</th></tr></thead><tbody>{orders.length > 0 ? orders.map(o => (<tr key={o._id}><td className="ps-3">{new Date(o.createdAt).toLocaleDateString()}</td><td>{o.shippingAddress.address}, {o.shippingAddress.city}</td><td>${o.totalPrice.toFixed(2)}</td><td><Badge bg={o.isPaid ? 'success' : 'warning'}>{o.isPaid ? 'Sí' : 'No'}</Badge></td><td><Badge bg={o.isDelivered ? 'success' : 'warning'}>{o.isDelivered ? 'Sí' : 'No'}</Badge></td><td className="text-center"><Button variant="outline-primary" size="sm" onClick={() => handleShow('order-detail', o)}>Ver Detalles</Button></td></tr>)) : <tr><td colSpan="6" className="text-center py-4">No hay pedidos.</td></tr>}</tbody></Table>}</Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered size="lg">{renderModalContent()}</Modal>
    </Container>
  );
}

export default Admin;
