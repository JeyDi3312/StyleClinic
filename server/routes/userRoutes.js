// Importación de módulos necesarios
const express = require('express'); // Framework para crear las rutas
const router = express.Router(); // Módulo de express para definir rutas
const bcrypt = require('bcryptjs'); // Librería para encriptar (hashear) contraseñas
const jwt = require('jsonwebtoken'); // Librería para generar JSON Web Tokens para la autenticación
const keys = require('../config/keys'); // Archivo de configuración (contiene claves secretas)

// Carga del modelo de datos para los usuarios
const User = require('../models/userModel'); // Modelo de Mongoose para interactuar con la colección de usuarios en MongoDB

// DEFINICIÓN DE RUTAS PARA USUARIOS 

/**
 * @route   POST /api/users/register
 * @desc    Registra un nuevo usuario en la base de datos.
 * @access  
 */
router.post('/register', (req, res) => {
  // 1. Verificar si el correo electrónico ya existe en la base de datos
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Si el usuario ya existe, se devuelve un error 400 (Bad Request)
      return res.status(400).json({ email: 'El correo electrónico ya existe' });
    }

    // 2. Si el usuario no existe, se crea una nueva instancia del modelo User con los datos del formulario
    const newUser = new User({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      id_usuario: req.body.id_usuario,
      password: req.body.password, 
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      city: req.body.city,
      country: req.body.country
    });

    // 3. Encriptar la contraseña antes de guardarla en la base de datos
    bcrypt.genSalt(10, (err, salt) => { // Se genera un 'salt' para fortalecer el hash
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash; // Se reemplaza la contraseña en texto plano por el hash seguro
        
        // 4. Guardar el nuevo usuario en la base de datos
        newUser
          .save()
          .then(user => res.json(user)) // Se devuelve el objeto del usuario creado (sin la contraseña)
          .catch(err => console.log(err)); // Manejo de errores
      });
    });
  });
});

/**
 * @route   POST /api/users/login
 * @desc    Autentica un usuario (login) y devuelve un token JWT si las credenciales son correctas.
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body; // Se extraen email y contraseña de la petición

  // 1. Buscar al usuario por su correo electrónico
  User.findOne({ email }).then(user => {
    if (!user) {
      // Si no se encuentra el usuario, se devuelve un error 404 (Not Found)
      return res.status(404).json({ emailnotfound: 'Usuario no encontrado' });
    }

    // 2. Si se encuentra el usuario, se compara la contraseña proporcionada con la almacenada en la BD
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Si las contraseñas coinciden...
        // 3. Crear el "payload" para el JWT (información que contendrá el token)
        const payload = { id: user.id, nombre: user.nombre };

        // 4. Firmar el token JWT
        jwt.sign(
          payload, // Datos del usuario a incluir en el token
          keys.secretOrKey, // Clave secreta para firmar el token
          { expiresIn: 31556926 }, // Tiempo de expiración del token
          (err, token) => {
            // 5. Enviar el token al cliente (frontend)
            res.json({
              success: true,
              token: 'Bearer ' + token // El prefijo 'Bearer ' es un estándar para enviar tokens
            });
          }
        );
      } else {
        // Si las contraseñas no coinciden, se devuelve un error 400 (Bad Request)
        return res.status(400).json({ passwordincorrect: 'Contraseña incorrecta' });
      }
    });
  });
});

// Se exporta el router para que pueda ser utilizado en el archivo principal (index.js)
module.exports = router;
