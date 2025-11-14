# 🚀 Inicio Rápido

## Para Desarrolladores del Widget

### 1. Instalación

```bash
npm install
```

### 2. Desarrollo

```bash
npm run dev
# Abre http://localhost:5173
```

### 3. Build para Producción

```bash
npm run build
# Genera dist/widget.js
```

### 4. Probar Localmente

Abre `test.html` en tu navegador después de hacer el build.

---

## Para Integrar en tu Web .NET

### Opción 1: Integración Simple

1. **Descarga** el archivo `dist/widget.js` compilado

2. **Copia** a tu proyecto .NET:

   ```
   wwwroot/js/widget.js
   ```

3. **Añade** este código antes de `</body>` en tu layout:

   ```html
   <script
     src="~/js/widget.js"
     data-company="Tu Empresa"
     data-color="#0078ff"
     data-api-url="/api/chat"
   ></script>
   ```

4. **Crea** un API Controller (ver `examples/dotnet/ChatController.cs`)

5. **¡Listo!** El widget aparecerá en tu página

### Opción 2: Configuración Avanzada

```html
<script src="~/js/widget.js"></script>
<script>
  window.IAChatWidget.init({
    company: "Mi Empresa S.L.",
    color: "#FF6B35",
    apiUrl: "/api/chat",
    position: "bottom-left", // bottom-right, top-left, top-right
    theme: "dark", // light, dark
  });
</script>
```

---

## Estructura del Formato API

Tu endpoint debe aceptar POST a `/api/chat`:

**Envía:**

```json
{
  "company": "string",
  "message": "string",
  "timestamp": "string"
}
```

**Recibe:**

```json
{
    "reply": "string",
    "offers": [
        {
            "title": "string",
            "description": "string",
            "price": "string (opcional)",
            "url": "string (opcional)"
        }
    ],
    "success": boolean
}
```

---

## 📚 Documentación Completa

- **Desarrollo del Widget**: Ver `README.md`
- **Despliegue en .NET**: Ver `DEPLOYMENT.md`
- **Ejemplos de Código**: Ver carpeta `examples/`
- **Integración HTML**: Ver `examples/integration-example.html`

---

## ⚡ Configuración de CORS (Importante!)

En tu `Program.cs` de .NET:

```csharp
// Agregar servicios
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWidget", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configurar pipeline
var app = builder.Build();
app.UseCors("AllowWidget");
app.MapControllers();
```

---

## 🐛 Problemas Comunes

### El widget no aparece

- ✅ Verifica que `widget.js` se carga correctamente
- ✅ Abre la consola del navegador para ver errores
- ✅ Asegúrate de que el script está antes de `</body>`

### Error de CORS

- ✅ Configura CORS en tu backend .NET (ver arriba)
- ✅ Asegúrate de que `UseCors()` está en el pipeline

### La API no responde

- ✅ Verifica que la URL del API es correcta
- ✅ Prueba el endpoint con Postman primero
- ✅ Revisa los logs del servidor

---

## 💬 ¿Necesitas Ayuda?

- Lee la documentación completa en `DEPLOYMENT.md`
- Revisa los ejemplos en `examples/`
- Abre un issue en el repositorio

---

**¡Happy Coding! 🎉**
