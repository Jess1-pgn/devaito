const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Ressource non trouvée';
    return res.status(404).json({ message });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Valeur dupliquée détectée';
    return res.status(400).json({ message });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message });
  }

  res.status(err.statusCode || 500).json({
    message: error.message || 'Erreur serveur'
  });
};

module.exports = errorHandler;
