// Importación de módulos necesarios
const express = require('express');
const router = express.Router();

// Carga del modelo de datos para los Productos
const Product = require('../models/productModel');

//  DEFINICIÓN DE RUTAS CRUD PARA PRODUCTOS 

/**
 * @route   GET /api/products
 * @desc    Obtener todos los productos de la base de datos.
 * @access  
 */
router.get('/', (req, res) => {
  // Product.find() busca todos los documentos en la colección de productos.
  Product.find()
    .sort({ date: -1 }) // Ordena los resultados por fecha de creación, del más nuevo al más antiguo.
    .then(products => res.json(products)) // Envía la lista de productos como respuesta JSON.
    .catch(err => res.status(404).json({ noproductsfound: 'No se encontraron productos' })); // Si no se encuentran, devuelve un error 404.
});

/**
 * @route   GET /api/products/:id
 * @desc    Obtener un único producto por su ID.
 * @access  
 */
router.get('/:id', (req, res) => {
  // Product.findById busca un documento por su clave primaria (_id).
  // req.params.id contiene el valor del ID que viene en la URL.
  Product.findById(req.params.id)
    .then(product => res.json(product)) // Envía el producto encontrado como respuesta JSON.
    .catch(err => res.status(404).json({ noproductfound: 'No se encontró el producto' })); // Si no se encuentra, devuelve un error 404.
});

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto.
 * @access  
 */
router.post('/', (req, res) => {
  // Se crea una nueva instancia del modelo Product con los datos recibidos en el cuerpo de la petición.
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    countInStock: req.body.countInStock,
    size: req.body.size
  });

  // Se guarda el nuevo producto en la base de datos.
  newProduct.save().then(product => res.json(product)); // Devuelve el producto recién creado.
});

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar un producto existente por su ID.
 * @access  
 */
router.put('/:id', (req, res) => {
  // Product.findByIdAndUpdate busca un producto por su ID y lo actualiza con los datos del req.body.
  // { new: true } asegura que la respuesta devuelva el documento ya actualizado.
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.json(product)) // Devuelve el producto actualizado.
    .catch(err => res.status(400).json({ error: 'No se pudo actualizar el producto' }));
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar un producto por su ID.
 * @access  
 */
router.delete('/:id', (req, res) => {
  // Product.findByIdAndDelete busca un producto por su ID y lo elimina de la base de datos.
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      // Se verifica si el producto realmente existía antes de ser eliminado.
      if (!product) {
        return res.status(404).json({ productnotfound: 'No se encontró el producto' });
      }
      // Si se eliminó correctamente, se envía una respuesta de éxito.
      res.json({ success: true, message: 'Producto eliminado correctamente' });
    })
    .catch(err => res.status(500).json({ error: 'Error del servidor al eliminar el producto' }));
});

// Se exporta el router para su uso en index.js
module.exports = router;
