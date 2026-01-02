const db = require('../config/database');

const createFormation = async (req, res) => {
  try {
    const { 
      titre, 
      description, 
      categorie, 
      nombre_heures, 
      cout, 
      objectifs, 
      programme,
      type_public,
      ville
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO formations 
       (titre, description, categorie, nombre_heures, cout, objectifs, programme, type_public, ville) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titre, description, categorie, nombre_heures, cout, objectifs, programme, type_public, ville]
    );

    res.status(201).json({
      message: 'Formation créée avec succès',
      formationId: result.insertId
    });
  } catch (error) {
    console.error('Create formation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllFormations = async (req, res) => {
  try {
    const { categorie, ville, date } = req.query;
    
    let query = 'SELECT * FROM formations WHERE 1=1';
    const params = [];

    if (categorie) {
      query += ' AND categorie = ?';
      params.push(categorie);
    }

    if (ville) {
      query += ' AND ville = ?';
      params.push(ville);
    }

    query += ' ORDER BY created_at DESC';

    const [formations] = await db.query(query, params);
    res.json(formations);
  } catch (error) {
    console.error('Get formations error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getFormationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [formations] = await db.query(
      'SELECT * FROM formations WHERE id = ?',
      [id]
    );

    if (formations.length === 0) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    res.json(formations[0]);
  } catch (error) {
    console.error('Get formation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      titre, 
      description, 
      categorie, 
      nombre_heures, 
      cout, 
      objectifs, 
      programme,
      type_public,
      ville
    } = req.body;

    const [result] = await db.query(
      `UPDATE formations 
       SET titre = ?, description = ?, categorie = ?, nombre_heures = ?, 
           cout = ?, objectifs = ?, programme = ?, type_public = ?, ville = ?
       WHERE id = ?`,
      [titre, description, categorie, nombre_heures, cout, objectifs, programme, type_public, ville, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    res.json({ message: 'Formation mise à jour avec succès' });
  } catch (error) {
    console.error('Update formation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM formations WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    res.json({ message: 'Formation supprimée avec succès' });
  } catch (error) {
    console.error('Delete formation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createFormation,
  getAllFormations,
  getFormationById,
  updateFormation,
  deleteFormation
};
