const Formation = require('../models/Formation');

exports.createFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json({ success: true, data: formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFormations = async (req, res) => {
  try {
    const { categorie, ville, dateDebut, dateFin } = req.query;
    let filter = {};

    if (categorie) filter.categorie = categorie;
    
    const formations = await Formation.find(filter);
    res.status(200).json({ success: true, data: formations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json({ success: true, data: formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json({ success: true, data: formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndDelete(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json({ success: true, message: 'Formation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicFormations = async (req, res) => {
  try {
    const { categorie, ville } = req.query;
    let filter = { isPublique: true };

    if (categorie) filter.categorie = categorie;
    
    const formations = await Formation.find(filter);
    res.status(200).json({ success: true, data: formations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
