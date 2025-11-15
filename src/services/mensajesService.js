import authService from './authService';

const MENSAJES_API_URL = 'https://backcvbgtmdesa.azurewebsites.net/api';

const mensajesService = {
  // Enviar mensaje - Serie II
  enviarMensaje: async (contenido) => {
    try {
      const token = authService.getToken();
      const username = authService.getUsername();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${MENSAJES_API_URL}/Mensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  // TODO: Serie III - Obtener mensajes desde base de datos
  obtenerMensajes: async () => {
    // Este método se implementará en la Serie III
    // conectando directamente a SQL Server
    throw new Error('Método pendiente de implementación - Serie III');
  }
};

export default mensajesService;
