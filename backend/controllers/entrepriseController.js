const db = require('../config/database');

const createEntreprise = async (req, res) => {
  try {
    const { nom, adresse, telephone, email, url } = req.body;

    const [result] = await db.query(
      `INSERT INTO entreprises 
       (nom, adresse, telephone, email, url) 
       VALUES (?, ?, ?, ?, ?)`,
      [nom, adresse, telephone, email, url]
    );

    res.status(201).json({
      message: 'Entreprise créée avec succès',
      entrepriseId: result.insertId
    });
  } catch (error) {
    console.error('Create entreprise error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllEntreprises = async (req, res) => {
  try {
    const [entreprises] = await db.query(
      'SELECT * FROM entreprises ORDER BY nom ASC'
    );

    res.json(entreprises);
  } catch (error) {
    console.error('Get entreprises error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getEntrepriseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [entreprises] = await db.query(
      'SELECT * FROM entreprises WHERE id = ?',
      [id]
    );

    if (entreprises.length === 0) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    res.json(entreprises[0]);
  } catch (error) {
    console.error('Get entreprise error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateEntreprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, telephone, email, url } = req.body;

    const [result] = await db.query(
      `UPDATE entreprises 
       SET nom = ?, adresse = ?, telephone = ?, email = ?, url = ?
       WHERE id = ?`,
      [nom, adresse, telephone, email, url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    res.json({ message: 'Entreprise mise à jour avec succès' });
  } catch (error) {
    console.error('Update entreprise error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteEntreprise = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM entreprises WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    res.json({ message: 'Entreprise supprimée avec succès' });
  } catch (error) {
    console.error('Delete entreprise error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createEntreprise,
  getAllEntreprises,
  getEntrepriseById,
  updateEntreprise,
  deleteEntreprise
};
