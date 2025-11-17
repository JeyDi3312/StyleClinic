import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setUser({ id: decodedToken.id, nombre: decodedToken.nombre });
          // Opcional: Configurar el token en los encabezados de axios para futuras peticiones
          axios.defaults.headers.common['Authorization'] = token;
        } else {
          // El token ha expirado
          logout();
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    axios.defaults.headers.common['Authorization'] = token;
    try {
      const decodedToken = jwtDecode(token);
      setUser({ id: decodedToken.id, nombre: decodedToken.nombre });
    } catch (error) {
      console.error('Error decodificando el token en login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
