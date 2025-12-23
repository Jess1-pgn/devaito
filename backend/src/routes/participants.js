const express = require('express');
const router = express.Router();
const {
  registerParticipant,
  getParticipants,
  getParticipant,
  updateParticipant,
  deleteParticipant,
  sendEvaluationLink
} = require('../controllers/participantController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', registerParticipant);

router.route('/')
  .get(protect, authorize('admin', 'assistant'), getParticipants);

router.route('/:id')
  .get(protect, authorize('admin', 'assistant'), getParticipant)
  .put(protect, authorize('admin', 'assistant'), updateParticipant)
  .delete(protect, authorize('admin', 'assistant'), deleteParticipant);

router.post('/:id/send-evaluation', protect, authorize('admin', 'assistant'), sendEvaluationLink);

module.exports = router;
