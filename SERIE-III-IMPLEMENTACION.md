# 📝 Guía de Implementación - SERIE III

## Visualización de Mensajes desde SQL Server

### 🎯 Objetivo
Mostrar los mensajes del chat consultándolos directamente desde la base de datos SQL Server.

---

## 📋 Requisitos

### Datos de Conexión
- **Server:** svr-sql-ctezo.southcentralus.cloudapp.azure.com
- **Usuario:** usr_DesaWebDevUMG
- **Password:** !ngGuast@360
- **Base de Datos:** db_DesaWebDevUMG
- **Tabla:** [dbo].[Chat_Mensaje]

---

## 🔧 Implementación

### Opción 1: Backend Intermediario (RECOMENDADO)

Crea un endpoint en tu backend que consulte la base de datos:

#### En tu backend (.NET/Node.js):

**Endpoint a crear:**
```
GET /api/Mensajes/obtener
```

**Lógica:**
1. Conectar a SQL Server con las credenciales proporcionadas
2. Consultar: `SELECT * FROM [dbo].[Chat_Mensaje] ORDER BY Fecha_Creacion ASC`
3. Devolver los mensajes en formato JSON

#### En el frontend:

**Archivo a modificar:** `src/services/mensajesService.js`

```javascript
// Reemplazar el método obtenerMensajes:
obtenerMensajes: async () => {
  try {
    const token = authService.getToken();
    
    const response = await fetch(`${MENSAJES_API_URL}/Mensajes/obtener`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener mensajes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
```

**Archivo a modificar:** `src/pages/Chat/Chat.jsx`

```javascript
// Línea 11 - Agregar:
const [mensajes, setMensajes] = useState([]);

// Línea 17 - Agregar después del useEffect existente:
useEffect(() => {
  cargarMensajes();
  // Opcional: actualizar cada 5 segundos
  const interval = setInterval(cargarMensajes, 5000);
  return () => clearInterval(interval);
}, []);

// Agregar nueva función:
const cargarMensajes = async () => {
  try {
    const data = await mensajesService.obtenerMensajes();
    setMensajes(data);
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
  }
};

// Reemplazar el div "messages-placeholder" (líneas 68-82) con:
<div className="chat-messages">
  {mensajes.length === 0 ? (
    <p className="no-messages">No hay mensajes aún</p>
  ) : (
    <div className="messages-list">
      {mensajes.map((msg, index) => (
        <div 
          key={index} 
          className={`message ${msg.Login_Emisor === username ? 'message-own' : 'message-other'}`}
        >
          <div className="message-header">
            <strong>{msg.Login_Emisor}</strong>
            <span className="message-time">
              {new Date(msg.Fecha_Creacion).toLocaleString('es-ES')}
            </span>
          </div>
          <div className="message-content">
            {msg.Contenido}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
```

**Archivo a modificar:** `src/pages/Chat/Chat.css`

```css
/* Agregar al final del archivo: */

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
}

.message {
  padding: 1rem;
  border-radius: 8px;
  max-width: 70%;
}

.message-own {
  background-color: #3498db;
  color: white;
  align-self: flex-end;
  margin-left: auto;
}

.message-other {
  background-color: white;
  border: 1px solid #e0e0e0;
  align-self: flex-start;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.message-own .message-header {
  opacity: 0.9;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.message-content {
  word-wrap: break-word;
}

.no-messages {
  text-align: center;
  color: #7f8c8d;
  padding: 2rem;
}
```

---

### Opción 2: Conexión Directa desde Frontend (NO RECOMENDADO)

**⚠️ Advertencia:** No es seguro exponer credenciales de BD en el frontend.

Si necesitas hacerlo solo para propósitos de demostración:

```bash
npm install mssql
```

Crea un archivo de configuración de DB, pero ten en cuenta las limitaciones de seguridad.

---

## 🎨 Mejoras Opcionales

### 1. Auto-scroll al nuevo mensaje
```javascript
useEffect(() => {
  const messagesEnd = document.querySelector('.messages-list');
  if (messagesEnd) {
    messagesEnd.scrollTop = messagesEnd.scrollHeight;
  }
}, [mensajes]);
```

### 2. Indicador de carga
```javascript
const [loadingMessages, setLoadingMessages] = useState(true);

// En cargarMensajes:
setLoadingMessages(true);
// ... fetch
setLoadingMessages(false);

// En el render:
{loadingMessages ? <div>Cargando mensajes...</div> : /* mensajes */}
```

### 3. Actualización en tiempo real
Usar WebSockets o polling cada X segundos.

---

## ✅ Checklist de Implementación

- [ ] Crear endpoint en backend para obtener mensajes
- [ ] Probar conexión a SQL Server desde backend
- [ ] Actualizar `mensajesService.js` con el nuevo método
- [ ] Modificar `Chat.jsx` para cargar y mostrar mensajes
- [ ] Agregar estilos en `Chat.css`
- [ ] Probar la visualización cronológica
- [ ] Verificar que se actualice al enviar un nuevo mensaje
- [ ] Deploy del backend y frontend
- [ ] Prueba end-to-end completa

---

## 🔍 Estructura de la Tabla [dbo].[Chat_Mensaje]

Campos esperados (verificar con tu tabla real):
- `Id` o `Cod_Mensaje` (int)
- `Cod_Sala` (int)
- `Login_Emisor` (varchar)
- `Contenido` (text/varchar)
- `Fecha_Creacion` (datetime)

---

## 🐛 Troubleshooting

### Error de conexión a SQL Server
- Verifica firewall y reglas de red
- Confirma que el servidor permita conexiones remotas
- Valida credenciales

### CORS en el backend
Asegúrate de permitir el dominio del frontend:
```csharp
// .NET
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("https://tu-frontend.vercel.app")
                       .AllowAnyMethod()
                       .AllowAnyHeader());
});
```

### Token expirado
Implementa renovación de token o maneja el error 401.

---

## 📞 Contacto

Si tienes dudas, revisa la documentación del examen o consulta con el catedrático.

---

¡Buena suerte con la implementación de la Serie III! 🚀
