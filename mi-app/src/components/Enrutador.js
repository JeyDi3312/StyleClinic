import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MainNavBar from './MainNavBar';
import Footer from './Footer';
import Catalogo from '../pages/Catalogo';
import Contact from '../pages/Contact';
import Register from '../pages/Register';
import { CartProvider } from '../context/CartContext';
import Cart from '../pages/Cart';
import ProductDetail from './ProductDetail';

function Enrutador() {
    return (
     <CartProvider>
      <Router>
                <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Catalogo' element={<Catalogo />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Register' element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/producto/:id" element={<ProductDetail />} />

        </Routes>
               <Footer />
      </Router>

      </CartProvider>
    );
  }
  
  export default Enrutador;