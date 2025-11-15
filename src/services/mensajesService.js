import authService from './authService';

// URL de la API del examen (para Serie II - ENVIAR)
const API_EXAMEN_URL = 'https://backcvbgtmdesa.azurewebsites.net/api';

// URL de TU PROPIA API (para Serie III - OBTENER)
const API_PROPIA_URL = 'https://api-examen-nataly18009.azurewebsites.net/api';

const mensajesService = {
  // -----------------------------------------------------------------
  // SERIE II: Enviar Mensaje (Usa la API del Examen)
  // -----------------------------------------------------------------
  enviarMensaje: async (contenido) => {
    try {
      const token = authService.getToken();
      const username = authService.getUsername();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      // IMPORTANTE: Hacemos POST a la API del examen
      const response = await fetch(`${API_EXAMEN_URL}/Mensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Requerido por la Serie II
        },
        body: JSON.stringify({
          Cod_Sala: 0,
          Login_Emisor: username,
          Contenido: contenido
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar mensaje');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // -----------------------------------------------------------------
  // SERIE III: Obtener Mensajes (Usa TU API)
  // -----------------------------------------------------------------
  obtenerMensajes: async () => {
    try {
      // IMPORTANTE: Hacemos GET a TU PROPIA API
      // Esta API es pública (según la Serie III), por lo que no necesita token.
      const response = await fetch(`${API_PROPIA_URL}/Mensajes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // No enviamos token 'Authorization' porque esta es tu API
          // y la Serie III no lo pide para la lectura.
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener mensajes desde tu API');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // (Mantenemos las otras funciones por si las usas, pero las apuntamos a tu API)
  
  obtenerMensajesRecientes: async (cantidad = 100) => {
     // Esta función ahora solo llamará a obtenerMensajes()
     // ya que tu API simple de /api/Mensajes no filtra por cantidad.
     // Esto es suficiente para que 'cargarMensajes' en Chat.jsx funcione.
    return mensajesService.obtenerMensajes();
  },

  obtenerMensajesPorSala: async (codSala = 0) => {
     // Lo mismo aquí, solo llamamos al método principal.
    return mensajesService.obtenerMensajes();
  }
};

export default mensajesService;