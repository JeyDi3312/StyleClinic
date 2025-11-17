const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear el Esquema para Productos
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number, // Usamos Number para el precio para poder hacer cálculos
    required: true
  },
  description: {
    type: String,
    required: false
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  size: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);
