const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Importar rutas de productos

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
app.use('/api/products', productRoutes); // Usar rutas de productos

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
