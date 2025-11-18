const express = require('express');
const router = express.Router();

// Cargar Modelos
const Order = require('../models/orderModel');
const CustomProduct = require('../models/customProductModel');
const Product = require('../models/productModel');

// @route   GET api/orders
// @desc    Obtener todos los pedidos
// @access  Public (Debería ser privado para administradores en el futuro)
router.get('/', async (req, res) => {
  try {
    // Busca todos los pedidos y los ordena del más nuevo al más antiguo
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

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
            onModel: 'CustomProduct',
          };
        } else {
          return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id,
            onModel: 'Product',
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
    console.error('Error detallado al crear pedido:', error);
    res.status(400).json({ 
      message: 'Error al crear el pedido', 
      error: error.message 
    });
  }
});

module.exports = router;
