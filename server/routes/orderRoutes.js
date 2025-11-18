const express = require('express');
const router = express.Router();

// Cargar Modelos
const Order = require('../models/orderModel');
const CustomProduct = require('../models/customProductModel');
const Product = require('../models/productModel'); // Importar el modelo Product

// @route   POST api/orders
// @desc    Crear un nuevo pedido
// @access  Public
router.post('/', async (req, res) => {
  const { cart, shippingAddress, totalPrice } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'No hay artículos en el carrito' });
  }

  try {
    const processedOrderItems = await Promise.all(
      cart.map(async (item) => {
        if (item.isCustom) {
          const newCustomProduct = new CustomProduct({
            color: item.color,
            diseñoFrontal: item.diseñoFrontal,
            diseñoTrasero: item.diseñoTrasero,
            size: item.size,
            precioFinal: item.price,
          });

          const savedCustomProduct = await newCustomProduct.save();

          return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: savedCustomProduct.precioFinal,
            product: savedCustomProduct._id,
            onModel: 'CustomProduct', // Especifica el modelo para populate
          };
        } else {
          // Para productos estándar, solo necesitamos el ID y el modelo
          return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id, // El ID del producto del catálogo
            onModel: 'Product', // ¡ESTA ES LA LÍNEA QUE FALTABA!
          };
        }
      })
    );

    const newOrder = new Order({
      orderItems: processedOrderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
    });

    const createdOrder = await newOrder.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error detallado al crear pedido:', error); // Añadido para mejor debugging
    res.status(400).json({ 
      message: 'Error al crear el pedido', 
      error: error.message 
    });
  }
});

module.exports = router;
