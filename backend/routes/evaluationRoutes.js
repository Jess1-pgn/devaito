const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const evaluationController = require('../controllers/evaluationController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/',
  [
    body('session_id').isInt().withMessage('Session ID invalide'),
    body('participant_id').isInt().withMessage('Participant ID invalide'),
    body('formateur_id').isInt().withMessage('Formateur ID invalide'),
    body('note_pedagogie').isInt({ min: 1, max: 5 }).withMessage('Note pédagogie invalide (1-5)'),
    body('note_rythme').isInt({ min: 1, max: 5 }).withMessage('Note rythme invalide (1-5)'),
    body('note_support').isInt({ min: 1, max: 5 }).withMessage('Note support invalide (1-5)'),
    body('note_maitrise').isInt({ min: 1, max: 5 }).withMessage('Note maîtrise invalide (1-5)')
  ],
  validate,
  evaluationController.createEvaluation
);

router.get('/session/:session_id',
  auth,
  authorize('admin', 'assistant', 'formateur'),
  evaluationController.getEvaluationsBySession
);

router.get('/formateur/:formateur_id',
  auth,
  authorize('admin', 'assistant', 'formateur'),
  evaluationController.getEvaluationsByFormateur
);

router.get('/formateur/:formateur_id/stats',
  auth,
  authorize('admin', 'assistant', 'formateur'),
  evaluationController.getFormateurStats
);

router.get('/link/:session_id/:participant_id',
  evaluationController.getEvaluationLink
);

module.exports = router;
