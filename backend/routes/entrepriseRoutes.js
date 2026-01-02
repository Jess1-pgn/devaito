const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const entrepriseController = require('../controllers/entrepriseController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/',
  auth,
  authorize('admin', 'assistant'),
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('email').optional().isEmail().withMessage('Email invalide')
  ],
  validate,
  entrepriseController.createEntreprise
);

router.get('/',
  auth,
  authorize('admin', 'assistant'),
  entrepriseController.getAllEntreprises
);

router.get('/:id',
  auth,
  authorize('admin', 'assistant'),
  entrepriseController.getEntrepriseById
);

router.put('/:id',
  auth,
  authorize('admin', 'assistant'),
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('email').optional().isEmail().withMessage('Email invalide')
  ],
  validate,
  entrepriseController.updateEntreprise
);

router.delete('/:id',
  auth,
  authorize('admin', 'assistant'),
  entrepriseController.deleteEntreprise
);

module.exports = router;
