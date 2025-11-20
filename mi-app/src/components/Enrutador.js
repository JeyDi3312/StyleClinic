// Importaciones necesarias de react-router-dom para manejar el enrutamiento de la aplicación.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de las diferentes páginas (vistas completas) de la aplicación.
import Home from '../pages/Home';
import Login from '../pages/Login';
import Catalogo from '../pages/Catalogo';
import Contact from '../pages/Contact';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Custom from '../pages/Custom';
import Admin from '../pages/Admin';
import PlaceOrder from '../pages/PlaceOrder'; 

// Importación de componentes reutilizables.
import MainNavBar from './MainNavBar'; // La barra de navegación principal.
import Footer from './Footer'; // El pie de página.
import ProductDetail from './ProductDetail'; // Componente para mostrar el detalle de un producto.

// Importación del proveedor de contexto del carrito.
import { CartProvider } from '../context/CartContext';

/**Componente Enrutador
 * Este es el componente central que define la estructura de navegación de toda la aplicación de React.
 * Utiliza react-router-dom para asociar URLs (rutas) a componentes específicos que deben renderizarse.
 */
function Enrutador() {
    return (
     // 1. CartProvider: Este es un componente de CONTEXTO.
     // Al envolver toda la aplicación con <CartProvider>, CUALQUIER componente hijo
     // (sin importar qué tan profundo esté anidado) podrá acceder al estado global del carrito
     // (ej: la lista de productos, el total, la función para añadir al carrito, etc.).
     <CartProvider>
      {/* 2. Router (BrowserRouter): Activa el enrutamiento del lado del cliente. */}
      <Router>
        {/* 3. MainNavBar: Este componente se renderiza en TODAS las páginas porque está fuera del <Routes>.
            Es ideal para elementos comunes como la barra de navegación principal. */}
        <MainNavBar />
        
        {/* 4. Routes: Este componente actúa como un contenedor para todas las rutas individuales. 
            Se asegura de que solo una ruta se renderice a la vez. */}
        <Routes>
          {/* Cada <Route> mapea una URL (path) a un componente específico (element). */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Catalogo' element={<Catalogo />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Register' element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          
          {/* Ruta dinámica: El ':id' es un parámetro. React Router renderizará ProductDetail 
              y le pasará el valor de 'id' de la URL. Ej: /producto/123 */}
          <Route path="/producto/:id" element={<ProductDetail />} />
          
          <Route path="/custom" element={<Custom />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/placeorder" element={<PlaceOrder />} />

        </Routes>
        
        {/* 5. Footer: Al igual que MainNavBar, el Footer se muestra en todas las páginas. */}
        <Footer />
      </Router>

      </CartProvider>
    );
  }
  
  export default Enrutador;