// Importa la librería Mongoose.
const mongoose = require('mongoose');

/**
 * Esquema de Producto Personalizado (CustomProductSchema)
 * Define la estructura para un producto que ha sido personalizado por un usuario.
 * Cada documento en esta colección representa una configuración única creada
 * por un cliente en la sección de personalización de la tienda.
 */
const CustomProductSchema = new mongoose.Schema({
  // El color base seleccionado para la prenda (ej: 'negro', 'blanco').
  color: {
    type: String,
    required: true,
  },
  // El identificador del diseño seleccionado para la parte frontal de la prenda.
  diseñoFrontal: {
    type: String,
    required: true,
  },
  // El identificador del diseño seleccionado para la parte trasera de la prenda.
  diseñoTrasero: {
    type: String,
    required: true,
  },
  // La talla seleccionada para la prenda (ej: 'S', 'M', 'L', 'XL').
  size: {
    type: String,
    required: true,
  },
  // El precio final calculado para esta configuración específica de personalización.
  precioFinal: {
    type: Number,
    required: true,
  },
  // La fecha en que se guardó esta configuración de producto personalizado.
  date: {
    type: Date,
    default: Date.now,
  },
});


 //Exportación del Modelo
 //Se crea y exporta el modelo 'CustomProduct' para interactuar con la colección
 //'customproducts' en MongoDB.
module.exports = mongoose.model('CustomProduct', CustomProductSchema);
