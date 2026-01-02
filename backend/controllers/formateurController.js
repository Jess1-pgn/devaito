const bcrypt = require('bcryptjs');
const db = require('../config/database');

const createFormateur = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, competences, remarques } = req.body;

    const [result] = await db.query(
      `INSERT INTO formateurs 
       (nom, prenom, email, telephone, competences, remarques, statut) 
       VALUES (?, ?, ?, ?, ?, ?, 'interne')`,
      [nom, prenom, email, telephone, competences, remarques]
    );

    res.status(201).json({
      message: 'Formateur créé avec succès',
      formateurId: result.insertId
    });
  } catch (error) {
    console.error('Create formateur error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllFormateurs = async (req, res) => {
  try {
    const { statut } = req.query;
    
    let query = 'SELECT * FROM formateurs WHERE 1=1';
    const params = [];

    if (statut) {
      query += ' AND statut = ?';
      params.push(statut);
    }

    query += ' ORDER BY created_at DESC';

    const [formateurs] = await db.query(query, params);
    res.json(formateurs);
  } catch (error) {
    console.error('Get formateurs error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getFormateurById = async (req, res) => {
  try {
    const { id } = req.params;

    const [formateurs] = await db.query(
      'SELECT * FROM formateurs WHERE id = ?',
      [id]
    );

    if (formateurs.length === 0) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    res.json(formateurs[0]);
  } catch (error) {
    console.error('Get formateur error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateFormateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, telephone, competences, remarques, statut } = req.body;

    const [result] = await db.query(
      `UPDATE formateurs 
       SET nom = ?, prenom = ?, email = ?, telephone = ?, 
           competences = ?, remarques = ?, statut = ?
       WHERE id = ?`,
      [nom, prenom, email, telephone, competences, remarques, statut, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    res.json({ message: 'Formateur mis à jour avec succès' });
  } catch (error) {
    console.error('Update formateur error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteFormateur = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM formateurs WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    res.json({ message: 'Formateur supprimé avec succès' });
  } catch (error) {
    console.error('Delete formateur error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const registerExternalFormateur = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, competences } = req.body;

    const [result] = await db.query(
      `INSERT INTO formateurs 
       (nom, prenom, email, telephone, competences, statut) 
       VALUES (?, ?, ?, ?, ?, 'en_attente')`,
      [nom, prenom, email, telephone, competences]
    );

    res.status(201).json({
      message: 'Candidature enregistrée avec succès. Vous serez contacté prochainement.',
      formateurId: result.insertId
    });
  } catch (error) {
    console.error('Register external formateur error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createFormateur,
  getAllFormateurs,
  getFormateurById,
  updateFormateur,
  deleteFormateur,
  registerExternalFormateur
};
