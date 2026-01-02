const db = require('../config/database');

const createSession = async (req, res) => {
  try {
    const { 
      formation_id, 
      formateur_id, 
      entreprise_id, 
      date_debut, 
      date_fin, 
      type_session 
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO sessions_formation 
       (formation_id, formateur_id, entreprise_id, date_debut, date_fin, type_session, statut) 
       VALUES (?, ?, ?, ?, ?, ?, 'planifie')`,
      [formation_id, formateur_id, entreprise_id, date_debut, date_fin, type_session]
    );

    res.status(201).json({
      message: 'Session créée avec succès',
      sessionId: result.insertId
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const { formation_id, formateur_id, entreprise_id, statut } = req.query;
    
    let query = `
      SELECT s.*, 
             f.titre as formation_titre,
             fo.nom as formateur_nom, 
             fo.prenom as formateur_prenom,
             e.nom as entreprise_nom
      FROM sessions_formation s
      LEFT JOIN formations f ON s.formation_id = f.id
      LEFT JOIN formateurs fo ON s.formateur_id = fo.id
      LEFT JOIN entreprises e ON s.entreprise_id = e.id
      WHERE 1=1
    `;
    const params = [];

    if (formation_id) {
      query += ' AND s.formation_id = ?';
      params.push(formation_id);
    }

    if (formateur_id) {
      query += ' AND s.formateur_id = ?';
      params.push(formateur_id);
    }

    if (entreprise_id) {
      query += ' AND s.entreprise_id = ?';
      params.push(entreprise_id);
    }

    if (statut) {
      query += ' AND s.statut = ?';
      params.push(statut);
    }

    query += ' ORDER BY s.date_debut DESC';

    const [sessions] = await db.query(query, params);
    res.json(sessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    const [sessions] = await db.query(
      `SELECT s.*, 
              f.titre as formation_titre,
              f.description as formation_description,
              fo.nom as formateur_nom, 
              fo.prenom as formateur_prenom,
              fo.email as formateur_email,
              e.nom as entreprise_nom,
              e.adresse as entreprise_adresse
       FROM sessions_formation s
       LEFT JOIN formations f ON s.formation_id = f.id
       LEFT JOIN formateurs fo ON s.formateur_id = fo.id
       LEFT JOIN entreprises e ON s.entreprise_id = e.id
       WHERE s.id = ?`,
      [id]
    );

    if (sessions.length === 0) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json(sessions[0]);
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      formation_id, 
      formateur_id, 
      entreprise_id, 
      date_debut, 
      date_fin, 
      type_session,
      statut 
    } = req.body;

    const [result] = await db.query(
      `UPDATE sessions_formation 
       SET formation_id = ?, formateur_id = ?, entreprise_id = ?, 
           date_debut = ?, date_fin = ?, type_session = ?, statut = ?
       WHERE id = ?`,
      [formation_id, formateur_id, entreprise_id, date_debut, date_fin, type_session, statut, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json({ message: 'Session mise à jour avec succès' });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM sessions_formation WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json({ message: 'Session supprimée avec succès' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const assignFormateurToSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { formateur_id } = req.body;

    const [result] = await db.query(
      'UPDATE sessions_formation SET formateur_id = ? WHERE id = ?',
      [formateur_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json({ message: 'Formateur assigné avec succès' });
  } catch (error) {
    console.error('Assign formateur error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  assignFormateurToSession
};
