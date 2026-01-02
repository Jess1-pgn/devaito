const db = require('../config/database');

const createEvaluation = async (req, res) => {
  try {
    const { 
      session_id, 
      participant_id, 
      formateur_id,
      note_pedagogie, 
      note_rythme, 
      note_support, 
      note_maitrise,
      commentaires 
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO evaluations 
       (session_id, participant_id, formateur_id, note_pedagogie, note_rythme, 
        note_support, note_maitrise, commentaires) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [session_id, participant_id, formateur_id, note_pedagogie, note_rythme, 
       note_support, note_maitrise, commentaires]
    );

    res.status(201).json({
      message: 'Évaluation enregistrée avec succès',
      evaluationId: result.insertId
    });
  } catch (error) {
    console.error('Create evaluation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Vous avez déjà évalué cette session' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getEvaluationsBySession = async (req, res) => {
  try {
    const { session_id } = req.params;

    const [evaluations] = await db.query(
      `SELECT e.*, 
              p.nom as participant_nom, 
              p.prenom as participant_prenom,
              f.nom as formateur_nom,
              f.prenom as formateur_prenom
       FROM evaluations e
       JOIN participants p ON e.participant_id = p.id
       JOIN formateurs f ON e.formateur_id = f.id
       WHERE e.session_id = ?
       ORDER BY e.created_at DESC`,
      [session_id]
    );

    res.json(evaluations);
  } catch (error) {
    console.error('Get evaluations error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getEvaluationsByFormateur = async (req, res) => {
  try {
    const { formateur_id } = req.params;

    const [evaluations] = await db.query(
      `SELECT e.*,
              s.date_debut,
              s.date_fin,
              fo.titre as formation_titre,
              p.nom as participant_nom,
              p.prenom as participant_prenom
       FROM evaluations e
       JOIN sessions_formation s ON e.session_id = s.id
       JOIN formations fo ON s.formation_id = fo.id
       JOIN participants p ON e.participant_id = p.id
       WHERE e.formateur_id = ?
       ORDER BY e.created_at DESC`,
      [formateur_id]
    );

    res.json(evaluations);
  } catch (error) {
    console.error('Get evaluations by formateur error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getFormateurStats = async (req, res) => {
  try {
    const { formateur_id } = req.params;

    const [stats] = await db.query(
      `SELECT 
        COUNT(*) as total_evaluations,
        AVG(note_pedagogie) as moy_pedagogie,
        AVG(note_rythme) as moy_rythme,
        AVG(note_support) as moy_support,
        AVG(note_maitrise) as moy_maitrise,
        AVG((note_pedagogie + note_rythme + note_support + note_maitrise) / 4) as moyenne_generale
       FROM evaluations
       WHERE formateur_id = ?`,
      [formateur_id]
    );

    if (stats.length === 0 || stats[0].total_evaluations === 0) {
      return res.json({
        total_evaluations: 0,
        moy_pedagogie: 0,
        moy_rythme: 0,
        moy_support: 0,
        moy_maitrise: 0,
        moyenne_generale: 0
      });
    }

    res.json(stats[0]);
  } catch (error) {
    console.error('Get formateur stats error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getEvaluationLink = async (req, res) => {
  try {
    const { session_id, participant_id } = req.params;

    const [sessions] = await db.query(
      `SELECT s.id, s.formateur_id, f.titre as formation_titre
       FROM sessions_formation s
       JOIN formations f ON s.formation_id = f.id
       WHERE s.id = ?`,
      [session_id]
    );

    if (sessions.length === 0) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    const [inscriptions] = await db.query(
      'SELECT * FROM inscriptions WHERE session_id = ? AND participant_id = ?',
      [session_id, participant_id]
    );

    if (inscriptions.length === 0) {
      return res.status(404).json({ message: 'Inscription non trouvée' });
    }

    res.json({
      session_id: sessions[0].id,
      formateur_id: sessions[0].formateur_id,
      formation_titre: sessions[0].formation_titre
    });
  } catch (error) {
    console.error('Get evaluation link error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createEvaluation,
  getEvaluationsBySession,
  getEvaluationsByFormateur,
  getFormateurStats,
  getEvaluationLink
};
