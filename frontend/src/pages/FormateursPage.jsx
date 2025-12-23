import { useState, useEffect } from 'react';
import { formateurService } from '../services';
import { useAuth } from '../contexts/AuthContext';

export const FormateursPage = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motsCles: '',
    remarques: '',
    statut: 'interne'
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadFormateurs();
  }, []);

  const loadFormateurs = async () => {
    try {
      const response = await formateurService.getFormateurs();
      setFormateurs(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        motsCles: formData.motsCles.split(',').map(k => k.trim()).filter(k => k)
      };

      if (editingId) {
        await formateurService.updateFormateur(editingId, data);
      } else {
        await formateurService.createFormateur(data);
      }
      resetForm();
      loadFormateurs();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (formateur) => {
    setFormData({
      ...formateur,
      motsCles: formateur.motsCles.join(', ')
    });
    setEditingId(formateur._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      try {
        await formateurService.deleteFormateur(id);
        loadFormateurs();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      motsCles: '',
      remarques: '',
      statut: 'interne'
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Gestion des Formateurs</h1>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
            {showForm ? 'Annuler' : '+ Nouveau Formateur'}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Nom *</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Prénom *</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Téléphone *</label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Mots-clés (séparés par des virgules) *</label>
            <input
              type="text"
              value={formData.motsCles}
              onChange={(e) => setFormData({ ...formData, motsCles: e.target.value })}
              placeholder="ex: Java, Spring, React"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              style={styles.input}
            >
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
              <option value="en_attente">En attente</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Remarques</label>
            <textarea
              value={formData.remarques}
              onChange={(e) => setFormData({ ...formData, remarques: e.target.value })}
              style={{ ...styles.input, minHeight: '80px' }}
            />
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
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Téléphone</th>
              <th style={styles.th}>Compétences</th>
              <th style={styles.th}>Statut</th>
              {isAdmin && <th style={styles.th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {formateurs.map((formateur) => (
              <tr key={formateur._id} style={styles.tableRow}>
                <td style={styles.td}>{formateur.prenom} {formateur.nom}</td>
                <td style={styles.td}>{formateur.email}</td>
                <td style={styles.td}>{formateur.telephone}</td>
                <td style={styles.td}>
                  <div style={styles.tagsContainer}>
                    {formateur.motsCles.map((mot, idx) => (
                      <span key={idx} style={styles.tag}>{mot}</span>
                    ))}
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={getStatutStyle(formateur.statut)}>
                    {formateur.statut}
                  </span>
                </td>
                {isAdmin && (
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(formateur)} style={styles.editButton}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(formateur._id)} style={styles.deleteButton}>
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

const getStatutStyle = (statut) => {
  const baseStyle = {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '500'
  };

  switch (statut) {
    case 'interne':
      return { ...baseStyle, backgroundColor: '#27ae60', color: '#fff' };
    case 'externe':
      return { ...baseStyle, backgroundColor: '#3498db', color: '#fff' };
    case 'en_attente':
      return { ...baseStyle, backgroundColor: '#f39c12', color: '#fff' };
    default:
      return baseStyle;
  }
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflowX: 'auto'
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
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem'
  },
  tag: {
    backgroundColor: '#ecf0f1',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.85rem'
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
