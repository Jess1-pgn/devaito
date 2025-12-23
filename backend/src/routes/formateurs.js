const express = require('express');
const router = express.Router();
const {
  createFormateur,
  getFormateurs,
  getFormateur,
  updateFormateur,
  deleteFormateur,
  registerFormateurExterne,
  addEvaluation
} = require('../controllers/formateurController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register-externe', registerFormateurExterne);

router.route('/')
  .get(protect, getFormateurs)
  .post(protect, authorize('admin'), createFormateur);

router.route('/:id')
  .get(protect, getFormateur)
  .put(protect, authorize('admin'), updateFormateur)
  .delete(protect, authorize('admin'), deleteFormateur);

router.post('/:id/evaluation', addEvaluation);

module.exports = router;
