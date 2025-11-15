import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import mensajesService from '../../services/mensajesService'; // Asegúrate que la ruta sea correcta
import './Chat.css';

const Chat = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const messagesEndRef = useRef(null);
  const username = authService.getUsername();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    cargarMensajes();
    
    const interval = setInterval(cargarMensajes, 5000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  // --- CAMBIO 1 ---
  // Simplificado para usar la nueva función del servicio
  const cargarMensajes = async () => {
    try {
      // Usamos la función que apunta a TU API
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
      // Esta función (enviarMensaje) sigue apuntando a la API del examen (Serie II)
      await mensajesService.enviarMensaje(mensaje);
      setSuccess('¡Mensaje enviado correctamente!');
      setMensaje('');
      
      await cargarMensajes(); // Recargar mensajes de TU API
      
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
              // --- CAMBIO 2 ---
              // Aquí se actualizan los nombres de las propiedades
              // para que coincidan con el JSON de tu API (camelCase)
              <div className="messages-list">
                {mensajes.map((msg, index) => (
                  <div 
                    // Usamos 'idMensaje' que viene de tu API
                    key={msg.idMensaje || index} 
                    // Usamos 'loginEmisor' (camelCase)
                    className={`message-bubble ${msg.loginEmisor === username ? 'own-message' : 'other-message'}`}
                  >
                    <div className="message-author">
                      {/* Usamos 'loginEmisor' (camelCase) */}
                      {msg.loginEmisor === username ? '👤 Tú' : `👥 ${msg.loginEmisor}`}
                    </div>
                    <div className="message-text">
                      {/* 'contenido' (camelCase) estaba bien */}
                      {msg.contenido}
                    </div>
                    <div className="message-time">
                      {/* Usamos 'fechaEnvio' (camelCase) */}
                      {formatDate(msg.fechaEnvio)}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Sección de envío - SERIE II */}
        <div className="input-panel">
          {/* ... (El resto del formulario de envío no cambia) ... */}
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