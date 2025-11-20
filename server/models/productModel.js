// Importa la librería Mongoose.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Esquema de Producto (ProductSchema)
 * Define la estructura de los productos estándar del catálogo de la tienda.
 */
const ProductSchema = new Schema({
  // Nombre del producto
  name: {
    type: String,
    required: true
  },
  // URL de la imagen del producto
  image: {
    type: String,
    required: true
  },
  // Precio del producto(En la base de datos en php la teniamos en string, se nos olvido cambiarla acá por eso aparece en dolares)
  price: {
    type: Number,
    required: true
  },
  // Descripción detallada del producto. 
  description: {
    type: String,
    required: false
  },
  // Cantidad de unidades disponibles en el inventario (stock).
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  // Talla del producto (ej: S, M, L). 
  size: {
    type: String,
    required: false
  },
  // Fecha de creación del registro del producto. Se establece automáticamente.
  date: {
    type: Date,
    default: Date.now
  }
});


 //Exportación del Modelo
 //Se crea y exporta el modelo 'Product' para interactuar con la colección
 //'products' en MongoDB.
 
module.exports = Product = mongoose.model('products', ProductSchema);
