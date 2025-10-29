import React, { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function MainNavBar() {
   
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalQuantity = (cart || []).reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = totalQuantity;

  useEffect (() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    
    if (user) {
         setUsuario(user);
    
    }
  },[]);

    const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };


    return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        <Nav className='custom-dropdown-nav'>
          <NavDropdown title={<img src="./img/Lineas.png" width={"25px"} alt="Menú" />} id="basic-nav-dropdown">
            <NavDropdown.Item href="/">New Collection</NavDropdown.Item>
            <NavDropdown.Item href="/Contact">Contáctanos</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Navbar.Brand href="/"><img src="./img/StyleClinicWhite.png" width={"170px"} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className='ms-auto'>

            <Nav.Link href="/Catalogo">Catálogo</Nav.Link>
           <Link to="/cart" className="nav-link position-relative">
           <img src="./img/carrito.png" width="30px" alt="Carrito" />
           {cartCount > 0 && (
          <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '0.7rem' }}
                  >
                   {cartCount}
            </span>
             )}
           </Link>

            {usuario ? (
              <>
                <Nav.Link disabled>Hola, {usuario.nombre || usuario.email}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <Nav.Link href='/Login'>Login</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default MainNavBar;
