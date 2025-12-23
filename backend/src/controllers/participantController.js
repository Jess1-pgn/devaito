const Participant = require('../models/Participant');
const SessionFormation = require('../models/SessionFormation');
const nodemailer = require('nodemailer');

exports.registerParticipant = async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Inscription enregistrée avec succès',
      data: participant 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const { formation, session } = req.query;
    let filter = {};

    if (formation) filter.formation = formation;
    if (session) filter.session = session;

    const participants = await Participant.find(filter)
      .populate('formation')
      .populate('session');
    
    res.status(200).json({ success: true, data: participants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id)
      .populate('formation')
      .populate('session');
    
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json({ success: true, data: participant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json({ success: true, data: participant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Participant supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendEvaluationLink = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id)
      .populate('formation')
      .populate('session');
    
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }

    // Generate evaluation link
    const evaluationLink = `${process.env.CLIENT_URL}/evaluation/${participant._id}`;

    // Send email (configure email service)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: participant.email,
      subject: 'Évaluation de votre formation',
      html: `
        <h1>Évaluation de formation</h1>
        <p>Bonjour ${participant.prenom} ${participant.nom},</p>
        <p>Merci d'avoir participé à la formation "${participant.formation.titre}".</p>
        <p>Nous aimerions avoir votre avis. Veuillez cliquer sur le lien ci-dessous pour évaluer votre formateur:</p>
        <a href="${evaluationLink}">Évaluer la formation</a>
      `
    });

    participant.evaluationEnvoyee = true;
    await participant.save();

    res.status(200).json({ 
      success: true, 
      message: 'Email d\'évaluation envoyé avec succès' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
