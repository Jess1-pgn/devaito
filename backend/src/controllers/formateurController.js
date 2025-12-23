const Formateur = require('../models/Formateur');

exports.createFormateur = async (req, res) => {
  try {
    const formateur = await Formateur.create(req.body);
    res.status(201).json({ success: true, data: formateur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFormateurs = async (req, res) => {
  try {
    const { motsCles, statut } = req.query;
    let filter = {};

    if (statut) filter.statut = statut;
    if (motsCles) {
      filter.motsCles = { $in: motsCles.split(',') };
    }

    const formateurs = await Formateur.find(filter);
    res.status(200).json({ success: true, data: formateurs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFormateur = async (req, res) => {
  try {
    const formateur = await Formateur.findById(req.params.id);
    if (!formateur) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }
    res.status(200).json({ success: true, data: formateur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFormateur = async (req, res) => {
  try {
    const formateur = await Formateur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!formateur) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }
    res.status(200).json({ success: true, data: formateur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFormateur = async (req, res) => {
  try {
    const formateur = await Formateur.findByIdAndDelete(req.params.id);
    if (!formateur) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Formateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerFormateurExterne = async (req, res) => {
  try {
    const formateurData = {
      ...req.body,
      statut: 'en_attente'
    };
    const formateur = await Formateur.create(formateurData);
    res.status(201).json({ 
      success: true, 
      message: 'Inscription enregistrée, vous serez contacté prochainement',
      data: formateur 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEvaluation = async (req, res) => {
  try {
    const formateur = await Formateur.findById(req.params.id);
    if (!formateur) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    formateur.evaluations.push(req.body);
    await formateur.save();

    res.status(200).json({ success: true, data: formateur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
