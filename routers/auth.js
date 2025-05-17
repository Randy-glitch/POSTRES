const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para el registro de un nuevo usuario
router.post('/register', authController.register);

// Ruta para el login de un usuario
router.post('/login', authController.login);

module.exports = router;