// Importaciones necesarias de React, hooks, componentes de Bootstrap y estilos.
import React from 'react';
import { useCart } from '../context/CartContext'; // Hook para acceder al estado global del carrito.
import { Container, Row, Col, Button, Image } from 'react-bootstrap'; // Componentes para la maquetación.
import { Link, useNavigate } from 'react-router-dom'; // Para la navegación.
import './Cart.css'; // Estilos específicos del carrito.

/**
 * Componente Cart
 * Esta página muestra el contenido del carrito de compras del usuario.
 * Permite ver los productos (estándar y personalizados), modificar la cantidad (implícitamente),
 * eliminar productos y proceder al pago.
 */
function Cart() {
  // 1. Se extraen los datos y funciones del contexto del carrito usando el hook `useCart`.
  // - `cart`: El array de objetos que representan los artículos en el carrito.
  // - `removeFromCart`: Función para eliminar un artículo específico del carrito.
  // - `clearCart`: Función para vaciar completamente el carrito.
  // - `total`: El precio total calculado de todos los artículos en el carrito.
  const { cart, removeFromCart, clearCart, total } = useCart(); 
  
  // El hook `useNavigate` proporciona una función para redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // 2. Función para manejar la finalización de la compra.
  //    Redirige al usuario a la página de formalización del pedido (`/placeorder`).
  const handleCheckout = () => {
    navigate('/placeorder');
  };

  // 3. Renderizado condicional: Si el carrito está vacío.
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

  // 4. Renderizado principal: Si hay artículos en el carrito.
  return (
    <Container className="Carrito-custom pt-5">
      <h3>Tu Carrito</h3>
      {/* Se itera sobre cada `item` en el array `cart` para mostrarlo. */}
      {cart.map((item) => (
        // `cartItemId` es un identificador único para cada artículo en el carrito, crucial para el `key` y para eliminar.
        <Row key={item.cartItemId} className="align-items-center my-3 border-bottom pb-2">
          
          {/* 5. Diferenciación entre producto personalizado y estándar. */}
          {item.isCustom ? (
            // CASO A: El artículo es PERSONALIZADO.
            <>
              <Col xs={3}>
                <Image src={item.image} fluid rounded />
              </Col>
              <Col xs={3}>
                <h5>{item.name} (Custom)</h5>
                {/* Se muestran los detalles específicos de la personalización. */}
                <p>Color: {item.color}</p>
                <p>Diseño Frontal: {item.diseñoFrontal}</p>
                <p>Diseño Trasero: {item.diseñoTrasero}</p>
                <p>Talla: {item.size}</p>
              </Col>
            </>
          ) : (
            // CASO B: El artículo es ESTÁNDAR.
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
          
          {/* Columnas comunes para ambos tipos de productos. */}
          <Col xs={2}>
            <p>Cantidad: {item.quantity}</p>
          </Col>
          <Col xs={2}>
            {/* Se calcula el subtotal por artículo. */}
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </Col>
          <Col xs={2}>
            {/* El botón de eliminar llama a `removeFromCart` con el ID único del artículo. */}
            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.cartItemId)}>Eliminar</Button>
          </Col>
        </Row>
      ))}

      {/* Resumen final del carrito. */}
      <div className="text-end mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <Button variant="secondary" className="me-2" onClick={clearCart}>Vaciar carrito</Button>
        <Button variant="success" onClick={handleCheckout}>Proceder al pago</Button>
      </div>
    </Container>
  );
}

export default Cart;
