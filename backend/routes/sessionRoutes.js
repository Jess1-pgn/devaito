const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const sessionController = require('../controllers/sessionController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/',
  auth,
  authorize('admin', 'assistant'),
  [
    body('formation_id').isInt().withMessage('Formation ID invalide'),
    body('date_debut').isDate().withMessage('Date de début invalide'),
    body('date_fin').isDate().withMessage('Date de fin invalide'),
    body('type_session').isIn(['entreprise', 'individuel']).withMessage('Type de session invalide')
  ],
  validate,
  sessionController.createSession
);

router.get('/', sessionController.getAllSessions);

router.get('/:id', sessionController.getSessionById);

router.put('/:id',
  auth,
  authorize('admin', 'assistant'),
  [
    body('formation_id').isInt().withMessage('Formation ID invalide'),
    body('date_debut').isDate().withMessage('Date de début invalide'),
    body('date_fin').isDate().withMessage('Date de fin invalide'),
    body('type_session').isIn(['entreprise', 'individuel']).withMessage('Type de session invalide')
  ],
  validate,
  sessionController.updateSession
);

router.delete('/:id',
  auth,
  authorize('admin', 'assistant'),
  sessionController.deleteSession
);

router.patch('/:id/assign-formateur',
  auth,
  authorize('admin', 'assistant'),
  [
    body('formateur_id').isInt().withMessage('Formateur ID invalide')
  ],
  validate,
  sessionController.assignFormateurToSession
);

module.exports = router;
