import { useState, useEffect } from 'react'; // Se quita 'useRef'
import { useNavigate } from 'react-router-dom';

// Rutas actualizadas asumiendo que 'services' y 'Chat.css' están en 'docs'
import authService from '../../services/authService';
import mensajesService from '../../services/mensajesService';
import './Chat.css'; 

const Chat = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Se eliminó 'messagesEndRef'
  const username = authService.getUsername();

  // Se eliminó la función 'scrollToBottom'

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Cargar mensajes iniciales
    cargarMensajes();
    
    // Actualizar mensajes cada 5 segundos
    const interval = setInterval(cargarMensajes, 5000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  // Se eliminó el 'useEffect' que llamaba a 'scrollToBottom'

  const cargarMensajes = async () => {
    try {
      // Esta función llama a tu API (con OrderByDescending)
      const data = await mensajesService.obtenerMensajes();
      setMensajes(data);
    } catch (err) {
      console.error('Error al cargar mensajes:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

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
      // Esta función (enviarMensaje) usa la API del examen
      await mensajesService.enviarMensaje(mensaje);
      setSuccess('¡Mensaje enviado correctamente!');
      setMensaje('');
      
      // Recargar mensajes inmediatamente
      await cargarMensajes();
      
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="chat-page">
      {/* Header con información del estudiante */}
      <div className="chat-page-header">
        <div className="student-info-banner">
          <div className="student-details">
            <h2>Nataly Michell Cux Recinos</h2>
            <p>Carné: 1890-22-18009</p>
          </div>
          <div className="user-session">
            <p className="username-display">👤 {username}</p>
            <button onClick={handleLogout} className="btn btn-logout">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="chat-container">
        {/* Sección de mensajes - SERIE III */}
        <div className="messages-panel">
          <div className="panel-header">
            <div className="panel-title">
              <h2>💬 Chat en Tiempo Real</h2>
            </div>
            <button 
              onClick={cargarMensajes} 
              className="btn-refresh"
              disabled={loadingMessages}
              title="Actualizar mensajes"
            >
              🔄
            </button>
          </div>

          <div className="messages-container">
            {loadingMessages ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Cargando mensajes...</p>
              </div>
            ) : mensajes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No hay mensajes</h3>
                <p>¡Sé el primero en escribir algo!</p>
              </div>
            ) : (
              <div className="messages-list">
                {/* Los mensajes se renderizan como vienen de la API (nuevos primero) */}
                {mensajes.map((msg, index) => (
                  <div 
                    key={msg.idMensaje || index} 
                    className={`message-bubble ${msg.loginEmisor === username ? 'own-message' : 'other-message'}`}
                  >
                    <div className="message-author">
                      {msg.loginEmisor === username ? '👤 Tú' : `👥 ${msg.loginEmisor}`}
                    </div>
                    <div className="message-text">
                      {msg.contenido}
                    </div>
                    <div className="message-time">
                      {formatDate(msg.fechaEnvio)}
                    </div>
                  </div>
                ))}
                
                {/* Se eliminó el div 'messagesEndRef' */}
              </div>
            )}
          </div>
        </div>

        {/* Sección de envío - SERIE II */}
        <div className="input-panel">
          <div className="panel-header">
            <div className="panel-title">
              <h2>✍️ Enviar Mensaje</h2>
            </div>
          </div>
          <div className="input-container">
            {error && (
              <div className="alert alert-error">
                ❌ {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                ✅ {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="message-form">
              <textarea
                id="mensaje"
                name="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                rows="4"
                disabled={loading}
                required
                className="message-textarea"
              />
              <button 
                type="submit" 
                className="btn btn-send"
                disabled={loading || !mensaje.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Enviando...
                  </>
                ) : (
                  <>📤 Enviar Mensaje</>
                )}
              </button>
            </form>
            <div className="project-info">
              <p><strong>Examen Final - Desarrollo Web</strong></p>
              <p className="info-detail">Autenticación JWT • Chat en Tiempo Real • SQL Server</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;