const Entreprise = require('../models/Entreprise');

exports.createEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.create(req.body);
    res.status(201).json({ success: true, data: entreprise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntreprises = async (req, res) => {
  try {
    const { ville } = req.query;
    let filter = {};

    if (ville) filter.ville = ville;

    const entreprises = await Entreprise.find(filter);
    res.status(200).json({ success: true, data: entreprises });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findById(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.status(200).json({ success: true, data: entreprise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.status(200).json({ success: true, data: entreprise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.status(200).json({ success: true, message: 'Entreprise supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
