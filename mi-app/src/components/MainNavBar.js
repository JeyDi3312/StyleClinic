import React from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function MainNavBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalQuantity = (cart || []).reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = totalQuantity;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        <Nav className='custom-dropdown-nav'>
          <NavDropdown title={<img src="./img/Lineas.png" width={"25px"} alt="Menú" />} id="basic-nav-dropdown">
            <NavDropdown.Item href="/">Nueva Colección</NavDropdown.Item>
            <NavDropdown.Item href="/Contact">Contáctanos</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Navbar.Brand href="/"><img src="./img/StyleClinicWhite.png" width={"170px"} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className='ms-auto d-flex align-items-center'>
            <Nav.Link href="/Catalogo">Catálogo</Nav.Link>
            <Nav.Link href="/custom">Customiza</Nav.Link>
            
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

            {user ? (
              <>
                {user.email === 'admin@gmail.com' ? (
                  <Nav.Link as={Link} to="/admin" className="d-flex align-items-center user-nav-item">
                    <img src="/img/user.png" width="65px" alt="Usuario" className="me-1" />
                    <span style={{ fontSize: '0.9rem' }}>{user.nombre}</span>
                  </Nav.Link>
                ) : (
                  <div className="nav-link d-flex align-items-center user-nav-item">
                    <img src="/img/user.png" width="65px" alt="Usuario" className="me-1" />
                    <span style={{ fontSize: '0.9rem' }}>{user.nombre || user.email.split('@')[0]}</span>
                  </div>
                )}
                <Nav.Link onClick={handleLogout} className="ms-2">Cerrar sesión</Nav.Link>
              </>
            ) : (
              <Nav.Link href='/Login'>Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
