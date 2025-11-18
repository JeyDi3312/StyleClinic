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
      if (product.isCustom) {
        const cartItemId = `custom-${Date.now()}`;
        return [...prev, { ...product, quantity: 1, cartItemId }];
      }

      const existing = prev.find(p => p._id === product._id && p.size === product.size);
      
      if (existing) {
        return prev.map(p => 
          p._id === product._id && p.size === product.size 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      
      // SOLUCIÓN: Construir un objeto limpio para el carrito
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity: 1,
        cartItemId: product._id + (product.size || ''),
      };

      return [...prev, newCartItem];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(p => p.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
