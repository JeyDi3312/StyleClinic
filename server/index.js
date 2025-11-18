const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const customProductRoutes = require('./routes/customProductRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Importar rutas de pedidos

// Conectar a la base de datos
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Servidor de Express para mi-app funcionando!');
});

// Usar Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/custom-products', customProductRoutes);
app.use('/api/orders', orderRoutes); // Usar rutas de pedidos

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
