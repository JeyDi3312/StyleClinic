const express = require('express');
const router = express.Router();

// Cargar el modelo de CustomProduct
const CustomProduct = require('../models/customProductModel');

// @route   POST api/custom-products
// @desc    Crear un nuevo producto personalizado
// @access  Public (Eventualmente se debería proteger para que solo usuarios autenticados puedan crear)
router.post('/', (req, res) => {
  const newCustomProduct = new CustomProduct({
    color: req.body.color,
    diseñoFrontal: req.body.diseñoFrontal,
    diseñoTrasero: req.body.diseñoTrasero,
    size: req.body.size,
    precioFinal: req.body.precioFinal,
  });

  newCustomProduct.save()
    .then(product => res.status(201).json(product))
    .catch(err => res.status(400).json({ error: 'No se pudo crear el producto personalizado', details: err }));
});

module.exports = router;