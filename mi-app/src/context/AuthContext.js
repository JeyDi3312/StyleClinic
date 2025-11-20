// Importaciones necesarias de React y librerías de terceros.
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Librería para decodificar tokens JWT.
import axios from 'axios'; // Cliente HTTP para hacer peticiones a la API.

// 1. Creación del Contexto de Autenticación.
const AuthContext = createContext();

// 2. Hook personalizado para un acceso más sencillo al contexto.
export const useAuth = () => useContext(AuthContext);

/**
 * 3. Proveedor de Autenticación (AuthProvider)
 * Este componente gestiona el estado global de la autenticación del usuario (quién está logueado).
 * Se encarga de la lógica de login, logout y de verificar la validez de la sesión del usuario
 * al cargar la aplicación.
 */
export const AuthProvider = ({ children }) => {
  // `user`: estado que almacena la información del usuario logueado. Es `null` si nadie está logueado.
  const [user, setUser] = useState(null);

  // 4. Hook de Efecto para la Verificación de Sesión Inicial
  // Este `useEffect` se ejecuta una sola vez cuando el AuthProvider se monta por primera vez.
  // Su propósito es comprobar si ya existe una sesión de usuario válida en el navegador.
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Recupera el token del almacenamiento local.

    if (token) {
      //Lógica especial para el administrador
      if (token === 'admin-token') {
        setUser({ nombre: 'admin', email: 'admin@gmail.com' });
        return;
      }
      
      //Lógica para usuarios
      try {
        const decodedToken = jwtDecode(token); // Decodifica el token para leer su contenido (payload).
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos.

        // Comprueba si el token ha expirado comparando su fecha de expiración (`exp`) con la actual.
        if (decodedToken.exp > currentTime) {
          // Si el token es válido y no ha expirado:
          // a) Se establece la información del usuario en el estado global.
          setUser({ id: decodedToken.id, nombre: decodedToken.nombre, email: decodedToken.email });
          // b) MUY IMPORTANTE: Se configura axios para que envíe automáticamente el token JWT
          //    en el encabezado `Authorization` de TODAS las futuras peticiones a la API.
          axios.defaults.headers.common['Authorization'] = token;
        } else {
          // Si el token ha expirado, se cierra la sesión.
          logout();
        }
      } catch (error) {
        // Si el token está malformado o es inválido, no se puede decodificar.
        console.error('Error decodificando el token:', error);
        logout();
      }
    }
  }, []); // El array vacío `[]` asegura que el efecto se ejecute solo una vez.

  /**
   * Función de Login
   * @param {string} token - El token JWT recibido del backend tras un inicio de sesión exitoso.
   */
  const login = (token) => {
    //Lógica especial para el administrador
    if (token === 'admin-token') {
      setUser({ nombre: 'admin', email: 'admin@gmail.com' });
      localStorage.setItem('jwtToken', token);
      return;
    }

    // a) Se guarda el token en localStorage para la persistencia de la sesión.
    localStorage.setItem('jwtToken', token);
    // b) Se configura el encabezado de autorización de axios para las siguientes peticiones.
    axios.defaults.headers.common['Authorization'] = token;
    try {
      // c) Se decodifica el token para obtener los datos del usuario.
      const decodedToken = jwtDecode(token);
      // d) Se actualiza el estado `user` con la información del payload del token.
      setUser({ id: decodedToken.id, nombre: decodedToken.nombre, email: decodedToken.email });
    } catch (error) {
      console.error('Error decodificando el token en login:', error);
    }
  };

  /**
   * Función de Logout
   */
  const logout = () => {
    // a) Se elimina el token de localStorage.
    localStorage.removeItem('jwtToken');
    // b) Se elimina el encabezado de autorización de axios. Las futuras peticiones no estarán autenticadas.
    delete axios.defaults.headers.common['Authorization'];
    // c) Se resetea el estado del usuario a `null`.
    setUser(null);
  };

  // 5. Proveer el contexto
  // Se exponen el estado `user` y las funciones `login` y `logout` a todos los componentes hijos.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
