const express = require('express');
const router = express.Router();
const {
  createFormation,
  getFormations,
  getFormation,
  updateFormation,
  deleteFormation,
  getPublicFormations
} = require('../controllers/formationController');
const { protect, authorize } = require('../middleware/auth');

router.get('/public', getPublicFormations);

router.route('/')
  .get(protect, getFormations)
  .post(protect, authorize('admin'), createFormation);

router.route('/:id')
  .get(protect, getFormation)
  .put(protect, authorize('admin'), updateFormation)
  .delete(protect, authorize('admin'), deleteFormation);

module.exports = router;
