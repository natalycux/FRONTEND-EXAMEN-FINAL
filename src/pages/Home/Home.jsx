import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    // Si está autenticado, redirigir al chat
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      // Si no está autenticado, redirigir al login
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="student-banner">
          <h1>Nataly Michell Cux Recinos</h1>
          <p className="carnet">Carné: 1890-22-18009</p>
          <div className="loading-spinner"></div>
          <p className="loading-text">Redirigiendo...</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
