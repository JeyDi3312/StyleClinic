// Importación de módulos necesarios
const express = require('express'); // Framework principal para construir el servidor web
const cors = require('cors'); // Middleware para habilitar el Cross-Origin Resource Sharing (CORS)
const connectDB = require('./config/db'); // Función para conectar a la base de datos MongoDB

// Importación de los archivos de rutas de la API
const userRoutes = require('./routes/userRoutes'); // Rutas para la gestión de usuarios (registro, login)
const productRoutes = require('./routes/productRoutes'); // Rutas para los productos estándar (CRUD)
const customProductRoutes = require('./routes/customProductRoutes'); // Rutas para los productos personalizados
const orderRoutes = require('./routes/orderRoutes'); // Rutas para la gestión de pedidos

// INICIALIZACIÓN Y CONFIGURACIÓN

// Se establece la conexión con la base de datos MongoDB al iniciar el servidor
connectDB();

// Se crea una instancia de la aplicación Express
const app = express();
// Se define el puerto para el servidor, usando una variable de entorno si está disponible, o el puerto 5000 por defecto
const port = process.env.PORT || 5000;

// MIDDLEWARE

// app.use(cors()): Habilita CORS para permitir que el frontend se comunique con este backend.
app.use(cors());
// app.use(express.json()): Parsea las solicitudes entrantes con formato JSON.
// Permite acceder a los datos enviados en el cuerpo (body) de las peticiones POST o PUT.
app.use(express.json());

// DEFINICIÓN DE RUTAS DE LA API

// Ruta de prueba para verificar que el servidor está funcionando correctamente.
app.get('/', (req, res) => {
  res.send('Servidor de Express para mi-app funcionando!');
});

// Se montan las rutas importadas en sus respectivos endpoints base.
// Cada petición que llegue a '/api/users' será manejada por 'userRoutes'.
app.use('/api/users', userRoutes);
// Cada petición que llegue a '/api/products' será manejada por 'productRoutes'.
app.use('/api/products', productRoutes);
// Cada petición que llegue a '/api/custom-products' será manejada por 'customProductRoutes'.
app.use('/api/custom-products', customProductRoutes);
// Cada petición que llegue a '/api/orders' será manejada por 'orderRoutes'.
app.use('/api/orders', orderRoutes);

// ARRANQUE DEL SERVIDOR 

// El servidor se pone a la escucha de peticiones en el puerto definido.
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
