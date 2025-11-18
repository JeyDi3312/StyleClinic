import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasRedirected = useRef(false); // Ref para evitar doble alerta en modo estricto

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Efecto para mostrar alerta y redirigir si el usuario no está logueado
  useEffect(() => {
    if (!user && !hasRedirected.current) {
      hasRedirected.current = true; // Marcar que la redirección se ha iniciado
      alert('Tienes que iniciar sesión para continuar.');
      navigate('/login', { state: { from: '/placeorder' } });
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const placeOrderHandler = async () => {
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError('Por favor, completa todos los campos de la dirección de envío.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const orderData = {
        user: user.id,
        cart: cart,
        shippingAddress: shippingAddress,
        totalPrice: total,
      };

      await axios.post('http://localhost:5000/api/orders', orderData);

      setLoading(false);
      alert('¡Pedido realizado con éxito!');
      clearCart();
      navigate('/');
      
    } catch (err) {
      setLoading(false);
      setError('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
      console.error(err);
    }
  };

  // Si el usuario no está autenticado, no renderizar nada mientras se redirige
  if (!user) {
    return null;
  }

  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <h1>Finalizar Compra</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 2, marginRight: '2rem' }}>
          <h2>Dirección de Envío</h2>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label>Dirección</label>
              <input type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
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
        <div style={{ flex: 1 }}>
          <h2>Resumen del Pedido</h2>
          <div>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button 
            onClick={placeOrderHandler} 
            disabled={loading || cart.length === 0}
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
