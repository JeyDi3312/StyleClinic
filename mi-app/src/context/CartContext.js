// Importaciones de React: createContext, useContext, useState, useEffect son hooks esenciales para el manejo de estado y contexto.
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Creación del Contexto
// createContext() crea un objeto de contexto. Cuando React renderiza un componente que se suscribe a este objeto,
// leerá el valor de contexto actual del Provider más cercano en el árbol.
const CartContext = createContext();

// 2. Hook Personalizado (Custom Hook)
// Se crea un hook `useCart` para simplificar el acceso al contexto del carrito.
// En lugar de que cada componente tenga que importar `useContext` y `CartContext`, solo necesitarán importar `useCart()`.
export const useCart = () => useContext(CartContext);

/**
 * 3. Componente Proveedor (Provider Component)
 * El `CartProvider` es un componente que envolverá a otros componentes (en este caso, a toda la aplicación).
 * Su propósito es gestionar el estado y la lógica del carrito y proveerlos a todos sus hijos.
 * @param {object} props - Las props del componente, `children` representa los componentes hijos.
 */
export const CartProvider = ({ children }) => {
  // 4. Hook de Estado (`useState`) con Inicialización Diferida y Persistencia
  // Se inicializa el estado `cart`.
  // La función dentro de `useState` se ejecuta solo en el montaje inicial del componente.
  // Esto es una optimización para evitar leer de localStorage en cada renderizado.
  const [cart, setCart] = useState(() => {
    try {
      // Intenta obtener el carrito guardado desde localStorage.
      const saved = localStorage.getItem('cart');
      // Si existe, lo parsea de JSON a un objeto JavaScript. Si no, devuelve un array vacío.
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      // Si hay un error al parsear (ej: localStorage corrupto), se loguea y se devuelve un array vacío.
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // 5. Hook de Efecto (`useEffect`) para Sincronizar con localStorage
  // Este efecto se ejecuta cada vez que el estado `cart` cambia.
  // Su función es guardar el estado actual del carrito en localStorage, asegurando la persistencia de los datos
  // incluso si el usuario cierra la pestaña o el navegador.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // El array de dependencias `[cart]` asegura que el efecto solo se ejecute si `cart` cambia.

  /**
   * Función para añadir un producto al carrito.
   * @param {object} product - El objeto del producto a añadir.
   */
  const addToCart = (product) => {
    // Se utiliza la forma funcional de `setCart` para garantizar que se trabaja con el estado más reciente (`prev`).
    setCart(prev => {
      // CASO A: El producto es PERSONALIZADO.
      if (product.isCustom) {
        // Los productos personalizados siempre se añaden como un nuevo artículo, ya que son únicos.
        // Se genera un `cartItemId` único usando la fecha actual para poder identificarlo y eliminarlo después.
        const cartItemId = `custom-${Date.now()}`;
        return [...prev, { ...product, quantity: 1, cartItemId }];
      }

      // CASO B: El producto es ESTÁNDAR.
      // Se busca si ya existe un producto con el mismo ID y la misma talla.
      const existing = prev.find(p => p._id === product._id && p.size === product.size);
      
      if (existing) {
        // Si ya existe, se actualiza la cantidad de ese producto.
        // Se mapea el carrito: si el item coincide, se crea un nuevo objeto con la cantidad incrementada.
        // Si no coincide, se devuelve el item sin cambios.
        return prev.map(p => 
          p._id === product._id && p.size === product.size 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      
      // Si el producto estándar no existe en el carrito, se añade como un nuevo artículo.
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity: 1,
        // Se crea un `cartItemId` combinando el ID del producto y la talla. Esto asegura que
        // el mismo producto con tallas diferentes se trate como artículos distintos.
        cartItemId: product._id + (product.size || ''),
      };

      return [...prev, newCartItem];
    });
  };

  /**
   * Función para eliminar un artículo del carrito.
   * @param {string} cartItemId - El ID único del artículo en el carrito.
   */
  const removeFromCart = (cartItemId) => {
    // Se filtran los artículos, manteniendo solo aquellos cuyo `cartItemId` no coincida con el proporcionado.
    setCart(prev => prev.filter(p => p.cartItemId !== cartItemId));
  };

  /**
   * Función para vaciar completamente el carrito.
   */
  const clearCart = () => setCart([]);

  // 6. Cálculo del Total
  // Se usa `reduce` para iterar sobre el carrito y sumar los subtotales (precio * cantidad) de cada artículo.
  // `|| 0` se usa como salvaguarda en caso de que `item.price` sea undefined.
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  // 7. Proveer el Contexto
  // El componente `Provider` recibe un `value` prop. Todos los componentes hijos que usen el hook `useCart`
  // tendrán acceso a este objeto `value`.
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
