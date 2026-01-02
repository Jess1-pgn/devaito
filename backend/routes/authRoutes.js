const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis')
  ],
  validate,
  authController.login
);

router.post('/register',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe minimum 6 caractères'),
    body('role').isIn(['admin', 'formateur', 'assistant']).withMessage('Rôle invalide')
  ],
  validate,
  authController.register
);

router.get('/profile', auth, authController.getProfile);

module.exports = router;
