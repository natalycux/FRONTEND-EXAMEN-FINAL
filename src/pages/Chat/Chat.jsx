import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import mensajesService from '../../services/mensajesService';
import './Chat.css';

const Chat = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const username = authService.getUsername();

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mensaje.trim()) {
      setError('Por favor escribe un mensaje');
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await mensajesService.enviarMensaje(mensaje);
      setSuccess('¡Mensaje enviado correctamente!');
      setMensaje('');
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Error al enviar mensaje');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h1>Chat - SERIE II</h1>
          <p className="chat-user">Usuario: <strong>{username}</strong></p>
        </div>
        <button onClick={handleLogout} className="btn btn-logout">
          Cerrar Sesión
        </button>
      </div>

      <div className="chat-content">
        {/* SERIE III: Área de visualización de mensajes */}
        <div className="chat-messages">
          <div className="messages-placeholder">
            <h3>📝 Visualización de Mensajes</h3>
            <p>SERIE III - Pendiente de implementación</p>
            <p className="info-text">
              Aquí se mostrarán los mensajes obtenidos directamente de la base de datos SQL Server
            </p>
            <div className="db-info">
              <p><strong>Conexión programada a:</strong></p>
              <p>Server: svr-sql-ctezo.southcentralus.cloudapp.azure.com</p>
              <p>BD: db_DesaWebDevUMG</p>
              <p>Tabla: [dbo].[Chat_Mensaje]</p>
            </div>
          </div>
        </div>

        {/* SERIE II: Formulario de envío */}
        <div className="chat-input-section">
          <h2>Enviar Mensaje</h2>
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="chat-form">
            <div className="form-group">
              <label htmlFor="mensaje">Tu mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                rows="4"
                disabled={loading}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-send"
              disabled={loading}
            >
              {loading ? 'Enviando...' : '📤 Enviar Mensaje'}
            </button>
          </form>

          <div className="api-info">
            <p><strong>ℹ️ Información de la petición:</strong></p>
            <p>Endpoint: POST /api/Mensajes</p>
            <p>Cod_Sala: 0</p>
            <p>Login_Emisor: {username}</p>
            <p>Authorization: Bearer Token ✓</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
