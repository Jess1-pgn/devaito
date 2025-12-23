const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  dateNaissance: {
    type: Date,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formation',
    required: true
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SessionFormation'
  },
  evaluationEnvoyee: {
    type: Boolean,
    default: false
  },
  evaluationCompletee: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Participant', participantSchema);
