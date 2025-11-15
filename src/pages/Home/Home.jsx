import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import './Home.css';

const Home = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido al Examen Final</h1>
        <p className="home-description">
          Esta es una aplicación full-stack que demuestra la integración entre:
        </p>
        <ul className="home-features">
          <li>✅ Frontend en React con Vite</li>
          <li>✅ Backend API REST</li>
          <li>✅ Base de datos SQL Server</li>
          <li>✅ Autenticación con JWT</li>
          <li>✅ Deploy en la nube</li>
        </ul>

        <div className="home-sections">
          <div className="home-card">
            <h2>🔐 SERIE I: Login</h2>
            <p>Autenticación con usuario y contraseña</p>
            <p className="card-detail">Endpoint: /api/login/authenticate</p>
            {!isAuthenticated && (
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
            )}
          </div>

          <div className="home-card">
            <h2>💬 SERIE II: Chat</h2>
            <p>Envío de mensajes con token Bearer</p>
            <p className="card-detail">Endpoint: /api/Mensajes (POST)</p>
            {isAuthenticated ? (
              <Link to="/chat" className="btn btn-primary">
                Ir al Chat
              </Link>
            ) : (
              <p className="card-locked">🔒 Requiere autenticación</p>
            )}
          </div>

          <div className="home-card">
            <h2>📋 SERIE III: Mensajes</h2>
            <p>Visualización cronológica desde SQL Server</p>
            <p className="card-detail">Conexión directa a base de datos</p>
            {isAuthenticated ? (
              <span className="badge badge-warning">Pendiente</span>
            ) : (
              <p className="card-locked">🔒 Requiere autenticación</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
