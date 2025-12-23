import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>Centre de Formation</Link>
        
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Accueil</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={styles.link}>Tableau de bord</Link>
              {(user?.role === 'admin' || user?.role === 'assistant') && (
                <>
                  <Link to="/formations" style={styles.link}>Formations</Link>
                  <Link to="/formateurs" style={styles.link}>Formateurs</Link>
                  <Link to="/entreprises" style={styles.link}>Entreprises</Link>
                  <Link to="/sessions" style={styles.link}>Sessions</Link>
                  <Link to="/participants" style={styles.link}>Participants</Link>
                </>
              )}
              <span style={styles.userInfo}>{user?.prenom} {user?.nom} ({user?.role})</span>
              <button onClick={logout} style={styles.button}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Connexion</Link>
              <Link to="/register-formateur" style={styles.link}>Devenir formateur</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    transition: 'color 0.3s',
    ':hover': {
      color: '#3498db'
    }
  },
  userInfo: {
    color: '#95a5a6',
    fontSize: '0.9rem'
  },
  button: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};
