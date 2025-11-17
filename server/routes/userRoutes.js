
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Cargar el modelo de usuario
const User = require('../models/userModel');

// @route   POST api/users/register
// @desc    Registra un nuevo usuario con perfil completo
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'El correo electrónico ya existe' });
    }

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

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login de usuario y devuelve el token JWT
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, nombre: user.nombre };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 }, 
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: 'Contraseña incorrecta' });
      }
    });
  });
});

module.exports = router;

