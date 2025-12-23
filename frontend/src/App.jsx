import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
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
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
