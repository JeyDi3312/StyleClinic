const mongoose = require('mongoose');

const CustomProductSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  diseñoFrontal: {
    type: String, // Asumimos que esto será una URL o un identificador para el diseño
    required: true,
  },
  diseñoTrasero: {
    type: String, // Asumimos que esto será una URL o un identificador para el diseño
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  precioFinal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CustomProduct', CustomProductSchema);