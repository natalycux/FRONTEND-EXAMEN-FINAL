# 🔧 Solución al Error de la API Backend

## ❌ Error Actual
```json
{
    "error": "Error al obtener los mensajes",
    "detalle": "Unable to cast object of type 'System.Int64' to type 'System.Int32'."
}
```

## 🔍 Causa del Problema
El error ocurre porque en SQL Server el campo `ID` de la tabla es `BIGINT` (Int64), pero tu modelo en C# está definido como `int` (Int32).

## ✅ Soluciones (Elige una)

### Opción 1: Cambiar el modelo C# (Recomendado)

Abre tu archivo del modelo `ChatMensaje.cs` o similar y cambia:

**ANTES:**
```csharp
public class ChatMensaje
{
    public int Id { get; set; }  // ❌ Tipo incorrecto
    public int Cod_Sala { get; set; }
    public string Login_Emisor { get; set; }
    public string Contenido { get; set; }
    public DateTime Fecha_Creacion { get; set; }
}
```

**DESPUÉS:**
```csharp
public class ChatMensaje
{
    public long Id { get; set; }  // ✅ Cambiado a long (Int64)
    public int Cod_Sala { get; set; }
    public string Login_Emisor { get; set; }
    public string Contenido { get; set; }
    public DateTime Fecha_Creacion { get; set; }
}
```

### Opción 2: Cambiar la Base de Datos

Si prefieres mantener `int` en tu código, cambia la tabla en SQL Server:

```sql
-- Opción A: Si la tabla está vacía
DROP TABLE [dbo].[Chat_Mensaje];

CREATE TABLE [dbo].[Chat_Mensaje] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,  -- Cambio de BIGINT a INT
    [Cod_Sala] INT NOT NULL,
    [Login_Emisor] NVARCHAR(100) NOT NULL,
    [Contenido] NVARCHAR(MAX) NOT NULL,
    [Fecha_Creacion] DATETIME NOT NULL DEFAULT GETDATE()
);

-- Opción B: Si tiene datos, crea una nueva columna temporal
ALTER TABLE [dbo].[Chat_Mensaje] ADD [Id_Nuevo] INT IDENTITY(1,1);
-- Luego migra los datos...
```

### Opción 3: Usar Cast en la Consulta (No Recomendado)

En tu controlador, puedes hacer un cast explícito:

```csharp
public async Task<IActionResult> GetMensajes()
{
    try
    {
        var mensajes = await _context.ChatMensajes
            .Select(m => new ChatMensajeDto
            {
                Id = (int)m.Id,  // Cast explícito
                Cod_Sala = m.Cod_Sala,
                Login_Emisor = m.Login_Emisor,
                Contenido = m.Contenido,
                Fecha_Creacion = m.Fecha_Creacion
            })
            .OrderBy(m => m.Fecha_Creacion)
            .ToListAsync();

        return Ok(mensajes);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = "Error al obtener mensajes", detalle = ex.Message });
    }
}
```

## 📋 Pasos para Implementar (Opción 1 - Recomendada)

1. **Abre Visual Studio**

2. **Busca tu modelo** en la carpeta `Models` (probablemente `ChatMensaje.cs` o `Mensaje.cs`)

3. **Cambia el tipo de dato:**
   ```csharp
   public long Id { get; set; }  // En lugar de int
   ```

4. **Si usas Entity Framework, actualiza el DbContext:**
   - No necesitas cambiar nada más, EF se adapta automáticamente

5. **Recompila el proyecto:**
   - Build → Rebuild Solution
   - O presiona `Ctrl + Shift + B`

6. **Publica de nuevo en Azure:**
   - Click derecho en el proyecto → Publish
   - Espera a que se complete

7. **Prueba el endpoint:**
   ```bash
   GET https://api-examen-nataly18009.azurewebsites.net/api/Mensajes
   ```

## 🧪 Verificación

Después de aplicar la solución, deberías obtener:

```json
[
    {
        "id": 1,
        "cod_Sala": 0,
        "login_Emisor": "ncuxr",
        "contenido": "Hola mundo",
        "fecha_Creacion": "2025-11-15T10:30:00"
    },
    {
        "id": 2,
        "cod_Sala": 0,
        "login_Emisor": "ncuxr",
        "contenido": "Segundo mensaje",
        "fecha_Creacion": "2025-11-15T10:31:00"
    }
]
```

## 📝 Nota Importante

**El frontend ya está configurado para usar la API del examen (`https://backcvbgtmdesa.azurewebsites.net/api/Mensajes`)** que funciona correctamente. 

Si arreglas tu API, puedes cambiarla editando el archivo:
`src/services/mensajesService.js` línea 3

```javascript
const MENSAJES_API_URL = 'https://api-examen-nataly18009.azurewebsites.net/api';
```

---

**Tiempo estimado de solución:** 5-10 minutos
