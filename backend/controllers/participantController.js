const db = require('../config/database');

const registerParticipant = async (req, res) => {
  try {
    const { 
      nom, 
      prenom, 
      date_naissance, 
      ville, 
      email, 
      telephone, 
      session_id 
    } = req.body;

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [participantResult] = await connection.query(
        `INSERT INTO participants 
         (nom, prenom, date_naissance, ville, email, telephone) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nom, prenom, date_naissance, ville, email, telephone]
      );

      const participantId = participantResult.insertId;

      await connection.query(
        `INSERT INTO inscriptions 
         (participant_id, session_id, statut) 
         VALUES (?, ?, 'en_attente')`,
        [participantId, session_id]
      );

      await connection.commit();

      res.status(201).json({
        message: 'Inscription réussie. Vous serez contacté prochainement.',
        participantId: participantId
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Register participant error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à cette session' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllParticipants = async (req, res) => {
  try {
    const [participants] = await db.query(
      'SELECT * FROM participants ORDER BY created_at DESC'
    );

    res.json(participants);
  } catch (error) {
    console.error('Get participants error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;

    const [participants] = await db.query(
      'SELECT * FROM participants WHERE id = ?',
      [id]
    );

    if (participants.length === 0) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }

    res.json(participants[0]);
  } catch (error) {
    console.error('Get participant error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getInscriptionsBySession = async (req, res) => {
  try {
    const { session_id } = req.params;

    const [inscriptions] = await db.query(
      `SELECT i.*, p.nom, p.prenom, p.email, p.telephone, p.ville
       FROM inscriptions i
       JOIN participants p ON i.participant_id = p.id
       WHERE i.session_id = ?
       ORDER BY i.created_at DESC`,
      [session_id]
    );

    res.json(inscriptions);
  } catch (error) {
    console.error('Get inscriptions error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateInscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const [result] = await db.query(
      'UPDATE inscriptions SET statut = ? WHERE id = ?',
      [statut, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inscription non trouvée' });
    }

    res.json({ message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error('Update inscription error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  registerParticipant,
  getAllParticipants,
  getParticipantById,
  getInscriptionsBySession,
  updateInscriptionStatus
};
