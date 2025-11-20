// Importación de módulos necesarios
const express = require('express');
const router = express.Router();

// Carga del modelo de datos para los Productos Personalizados
const CustomProduct = require('../models/customProductModel');

// DEFINICIÓN DE RUTAS PARA PRODUCTOS PERSONALIZADOS

/**
 * @route   POST /api/custom-products
 * @desc    Crea y guarda un nuevo producto personalizado diseñado por un usuario.
 *          Esta ruta se usa principalmente cuando un producto personalizado se añade al carrito
 *          o cuando se finaliza un pedido que contiene artículos personalizados.
 * @access  
 */
router.post('/', (req, res) => {
  // 1. Se crea una nueva instancia del modelo CustomProduct con los datos de personalización
  //    recibidos desde el frontend (color, diseños, talla, etc.).
  const newCustomProduct = new CustomProduct({
    color: req.body.color,
    diseñoFrontal: req.body.diseñoFrontal,
    diseñoTrasero: req.body.diseñoTrasero,
    size: req.body.size,
    precioFinal: req.body.precioFinal, // El precio final calculado en el frontend
  });

  // 2. Se guarda el nuevo producto personalizado en la colección 'customproducts' de la base de datos.
  newCustomProduct.save()
    // Si se guarda correctamente, se devuelve un estado 201 (Created) y el objeto del producto creado.
    .then(product => res.status(201).json(product))
    // Si hay un error (ej: faltan campos requeridos), se devuelve un error 400 (Bad Request).
    .catch(err => res.status(400).json({ error: 'No se pudo crear el producto personalizado', details: err }));
});

// Se exporta el router para su uso en index.js
module.exports = router;
