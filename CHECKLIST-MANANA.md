# 📝 Checklist para mañana - Ajustes según Base de Datos

## 1. Backend (API)
- [ ] Recibir esquema de la base de datos del catedrático
- [ ] Actualizar modelos/entidades en el backend según el esquema
- [ ] Ajustar controllers para los nuevos campos
- [ ] Actualizar DbContext si usas Entity Framework
- [ ] Probar endpoints con Swagger
- [ ] Verificar que la API funcione con la nueva BD

## 2. Frontend

### Archivos a modificar:

#### A. Servicios (`src/services/itemsService.js`)
```javascript
// Ejemplo: Si tu tabla se llama "Productos" en lugar de "Items"
// Cambiar:
getAllItems: async () => {
  const response = await api.get('/api/Products'); // <-- Cambiar endpoint
  return response.data;
}
```

#### B. Componente Items (`src/pages/Items/Items.jsx`)

**Líneas 13-16** - Actualizar formData:
```javascript
const [formData, setFormData] = useState({
  // REEMPLAZAR con los campos reales de tu tabla
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  // ... etc
});
```

**Líneas 82-93** - Actualizar campos del formulario:
```html
<!-- Añadir inputs para cada campo de tu modelo -->
<div className="form-group">
  <label htmlFor="price">Precio:</label>
  <input
    type="number"
    id="price"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
  />
</div>
<!-- Repetir para cada campo -->
```

**Líneas 118-121** - Actualizar visualización en tarjetas:
```html
<h3>{item.name}</h3>
<p>{item.description}</p>
<p>Precio: ${item.price}</p>
<p>Stock: {item.stock}</p>
<!-- Mostrar todos los campos relevantes -->
```

#### C. Variables de entorno (`.env`)
```env
# Verificar que apunte a tu API en producción
VITE_API_URL=https://api-examen-nataly18009.azurewebsites.net
```

## 3. Testing
- [ ] Probar GET - Listar todos los items
- [ ] Probar POST - Crear nuevo item
- [ ] Probar GET by ID - Ver detalle
- [ ] Probar PUT - Editar item existente
- [ ] Probar DELETE - Eliminar item
- [ ] Verificar que Weather Forecast funcione

## 4. Deploy
- [ ] Push cambios a GitHub
- [ ] Rebuild en Vercel/Netlify
- [ ] Verificar que variables de entorno estén configuradas
- [ ] Probar la aplicación en producción
- [ ] Verificar CORS si hay problemas de conexión

## 5. Ejemplo rápido de ajuste

Si tu tabla es "Productos" con campos: id, nombre, precio, categoria, stock

### itemsService.js
```javascript
const productsService = {
  getAllProducts: async () => {
    const response = await api.get('/api/Products');
    return response.data;
  },
  // ... actualizar todos los métodos
};
```

### Items.jsx
```javascript
const [formData, setFormData] = useState({
  nombre: '',
  precio: 0,
  categoria: '',
  stock: 0
});

// En el formulario:
<input name="nombre" value={formData.nombre} ... />
<input name="precio" type="number" value={formData.precio} ... />
<input name="categoria" value={formData.categoria} ... />
<input name="stock" type="number" value={formData.stock} ... />

// En la visualización:
<h3>{item.nombre}</h3>
<p>Precio: ${item.precio}</p>
<p>Categoría: {item.categoria}</p>
<p>Stock: {item.stock}</p>
```

## 📌 Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Deploy a Vercel
vercel --prod

# Deploy a Netlify
netlify deploy --prod --dir=dist
```

## ⚠️ Puntos críticos

1. **Nombres de campos:** Deben coincidir exactamente con tu API (case-sensitive)
2. **Tipos de datos:** Asegúrate de enviar el tipo correcto (string, number, boolean)
3. **CORS:** Verifica que tu API permita peticiones desde el dominio del frontend
4. **Variables de entorno:** En producción, configura VITE_API_URL en tu plataforma
5. **Endpoints:** Actualiza todas las URLs según tu API real

## 🎯 Prioridad

1. **Alta:** Actualizar modelo de datos y servicios
2. **Alta:** Ajustar formularios y visualización
3. **Media:** Mejorar estilos si hay tiempo
4. **Media:** Agregar validaciones adicionales
5. **Baja:** Features extras

¡Buena suerte mañana! 🚀
