const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const participantController = require('../controllers/participantController');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

router.post('/register',
  [
    body('nom').notEmpty().withMessage('Nom requis'),
    body('prenom').notEmpty().withMessage('Prénom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('session_id').isInt().withMessage('Session ID invalide')
  ],
  validate,
  participantController.registerParticipant
);

router.get('/',
  auth,
  authorize('admin', 'assistant'),
  participantController.getAllParticipants
);

router.get('/:id',
  auth,
  authorize('admin', 'assistant'),
  participantController.getParticipantById
);

router.get('/session/:session_id/inscriptions',
  auth,
  authorize('admin', 'assistant'),
  participantController.getInscriptionsBySession
);

router.patch('/inscriptions/:id/status',
  auth,
  authorize('admin', 'assistant'),
  [
    body('statut').isIn(['en_attente', 'confirme', 'annule']).withMessage('Statut invalide')
  ],
  validate,
  participantController.updateInscriptionStatus
);

module.exports = router;
