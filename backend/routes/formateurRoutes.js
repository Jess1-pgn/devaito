const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const formateurController = require('../controllers/formateurController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/',
  auth,
  authorize('admin'),
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('prenom').notEmpty().withMessage('Prénom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('competences').notEmpty().withMessage('Compétences requises')
  ],
  validate,
  formateurController.createFormateur
);

router.get('/',
  auth,
  authorize('admin', 'assistant'),
  formateurController.getAllFormateurs
);

router.get('/:id',
  auth,
  authorize('admin', 'assistant'),
  formateurController.getFormateurById
);

router.put('/:id',
  auth,
  authorize('admin'),
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('prenom').notEmpty().withMessage('Prénom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('competences').notEmpty().withMessage('Compétences requises')
  ],
  validate,
  formateurController.updateFormateur
);

router.delete('/:id',
  auth,
  authorize('admin'),
  formateurController.deleteFormateur
);

router.post('/externe/register',
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('prenom').notEmpty().withMessage('Prénom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('competences').notEmpty().withMessage('Compétences requises')
  ],
  validate,
  formateurController.registerExternalFormateur
);

module.exports = router;
