import { useState, useEffect } from 'react';
import { formationService } from '../services';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [formations, setFormations] = useState([]);
  const [filters, setFilters] = useState({ categorie: '', ville: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFormations();
  }, [filters]);

  const loadFormations = async () => {
    try {
      setLoading(true);
      const response = await formationService.getPublicFormations(filters);
      setFormations(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(formations.map(f => f.categorie))];
  const villes = [...new Set(formations.map(f => f.ville))];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Centre de Formation Professionnelle</h1>
        <p>Découvrez nos formations et développez vos compétences</p>
      </header>

      <div style={styles.filters}>
        <select 
          value={filters.categorie}
          onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
          style={styles.select}
        >
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          value={filters.ville}
          onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
          style={styles.select}
        >
          <option value="">Toutes les villes</option>
          {villes.map(ville => (
            <option key={ville} value={ville}>{ville}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={styles.loading}>Chargement...</div>
      ) : (
        <div style={styles.grid}>
          {formations.length === 0 ? (
            <p>Aucune formation disponible pour le moment.</p>
          ) : (
            formations.map(formation => (
              <div key={formation._id} style={styles.card}>
                <h3>{formation.titre}</h3>
                <div style={styles.badge}>{formation.categorie}</div>
                <p style={styles.description}>{formation.description}</p>
                <div style={styles.details}>
                  <span>⏱️ {formation.nombreHeures}h</span>
                  <span>💰 {formation.cout}€</span>
                </div>
                <Link to={`/register-participant/${formation._id}`} style={styles.button}>
                  S'inscrire
                </Link>
              </div>
            ))
          )}
        </div>
      )}
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
    textAlign: 'center',
    marginBottom: '3rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    justifyContent: 'center'
  },
  select: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    marginTop: '0.5rem'
  },
  description: {
    margin: '1rem 0',
    color: '#666'
  },
  details: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    color: '#555'
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem'
  }
};
