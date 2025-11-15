# Frontend - Examen Final

Aplicación frontend en React + Vite para consumir API REST con SQL Server.

## 🚀 Características

- ✅ React 18 con Vite
- ✅ React Router para navegación
- ✅ Axios para peticiones HTTP
- ✅ CRUD completo de Items
- ✅ Visualización de pronóstico del clima
- ✅ Diseño responsivo
- ✅ Listo para deploy

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
