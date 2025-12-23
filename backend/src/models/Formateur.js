const mongoose = require('mongoose');

const formateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String,
    required: true
  },
  motsCles: [{
    type: String,
    required: true
  }],
  remarques: {
    type: String
  },
  statut: {
    type: String,
    enum: ['interne', 'externe', 'en_attente'],
    default: 'interne'
  },
  evaluations: [{
    qualitePedagogique: { type: Number, min: 1, max: 5 },
    rythme: { type: Number, min: 1, max: 5 },
    supportCours: { type: Number, min: 1, max: 5 },
    maitriseSujet: { type: Number, min: 1, max: 5 },
    commentaire: String,
    formationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' },
    date: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Formateur', formateurSchema);
