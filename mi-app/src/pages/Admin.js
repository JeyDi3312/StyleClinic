import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Form, Container, Alert, Card, Table, Spinner, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './Admin.css';

/**
 * Componente Admin
 * Panel de administración para gestionar productos y pedidos de la tienda.
 * Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre los productos
 * y visualizar los pedidos realizados por los usuarios.
 */
function Admin() {
  // 1. Estados del Componente
  const [products, setProducts] = useState([]); // Almacena la lista de productos.
  const [orders, setOrders] = useState([]); // Almacena la lista de pedidos.
  const [loading, setLoading] = useState(true); // Estado de carga para los productos.
  const [loadingOrders, setLoadingOrders] = useState(true); // Estado de carga para los pedidos.
  
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal.
  const [modalType, setModalType] = useState(''); // Define el tipo de contenido del modal (ej: 'product-add', 'order-detail').
  
  const [currentProduct, setCurrentProduct] = useState(null); // Producto seleccionado para editar o eliminar.
  const [currentOrder, setCurrentOrder] = useState(null); // Pedido seleccionado para ver detalles.
  const [formData, setFormData] = useState({ name: '', image: '', price: '', description: '', countInStock: '' }); // Datos del formulario para agregar/editar productos.

  const [error, setError] = useState(''); // Mensajes de error.
  const [success, setSuccess] = useState(''); // Mensajes de éxito.

  // Se crea una instancia de Axios con una URL base para simplificar las llamadas a la API.
  const api = axios.create({ baseURL: 'http://localhost:5000/api' });

  // 2. Funciones para Obtener Datos (Fetch)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products'); // Petición GET para obtener todos los productos.
      setProducts(data);
    } catch (err) {
      setError('Error al cargar los productos.');
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await api.get('/orders'); // Petición GET para obtener todos los pedidos.
      setOrders(data);
    } catch (err) {
      setError('Error al cargar las órdenes.');
    }
    setLoadingOrders(false);
  };

  // `useEffect` se ejecuta al montar el componente para cargar los datos iniciales.
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // `useMemo` se usa para calcular estadísticas. Solo se recalcula si `products` u `orders` cambian.
  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + (p.countInStock || 0), 0),
    totalOrders: orders.length,
    totalSales: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
  }), [products, orders]);

  // 3. Manejadores de Modales y Formularios
  const handleClose = () => {
    setShowModal(false);
    // Resetea todos los estados relacionados con el modal al cerrarlo.
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
      if (item) { // Si es para editar/eliminar, se carga la información del producto en el formulario.
        setCurrentProduct(item);
        setFormData({ name: item.name || '', image: item.image || '', price: item.price || '', description: item.description || '', countInStock: item.countInStock || '' });
      }
    } else if (type.startsWith('order')) {
      setCurrentOrder(item); // Si es para ver detalles de un pedido.
    }
    setShowModal(true);
  };

  // 4. Lógica CRUD para Productos
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const type = modalType.split('-')[1]; // 'add' o 'edit'
    // Se decide si la acción es un POST (agregar) o un PUT (actualizar).
    const action = type === 'add' ? api.post('/products', formData) : api.put(`/products/${currentProduct._id}`, formData);
    try {
      await action;
      setSuccess(`Producto ${type === 'add' ? 'creado' : 'actualizado'} con éxito.`);
      fetchProducts(); // Se vuelven a cargar los productos para reflejar los cambios.
      handleClose();
    } catch (err) { setError(`Error al ${type === 'add' ? 'crear' : 'actualizar'} el producto.`); }
  };

  const handleProductDelete = async () => {
    try {
      await api.delete(`/products/${currentProduct._id}`); // Petición DELETE para eliminar un producto.
      setSuccess('Producto eliminado con éxito.');
      fetchProducts();
      handleClose();
    } catch (err) { setError('Error al eliminar el producto.'); }
  };
  
  const handleMarkAsDelivered = () => {
    alert('Funcionalidad para marcar como enviado próximamente.');
    // Aquí iría la lógica para hacer un PUT a /api/orders/:id y actualizar el estado `isDelivered`.
  };

  // 5. Renderizado Dinámico del Contenido del Modal
  const renderModalContent = () => {
    if (modalType.startsWith('product')) {
      const type = modalType.split('-')[1];
      if (type === 'delete') return ( // Modal de confirmación para eliminar.
        <><Modal.Header closeButton><Modal.Title>Eliminar Producto</Modal.Title></Modal.Header><Modal.Body><p>¿Seguro que quieres eliminar <strong>{currentProduct?.name}</strong>?</p></Modal.Body><Modal.Footer><Button variant="secondary" onClick={handleClose}>Cancelar</Button><Button variant="danger" onClick={handleProductDelete}>Eliminar</Button></Modal.Footer></>
      );
      return ( // Modal con formulario para agregar o editar.
        <><Modal.Header closeButton><Modal.Title>{type === 'add' ? 'Agregar' : 'Editar'} Producto</Modal.Title></Modal.Header><Modal.Body><Form onSubmit={handleProductSubmit}><Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></Form.Group>{/* ... más campos ... */}<Button variant="dark" type="submit" className="w-100">Guardar</Button></Form></Modal.Body></>
      );
    }

    if (modalType === 'order-detail' && currentOrder) return ( // Modal para mostrar los detalles de un pedido.
        <>
        <Modal.Header closeButton><Modal.Title>Detalles del Pedido</Modal.Title></Modal.Header>
        <Modal.Body>{/* ... detalles del pedido ... */}</Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={handleClose}>Cerrar</Button>{/* ... */}</Modal.Footer>
        </>
    );
    return null;
  };

  // 6. Renderizado del Componente Principal
  return (
    <Container fluid className="admin-container-light">
      {/*Alertas de éxito y error*/}
      <div className="admin-header-light">
        <h1>Panel de Administrador</h1>
      </div>
      {/*Tarjetas de estadísticas*/}
      <Row className="mb-4">{/* ... */}</Row>
      {/*Tabla de Productos*/}
      <Card className="mb-4 products-card-light">
        <Card.Header as="h5">Catálogo de Productos<Button onClick={() => handleShow('product-add')}>+ Agregar</Button></Card.Header>
        <Card.Body>{/* ... */}</Card.Body>
      </Card>
      {/*Tabla de Pedidos*/}
      <Card className="products-card-light">
        <Card.Header as="h5">Gestión de Pedidos</Card.Header>
        <Card.Body>{/* ... */}</Card.Body>
      </Card>
      {/* El componente Modal de React-Bootstrap que se reutiliza para todo. */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">{renderModalContent()}</Modal>
    </Container>
  );
}

export default Admin;
