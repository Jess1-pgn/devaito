const express = require('express');
const cors = require('cors');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('❌ ERREUR FATALE: JWT_SECRET n\'est pas défini dans le fichier .env');
  console.error('   Veuillez ajouter JWT_SECRET dans votre fichier .env');
  process.exit(1);
}

const authRoutes = require('./routes/authRoutes');
const formationRoutes = require('./routes/formationRoutes');
const formateurRoutes = require('./routes/formateurRoutes');
const entrepriseRoutes = require('./routes/entrepriseRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const participantRoutes = require('./routes/participantRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestion de Formation Devaito',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      formations: '/api/formations',
      formateurs: '/api/formateurs',
      entreprises: '/api/entreprises',
      sessions: '/api/sessions',
      participants: '/api/participants',
      evaluations: '/api/evaluations'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/formateurs', formateurRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/evaluations', evaluationRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const safeMessages = [
    'Erreur de validation',
    'Ressource non trouvée',
    'Accès refusé',
    'Authentification requise',
    'Token invalide',
    'Email ou mot de passe incorrect',
    'Email déjà utilisé'
  ];
  
  const message = safeMessages.includes(err.message) 
    ? err.message 
    : (process.env.NODE_ENV === 'development' ? err.message : 'Erreur serveur');
  
  const response = { message };
  
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  res.status(err.status || 500).json(response);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur le port ${PORT}`);
  console.log(`✓ Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API disponible sur http://localhost:${PORT}`);
});

module.exports = app;
