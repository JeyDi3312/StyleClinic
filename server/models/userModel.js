const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear el Esquema ampliado
const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  id_usuario: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: false
  },
  telefono: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
