# Examen Final - Desarrollo Web

**Estudiante:** Nataly Michell Cux Recinos  
**Carné:** 1890-22-18009

Aplicación full-stack que demuestra la integración completa entre frontend React, backend API REST y base de datos SQL Server con autenticación JWT.

## 🌟 Demo en Vivo

- **Frontend:** [Agregar URL de deploy]
- **API Backend:** https://api-examen-nataly18009.azurewebsites.net
- **API de Autenticación:** https://backcvbgtmdesa.azurewebsites.net

## 📋 Características Implementadas

### ✅ SERIE I: Autenticación (Login)
- Interfaz de inicio de sesión con campos Usuario y Contraseña
- Autenticación mediante API externa
- Almacenamiento seguro de token JWT en localStorage
- Validación de sesión en rutas protegidas

**Endpoint:** `POST https://backcvbgtmdesa.azurewebsites.net/api/login/authenticate`

### ✅ SERIE II: Envío de Mensajes
- Formulario para escribir y enviar mensajes
- Envío con token Bearer en cabecera Authorization
- Validación de autenticación requerida
- Retroalimentación visual de éxito/error

**Endpoint:** `POST https://backcvbgtmdesa.azurewebsites.net/api/Mensajes`

### ✅ SERIE III: Visualización de Mensajes
- Visualización cronológica de mensajes en tiempo real
- Actualización automática cada 5 segundos
- Conexión a base de datos SQL Server a través de API propia
- Diseño moderno tipo chat con burbujas de mensaje
- Diferenciación visual entre mensajes propios y ajenos

**Endpoints:**
- `GET /api/Mensajes/recientes/{cantidad}` - Obtener mensajes recientes
- `GET /api/Mensajes/sala/{codSala}` - Obtener mensajes por sala

## 🚀 Características

- ✅ React 18 con Vite
- ✅ React Router para navegación y rutas protegidas
- ✅ Axios para peticiones HTTP
- ✅ Autenticación JWT completa
- ✅ Chat en tiempo real con actualización automática
- ✅ Diseño responsivo y moderno
- ✅ Información del estudiante visible
- ✅ Listo para deploy en producción

## 📦 Instalación

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/natalycux/FRONTEND-EXAMEN-FINAL.git

# Instalar dependencias
cd FRONTEND-EXAMEN-FINAL
npm install
\`\`\`

## 🔧 Configuración

El archivo \`.env\` ya está configurado con las URLs de las APIs:

\`\`\`env
VITE_API_URL=https://api-examen-nataly18009.azurewebsites.net
\`\`\`

## 🏃‍♂️ Ejecución

### Modo desarrollo
\`\`\`bash
npm run dev
\`\`\`

La aplicación se abrirá en \`http://localhost:3000\`

### Modo producción
\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── components/
│   ├── Navbar/              # Barra de navegación
│   └── ProtectedRoute/      # Componente para rutas protegidas
├── pages/
│   ├── Home/               # Página principal con información
│   ├── Login/              # SERIE I - Login
│   └── Chat/               # SERIE II y III - Chat con mensajes
├── services/
│   ├── authService.js      # Servicio de autenticación
│   └── mensajesService.js  # Servicio de mensajes
├── config/
│   └── api.js              # Configuración de Axios
├── App.jsx                 # Componente principal con rutas
└── main.jsx                # Punto de entrada
\`\`\`

## 🔐 Credenciales de Prueba

**Usuario:** oaranam3 (o cualquier usuario antes del @miumg.edu.gt)  
**Contraseña:** 123456a

## 🎨 Funcionalidades por Serie

### SERIE I: Login
1. Formulario de inicio de sesión
2. Validación de campos
3. Petición POST a API de autenticación
4. Almacenamiento de token JWT
5. Redirección automática al chat
6. Manejo de errores

### SERIE II: Envío de Mensajes
1. Formulario para escribir mensajes
2. Token Bearer en cabecera Authorization
3. Envío de mensaje con estructura:
   - \`Cod_Sala: 0\`
   - \`Login_Emisor: [username]\`
   - \`Contenido: [mensaje]\`
4. Validación de autenticación
5. Retroalimentación visual
6. Recarga automática de mensajes

### SERIE III: Visualización de Mensajes
1. Consulta de mensajes desde SQL Server vía API propia
2. Visualización cronológica (más recientes al final)
3. Actualización automática cada 5 segundos
4. Diseño tipo chat con burbujas
5. Diferenciación de mensajes propios vs otros
6. Scroll automático al último mensaje
7. Información de fecha y hora

## 🌐 Deploy

### Vercel

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Producción
vercel --prod
\`\`\`

### Netlify

\`\`\`bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
\`\`\`

## 🗄️ Base de Datos

**Conexión:** (Realizada a través de API backend)
- Server: svr-sql-ctezo.southcentralus.cloudapp.azure.com
- Usuario: usr_DesaWebDevUMG
- Password: !ngGuast@360
- BD: db_DesaWebDevUMG
- Tabla: [dbo].[Chat_Mensaje]

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite 5
- **Routing:** React Router 6
- **HTTP Client:** Axios
- **Styling:** CSS3 vanilla con gradientes y animaciones
- **Autenticación:** JWT Bearer Token
- **APIs:** REST APIs (Azure Web Services)
- **Base de Datos:** SQL Server

## 📱 Responsive Design

La aplicación es completamente responsiva y funciona en:
- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

## ✨ Características Adicionales

- Actualización automática de mensajes cada 5 segundos
- Scroll automático al último mensaje
- Animaciones suaves en transiciones
- Feedback visual en todas las acciones
- Manejo de estados de carga
- Manejo robusto de errores
- Diseño moderno con gradientes
- Información del estudiante visible
- Badges de estado para cada serie

## 📝 Notas de Implementación

### Seguridad
- Token JWT almacenado en localStorage
- Rutas protegidas con ProtectedRoute
- Validación de autenticación en cada petición
- Headers Authorization en todas las peticiones protegidas

### Performance
- Lazy loading de componentes
- Actualización eficiente de mensajes
- Scroll automático optimizado
- Limpieza de intervalos al desmontar componentes

### UX/UI
- Retroalimentación inmediata de acciones
- Estados de carga visibles
- Mensajes de error claros
- Diseño intuitivo y moderno
- Información contextual en cada sección

## 🎯 Cumplimiento de Requisitos

✅ **SERIE I:** Interfaz de login funcional con autenticación JWT  
✅ **SERIE II:** Formulario de envío con token Bearer  
✅ **SERIE III:** Visualización cronológica desde base de datos  
✅ **Deploy:** Aplicación publicada y funcionando en línea  
✅ **Full Stack:** Integración completa front + back + BD  

## 📄 Licencia

Proyecto académico - Universidad Mariano Gálvez

---

**Desarrollado por:** Nataly Michell Cux Recinos  
**Carné:** 1890-22-18009  
**Curso:** Desarrollo Web  
**Fecha:** Noviembre 2025

## 📦 Instalación

```bash
npm install
```

## 🔧 Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
copy .env.example .env
```

2. Edita `.env` y configura la URL de tu API:
```env
VITE_API_URL=https://tu-api.azurewebsites.net
```

## 🏃‍♂️ Ejecución

### Modo desarrollo
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`

### Modo producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── Navbar/         # Barra de navegación
├── pages/              # Páginas de la aplicación
│   ├── Home/          # Página de inicio
│   ├── Items/         # CRUD de items
│   └── Weather/       # Pronóstico del clima
├── services/          # Servicios para API
│   ├── itemsService.js
│   └── weatherService.js
├── config/            # Configuración
│   └── api.js         # Configuración de Axios
├── App.jsx            # Componente principal
└── main.jsx           # Punto de entrada
```

## 🔌 API Endpoints

La aplicación consume los siguientes endpoints:

### Items
- `GET /api/Items` - Obtener todos los items
- `GET /api/Items/{id}` - Obtener un item por ID
- `POST /api/Items` - Crear un nuevo item
- `PUT /api/Items/{id}` - Actualizar un item
- `DELETE /api/Items/{id}` - Eliminar un item

### Weather Forecast
- `GET /WeatherForecast` - Obtener pronóstico del clima

## 🎨 Personalización

### Actualizar modelo de datos

Cuando recibas la base de datos final, actualiza:

1. **Servicios** (`src/services/itemsService.js`):
   - Ajusta los endpoints según tu API

2. **Componentes** (`src/pages/Items/Items.jsx`):
   - Actualiza `formData` con los campos de tu modelo
   - Añade campos en el formulario HTML
   - Muestra los campos correctos en las tarjetas

3. **Variables de entorno** (`.env`):
   - Actualiza `VITE_API_URL` con tu URL de producción

## 🌐 Deploy

### Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Para producción:
```bash
vercel --prod
```

### Netlify

1. Build:
```bash
npm run build
```

2. Deploy la carpeta `dist/`:
```bash
netlify deploy --prod --dir=dist
```

O conecta tu repositorio en [netlify.com](https://netlify.com)

### Configuración de variables de entorno

No olvides configurar `VITE_API_URL` en tu plataforma de deploy:

**Vercel:**
```bash
vercel env add VITE_API_URL
```

**Netlify:**
Site settings → Environment variables

## 📝 Notas para el examen

- ✅ Frontend funcional con React
- ✅ Consumo completo de API
- ✅ CRUD de Items implementado
- ✅ Visualización de Weather Forecast
- ✅ Configuración lista para deploy
- 🔄 **Pendiente:** Ajustar según base de datos final

## 🛠️ Tecnologías

- React 18
- Vite 5
- React Router 6
- Axios
- CSS3

## 📄 Licencia

Proyecto académico - Examen Final
