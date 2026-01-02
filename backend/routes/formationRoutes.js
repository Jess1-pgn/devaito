const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const formationController = require('../controllers/formationController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/',
  auth,
  authorize('admin'),
  [
    body('titre').notEmpty().withMessage('Titre requis'),
    body('nombre_heures').isInt({ min: 1 }).withMessage('Nombre d\'heures invalide'),
    body('cout').isFloat({ min: 0 }).withMessage('Coût invalide'),
    body('objectifs').notEmpty().withMessage('Objectifs requis'),
    body('programme').notEmpty().withMessage('Programme requis')
  ],
  validate,
  formationController.createFormation
);

router.get('/', formationController.getAllFormations);

router.get('/:id', formationController.getFormationById);

router.put('/:id',
  auth,
  authorize('admin'),
  [
    body('titre').notEmpty().withMessage('Titre requis'),
    body('nombre_heures').isInt({ min: 1 }).withMessage('Nombre d\'heures invalide'),
    body('cout').isFloat({ min: 0 }).withMessage('Coût invalide'),
    body('objectifs').notEmpty().withMessage('Objectifs requis'),
    body('programme').notEmpty().withMessage('Programme requis')
  ],
  validate,
  formationController.updateFormation
);

router.delete('/:id',
  auth,
  authorize('admin'),
  formationController.deleteFormation
);

module.exports = router;
