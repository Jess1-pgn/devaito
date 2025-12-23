const mongoose = require('mongoose');

const sessionFormationSchema = new mongoose.Schema({
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formation',
    required: true
  },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formateur',
    required: true
  },
  type: {
    type: String,
    enum: ['entreprise', 'individuel'],
    required: true
  },
  entreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise'
  },
  dates: [{
    date: { type: Date, required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true }
  }],
  ville: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['planifiee', 'en_cours', 'terminee', 'annulee'],
    default: 'planifiee'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SessionFormation', sessionFormationSchema);
