// Importación de módulos necesarios
const express = require('express');
const router = express.Router();

// Carga de los modelos de datos necesarios
const Order = require('../models/orderModel'); // Modelo para los pedidos
const CustomProduct = require('../models/customProductModel'); // Modelo para productos personalizados
const Product = require('../models/productModel'); // Modelo para productos estándar

// DEFINICIÓN DE RUTAS PARA PEDIDOS

/**
 * @route   GET /api/orders
 * @desc    Obtener un listado de todos los pedidos realizados.
 * @access  
 */
router.get('/', async (req, res) => {
  try {
    // Busca todos los documentos en la colección 'orders'.
    // .sort({ createdAt: -1 }) ordena los pedidos del más reciente al más antiguo.
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders); // Devuelve la lista de pedidos.
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Crear un nuevo pedido a partir de los datos del carrito y del usuario.
 * @access  
 */
router.post('/', async (req, res) => {
  // 1. Extraer los datos clave del cuerpo de la petición (enviados desde el frontend al finalizar la compra).
  const { cart, shippingAddress, totalPrice } = req.body;

  // Validación: si no hay carrito o está vacío, no se puede crear un pedido.
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'No hay artículos en el carrito' });
  }

  try {
    // 2. Procesar cada artículo del carrito de forma asíncrona.
    // Promise.all permite que todas las operaciones de la base de datos (si las hay) se ejecuten en paralelo.
    const processedOrderItems = await Promise.all(
      cart.map(async (item) => {
        // 3. Diferenciar entre productos personalizados y productos estándar.
        if (item.isCustom) {
          // CASO A: El artículo es un producto PERSONALIZADO.
          
          // a. Se crea un nuevo documento en la colección 'customproducts'.
          //    Esto crea una "instantánea" permanente del diseño del cliente en ese momento.
          const newCustomProduct = new CustomProduct({
            color: item.color,
            diseñoFrontal: item.diseñoFrontal,
            diseñoTrasero: item.diseñoTrasero,
            size: item.size,
            precioFinal: item.price,
          });
          const savedCustomProduct = await newCustomProduct.save();

          // b. Se prepara el objeto para 'orderItems', referenciando el CustomProduct recién creado.
          return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: savedCustomProduct.precioFinal,
            product: savedCustomProduct._id, // ID del nuevo CustomProduct
            onModel: 'CustomProduct', // Clave para la referencia polimórfica en Mongoose
          };
        } else {
          // CASO B: El artículo es un producto ESTÁNDAR.
          
          // a. Simplemente se prepara el objeto para 'orderItems', referenciando el Product existente.
          return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id, // ID del Product existente
            onModel: 'Product', // Clave para la referencia polimórfica en Mongoose
          };
        }
      })
    );

    // 4. Crear la nueva orden con los artículos ya procesados.
    const newOrder = new Order({
      orderItems: processedOrderItems, // Array de artículos del pedido (personalizados y/o estándar)
      shippingAddress: shippingAddress, // Dirección de envío
      totalPrice: totalPrice, // Precio total
    });

    // 5. Guardar el pedido final en la base de datos.
    const createdOrder = await newOrder.save();
    
    // 6. Devolver el pedido creado al cliente con un estado 201 (Created).
    res.status(201).json(createdOrder);

  } catch (error) {
    // Manejo de errores durante todo el proceso.
    console.error('Error detallado al crear pedido:', error);
    res.status(400).json({ 
      message: 'Error al crear el pedido', 
      error: error.message 
    });
  }
});

// Se exporta el router para su uso en index.js
module.exports = router;
