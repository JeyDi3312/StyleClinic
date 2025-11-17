import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  // 1. Obtenemos el `total` directamente del contexto, ya no necesitamos la función local.
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="catalogo-custom text-center">
        <h3>Tu carrito está vacío</h3>
        <Link to="/Catalogo">
          <Button variant="dark" className="mt-3">Ver catálogo</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="Carrito-custom pt-5">
      <h3>Tu Carrito</h3>
      {/* 2. Usamos `cartItemId` como clave única para cada fila */}
      {cart.map((item) => (
        <Row key={item.cartItemId} className="align-items-center my-3 border-bottom pb-2">
          {item.isCustom ? (
            <>
              <Col xs={3}>
                {/* 3. Usamos los nuevos nombres de campo: image, name, price, size */}
                <Image src={item.image} fluid rounded />
              </Col>
              <Col xs={3}>
                <h5>{item.name} (Custom)</h5>
                <p>Color: {item.color}</p>
                <p>Diseño Frontal: {item.diseñoFrontal}</p>
                <p>Diseño Trasero: {item.diseñoTrasero}</p>
                <p>Talla: {item.size}</p>
              </Col>
            </>
          ) : (
            <>
              <Col xs={3}>
                <Image src={item.image} fluid rounded />
              </Col>
              <Col xs={3}>
                <h5>{item.name}</h5>
                {item.size && <p>Talla: {item.size}</p>}
              </Col>
            </>
          )}
          <Col xs={2}>
            <p>Cantidad: {item.quantity}</p>
          </Col>
          <Col xs={2}>
            {/* El precio ahora viene del campo `price` */}
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </Col>
          <Col xs={2}>
            {/* 4. La función de eliminar ahora usa `cartItemId` */}
            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.cartItemId)}>Eliminar</Button>
          </Col>
        </Row>
      ))}

      <div className="text-end mt-4">
        {/* 5. Usamos el `total` calculado en el contexto. */}
        <h4>Total: ${total.toFixed(2)}</h4>
        <Button variant="secondary" className="me-2" onClick={clearCart}>Vaciar carrito</Button>
        <Button variant="success">Proceder al pago</Button>
      </div>
    </Container>
  );
}

export default Cart;
