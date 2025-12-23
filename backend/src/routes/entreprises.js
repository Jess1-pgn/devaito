const express = require('express');
const router = express.Router();
const {
  createEntreprise,
  getEntreprises,
  getEntreprise,
  updateEntreprise,
  deleteEntreprise
} = require('../controllers/entrepriseController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getEntreprises)
  .post(protect, authorize('admin', 'assistant'), createEntreprise);

router.route('/:id')
  .get(protect, getEntreprise)
  .put(protect, authorize('admin', 'assistant'), updateEntreprise)
  .delete(protect, authorize('admin', 'assistant'), deleteEntreprise);

module.exports = router;
