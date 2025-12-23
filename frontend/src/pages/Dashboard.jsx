import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1>Tableau de bord</h1>
      <p style={styles.welcome}>Bienvenue, {user?.prenom} {user?.nom}</p>
      <p>Rôle: <strong>{user?.role}</strong></p>

      <div style={styles.grid}>
        {(user?.role === 'admin' || user?.role === 'assistant') && (
          <>
            <Link to="/formations" style={styles.card}>
              <h3>📚 Formations</h3>
              <p>Gérer les formations</p>
            </Link>

            <Link to="/formateurs" style={styles.card}>
              <h3>👨‍🏫 Formateurs</h3>
              <p>Gérer les formateurs</p>
            </Link>

            <Link to="/entreprises" style={styles.card}>
              <h3>🏢 Entreprises</h3>
              <p>Gérer les entreprises</p>
            </Link>

            <Link to="/sessions" style={styles.card}>
              <h3>📅 Sessions</h3>
              <p>Planifier les sessions</p>
            </Link>

            <Link to="/participants" style={styles.card}>
              <h3>👥 Participants</h3>
              <p>Gérer les participants</p>
            </Link>
          </>
        )}

        {user?.role === 'formateur' && (
          <>
            <Link to="/mes-sessions" style={styles.card}>
              <h3>📅 Mes Sessions</h3>
              <p>Voir mes sessions de formation</p>
            </Link>

            <Link to="/mes-evaluations" style={styles.card}>
              <h3>⭐ Mes Évaluations</h3>
              <p>Consulter mes évaluations</p>
            </Link>
          </>
        )}
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
  welcome: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  }
};
