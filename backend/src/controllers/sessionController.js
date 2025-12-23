const SessionFormation = require('../models/SessionFormation');
const Participant = require('../models/Participant');

exports.createSession = async (req, res) => {
  try {
    const session = await SessionFormation.create(req.body);
    await session.populate(['formation', 'formateur', 'entreprise']);
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const { ville, statut, dateDebut, dateFin } = req.query;
    let filter = {};

    if (ville) filter.ville = ville;
    if (statut) filter.statut = statut;

    const sessions = await SessionFormation.find(filter)
      .populate('formation')
      .populate('formateur')
      .populate('entreprise')
      .populate('participants');
    
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSession = async (req, res) => {
  try {
    const session = await SessionFormation.findById(req.params.id)
      .populate('formation')
      .populate('formateur')
      .populate('entreprise')
      .populate('participants');
    
    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await SessionFormation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('formation')
    .populate('formateur')
    .populate('entreprise');
    
    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await SessionFormation.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }
    res.status(200).json({ success: true, message: 'Session supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addParticipantToSession = async (req, res) => {
  try {
    const session = await SessionFormation.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    if (!session.participants.includes(req.body.participantId)) {
      session.participants.push(req.body.participantId);
      await session.save();
    }

    await session.populate('participants');
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
