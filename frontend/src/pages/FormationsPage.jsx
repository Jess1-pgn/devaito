import { useState, useEffect } from 'react';
import { formationService } from '../services';
import { useAuth } from '../contexts/AuthContext';

export const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    categorie: '',
    nombreHeures: '',
    cout: '',
    objectifs: '',
    programme: '',
    description: '',
    isPublique: true
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      const response = await formationService.getFormations();
      setFormations(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await formationService.updateFormation(editingId, formData);
      } else {
        await formationService.createFormation(formData);
      }
      resetForm();
      loadFormations();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (formation) => {
    setFormData(formation);
    setEditingId(formation._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await formationService.deleteFormation(id);
        loadFormations();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      categorie: '',
      nombreHeures: '',
      cout: '',
      objectifs: '',
      programme: '',
      description: '',
      isPublique: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Gestion des Formations</h1>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
            {showForm ? 'Annuler' : '+ Nouvelle Formation'}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Titre *</label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Catégorie *</label>
              <input
                type="text"
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Nombre d'heures *</label>
              <input
                type="number"
                value={formData.nombreHeures}
                onChange={(e) => setFormData({ ...formData, nombreHeures: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Coût (€) *</label>
              <input
                type="number"
                value={formData.cout}
                onChange={(e) => setFormData({ ...formData, cout: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ ...styles.input, minHeight: '60px' }}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Objectifs *</label>
            <textarea
              value={formData.objectifs}
              onChange={(e) => setFormData({ ...formData, objectifs: e.target.value })}
              required
              style={{ ...styles.input, minHeight: '80px' }}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Programme détaillé *</label>
            <textarea
              value={formData.programme}
              onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
              required
              style={{ ...styles.input, minHeight: '120px' }}
            />
          </div>

          <div style={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.isPublique}
                onChange={(e) => setFormData({ ...formData, isPublique: e.target.checked })}
              />
              {' '}Visible publiquement
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
            <button type="button" onClick={resetForm} style={styles.cancelButton}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <div style={styles.table}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Titre</th>
              <th style={styles.th}>Catégorie</th>
              <th style={styles.th}>Heures</th>
              <th style={styles.th}>Coût</th>
              <th style={styles.th}>Public</th>
              {isAdmin && <th style={styles.th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {formations.map((formation) => (
              <tr key={formation._id} style={styles.tableRow}>
                <td style={styles.td}>{formation.titre}</td>
                <td style={styles.td}>{formation.categorie}</td>
                <td style={styles.td}>{formation.nombreHeures}h</td>
                <td style={styles.td}>{formation.cout}€</td>
                <td style={styles.td}>{formation.isPublique ? '✓' : '✗'}</td>
                {isAdmin && (
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(formation)} style={styles.editButton}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(formation._id)} style={styles.deleteButton}>
                      Supprimer
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: '#fff'
  },
  th: {
    padding: '1rem',
    textAlign: 'left'
  },
  tableRow: {
    borderBottom: '1px solid #ecf0f1'
  },
  td: {
    padding: '1rem'
  },
  editButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
