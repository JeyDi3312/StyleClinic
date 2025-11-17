import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      // Caso para productos customizados (asume que tienen un ID único)
      if (product.isCustom) {
        // Generamos un ID único para el item del carrito para evitar colisiones
        const cartItemId = `custom-${Date.now()}`;
        return [...prev, { ...product, quantity: 1, cartItemId }];
      }

      // Lógica para productos estándar
      // Buscamos por _id y size (el nuevo formato)
      const existing = prev.find(p => p._id === product._id && p.size === product.size);
      
      if (existing) {
        // Si ya existe, incrementamos la cantidad
        return prev.map(p => 
          p._id === product._id && p.size === product.size 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      
      // Si es nuevo, lo agregamos al carrito con un ID único para el carrito
      const cartItemId = product._id + (product.size || '');
      return [...prev, { ...product, quantity: 1, cartItemId }];
    });
  };

  // La función ahora usa un `cartItemId` único para eliminar el item correcto
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(p => p.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  // Calculamos el total usando la nueva propiedad `price`
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
