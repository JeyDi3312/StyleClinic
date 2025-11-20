// Importaciones de React, hooks, axios y otros componentes.
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Cliente HTTP para realizar peticiones al backend.
import { useCart } from '../context/CartContext'; // Hook para acceder al estado del carrito (artículos, total, etc.).
import { useAuth } from '../context/AuthContext'; // Hook para acceder al estado de autenticación (información del usuario).
import { useNavigate } from 'react-router-dom'; // Hook para la navegación programática.

/**
 * Componente PlaceOrder
 * Esta página maneja el paso final del proceso de compra.
 * Recopila la dirección de envío del usuario, muestra un resumen del pedido y envía la orden al backend.
 */
const PlaceOrder = () => {
  // 1. Extracción de datos y funciones de los contextos.
  const { cart, clearCart, total } = useCart(); // Del contexto del carrito.
  const { user } = useAuth(); // Del contexto de autenticación.
  const navigate = useNavigate(); // Función para redirigir.
  const hasRedirected = useRef(false); // Ref para controlar la redirección y evitar bucles o dobles ejecuciones en React.StrictMode.

  // 2. Estado local del componente.
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga mientras se procesa el pedido.
  const [error, setError] = useState(''); // Para mostrar mensajes de error al usuario.

  // 3. Hook de Efecto (`useEffect`) para la Protección de la Ruta.
  // Se ejecuta cuando el componente se monta o cuando `user` o `navigate` cambian.
  useEffect(() => {
    // Si no hay un usuario logueado y la redirección aún no se ha iniciado.
    if (!user && !hasRedirected.current) {
      hasRedirected.current = true; // Marca que la redirección está en proceso.
      alert('Tienes que iniciar sesión para continuar.');
      // Redirige al usuario a la página de login. El `state` adicional permite
      // que la página de login pueda devolver al usuario a esta página después de un inicio de sesión exitoso.
      navigate('/login', { state: { from: '/placeorder' } });
    }
  }, [user, navigate]);

  /**
   * Maneja los cambios en los campos del formulario de dirección.
   * @param {Event} e - El evento de cambio del input.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  /**
   * Maneja la sumisión del pedido.
   * Se ejecuta cuando el usuario hace clic en "Confirmar Pedido".
   */
  const placeOrderHandler = async () => {
    // Validación simple del formulario.
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError('Por favor, completa todos los campos de la dirección de envío.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // a. Se construye el objeto `orderData` que se enviará al backend.
      //    Es crucial que esta estructura coincida con la que espera la API en `orderRoutes.js`.
      const orderData = {
        user: user.id, // ID del usuario autenticado.
        cart: cart, // El array completo de artículos en el carrito.
        shippingAddress: shippingAddress, // La dirección de envío del formulario.
        totalPrice: total, // El precio total calculado por el CartContext.
      };

      // b. Se realiza la petición POST a la API para crear la orden.
      await axios.post('http://localhost:5000/api/orders', orderData);

      // c. Si la petición es exitosa:
      setLoading(false);
      alert('¡Pedido realizado con éxito!');
      clearCart(); // Se vacía el carrito a través del context.
      navigate('/'); // Se redirige al usuario a la página de inicio.
      
    } catch (err) {
      // d. Si hay un error en la petición:
      setLoading(false);
      setError('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
      console.error(err);
    }
  };

  // Si el usuario no está autenticado, no se renderiza nada (ya que el useEffect se encargará de la redirección).
  if (!user) {
    return null;
  }

  // 4. Renderizado del componente.
  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <h1>Finalizar Compra</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Columna izquierda: Formulario de envío */}
        <div style={{ flex: 2, marginRight: '2rem' }}>
          <h2>Dirección de Envío</h2>
          <form>
            {/* Inputs controlados para la dirección */}
            <div style={{ marginBottom: '1rem' }}>
              <label>Dirección</label>
              <input type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            {/* más inputs para ciudad, código postal, país */}
            <div style={{ marginBottom: '1rem' }}>
              <label>Ciudad</label>
              <input type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Código Postal</label>
              <input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>País</label>
              <input type="text" name="country" value={shippingAddress.country} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
          </form>
        </div>
        {/* Columna derecha: Resumen del pedido */}
        <div style={{ flex: 1 }}>
          <h2>Resumen del Pedido</h2>
          <div>
            {/* Mapeo del carrito para mostrar cada artículo y su subtotal */}
            {cart.map((item) => (
              <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/ * Muestra de errores */}
          <button 
            onClick={placeOrderHandler} 
            disabled={loading || cart.length === 0} // El botón se deshabilita durante la carga o si el carrito está vacío.
            style={{ width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
