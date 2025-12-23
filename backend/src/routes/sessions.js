const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
  addParticipantToSession
} = require('../controllers/sessionController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getSessions)
  .post(protect, authorize('admin', 'assistant'), createSession);

router.route('/:id')
  .get(protect, getSession)
  .put(protect, authorize('admin', 'assistant'), updateSession)
  .delete(protect, authorize('admin', 'assistant'), deleteSession);

router.post('/:id/participants', protect, authorize('admin', 'assistant'), addParticipantToSession);

module.exports = router;
