import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      
      if (product.isCustom) {
        return [...prev, { ...product, quantity: 1 }];
      }

     
      const existing = prev.find(p => p.idproducto === product.idproducto && p.talla === product.talla);
      if (existing) {
        return prev.map(p => 
          p.idproducto === product.idproducto && p.talla === product.talla 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(p => p.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + parseFloat(item.priceproducto) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
