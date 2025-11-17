const express = require('express');
const router = express.Router();

// Cargar el modelo de Producto
const Product = require('../models/productModel');

// @route   GET api/products
// @desc    Obtener todos los productos
// @access  Public
router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 }) // Ordenar de más nuevo a más antiguo
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noproductsfound: 'No se encontraron productos' }));
});

// @route   GET api/products/:id
// @desc    Obtener un producto por su ID
// @access  Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noproductfound: 'No se encontró el producto' }));
});

// @route   POST api/products
// @desc    Crear un nuevo producto
// @access  Public (se podría proteger en el futuro)
router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    countInStock: req.body.countInStock,
    size: req.body.size
  });

  newProduct.save().then(product => res.json(product));
});

// @route   PUT api/products/:id
// @desc    Actualizar un producto existente
// @access  Public (se podría proteger en el futuro)
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.json(product))
    .catch(err => res.status(400).json({ error: 'No se pudo actualizar el producto' }));
});

// @route   DELETE api/products/:id
// @desc    Eliminar un producto
// @access  Public (se podría proteger en el futuro)
router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ productnotfound: 'No se encontró el producto' }));
});

module.exports = router;
