import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(formData.username, formData.password);
      // Redirigir al chat después del login exitoso
      navigate('/chat');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header-info">
          <h3>Nataly Michell Cux Recinos</h3>
          <p className="carnet-info">Carné: 1890-22-18009</p>
        </div>
        
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Examen Final - Desarrollo Web</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ej: ctezop (sin @miumg.edu.gt)"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <small className="form-hint">
              Ingrese solo la parte antes del @miumg.edu.gt
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña de prueba: 123456a"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <div className="login-info">
          <p>💡 <strong>Prueba:</strong></p>
          <p>Usuario: oaranam3</p>
          <p>Contraseña: 123456a</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
