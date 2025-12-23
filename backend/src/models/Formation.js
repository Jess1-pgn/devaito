const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  nombreHeures: {
    type: Number,
    required: true
  },
  cout: {
    type: Number,
    required: true
  },
  objectifs: {
    type: String,
    required: true
  },
  programme: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isPublique: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Formation', formationSchema);
