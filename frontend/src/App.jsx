import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FormationsPage } from './pages/FormationsPage';
import { FormateursPage } from './pages/FormateursPage';
import { RegisterParticipant } from './pages/RegisterParticipant';
import { RegisterFormateur } from './pages/RegisterFormateur';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-participant/:formationId" element={<RegisterParticipant />} />
            <Route path="/register-formateur" element={<RegisterFormateur />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/formations" 
              element={
                <PrivateRoute allowedRoles={['admin', 'assistant']}>
                  <FormationsPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/formateurs" 
              element={
                <PrivateRoute allowedRoles={['admin', 'assistant']}>
                  <FormateursPage />
                </PrivateRoute>
              } 
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
