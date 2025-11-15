import api from '../config/api';

const AUTH_API_URL = 'https://backcvbgtmdesa.azurewebsites.net/api';

// Servicio de autenticación
const authService = {
  // Login - Serie I
  login: async (username, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/login/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          Password: password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      
      // Guardar token y usuario en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Obtener usuario
  getUsername: () => {
    return localStorage.getItem('username');
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
