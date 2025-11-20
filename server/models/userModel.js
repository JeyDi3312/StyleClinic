// Importa la librería Mongoose, que facilita la interacción con MongoDB.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Esquema de Usuario (UserSchema)
 * Este esquema define la estructura de los documentos de usuario en la
 * colección 'users' de la base de datos.
 */
const UserSchema = new Schema({
  // Nombre del usuario.
  nombre: {
    type: String,
    required: true
  },
  // Apellido del usuario.
  apellido: {
    type: String,
    required: false
  },
  // Correo electrónico del usuario.
  // Se usa como identificador principal para el login.
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Identificación del usuario.
  id_usuario: {
    type: String,
    required: false
  },
  // Contraseña del usuario.
  password: {
    type: String,
    required: true
  },
  // Dirección de envío principal del usuario.
  direccion: {
    type: String,
    required: false
  },
  // Número de teléfono del usuario.
  telefono: {
    type: String,
    required: false
  },
  // Ciudad de residencia del usuario.
  city: {
    type: String,
    required: false
  },
  // País de residencia del usuario.
  country: {
    type: String,
    required: false
  },
  // Fecha en que se creó el registro del usuario. Se establece automáticamente a la fecha actual.
  date: {
    type: Date,
    default: Date.now
  }
});

/**
 * Exportación del Modelo
 * Se crea y exporta el modelo 'User' basado en el UserSchema.
 * Mongoose usará este modelo para crear, leer, actualizar y eliminar
 * documentos en la colección 'users' de MongoDB.
 */
module.exports = User = mongoose.model('users', UserSchema);
