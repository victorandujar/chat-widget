# Guía de Despliegue del Widget

## ��� Despliegue en GitHub Pages

### Desplegar el Widget

```bash
# 1. Compilar
npm run build

# 2. Desplegar a GitHub Pages
npm run deploy
```

Tu widget estará disponible en:

```
https://victorandujar.github.io/chat-widget/widget.js
```

### Actualizar URL si cambias el repositorio

En \`package.json\`, actualiza:

```json
{
  "homepage": "https://tu-usuario.github.io/tu-repo/"
}
```

---

## ��� Arquitectura de Integración

```
┌──────────────────────┐
│  Web del Cliente     │ ← Cualquier web (HTML, .NET, etc.)
│  (Frontend)          │   Embede el widget con <script>
└──────────┬───────────┘
           │
           │ <script src="https://...github.io/.../widget.js">
           │
           ↓
┌──────────────────────┐
│  Widget React        │ ← Desplegado en GitHub Pages
│  (GitHub Pages)      │   Solo archivos estáticos
└──────────┬───────────┘
           │
           │ POST /api/chat
           │
           ↓
┌──────────────────────┐
│  Tu API Backend      │ ← Procesa con IA/GPT
│  (.NET, Node, etc.)  │   Devuelve respuestas y ofertas
└──────────────────────┘
```

---

## ��� Integración en Cualquier Web

### Opción 1: Desde GitHub Pages (Recomendado)

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- Tu contenido -->

    <script
      src="https://victorandujar.github.io/chat-widget/widget.js"
      data-company="Mi Empresa"
      data-color="#0078ff"
      data-api-url="https://tu-api.com/api/chat"
    ></script>
  </body>
</html>
```

### Opción 2: Auto-hospedado

1. Copia \`dist/widget.js\` a tu servidor
2. Úsalo localmente:

```html
<script
  src="/js/widget.js"
  data-company="Mi Empresa"
  data-api-url="/api/chat"
></script>
```

---

## ��� Configurar tu API Backend

### El widget necesita un endpoint POST que:

**Reciba:**

```json
{
  "company": "string",
  "message": "string",
  "timestamp": "ISO 8601 string"
}
```

**Devuelva:**

```json
{
  "reply": "Respuesta del asistente",
  "offers": [
    {
      "title": "Producto X",
      "description": "Descripción...",
      "price": "99€",
      "url": "https://..."
    }
  ],
  "success": true
}
```

## ��� Configurar CORS

**Importante:** Tu API debe permitir peticiones desde:

- El dominio donde está el widget (GitHub Pages)
- El dominio de tu web

### Ejemplo .NET (Program.cs):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWidget", policy =>
    {
        policy.WithOrigins(
            "https://victorandujar.github.io",
            "https://tu-web.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

app.UseCors("AllowWidget");
```

---

## ��� Testing Local

1. **Probar el widget localmente:**

   ```bash
   npm run build
   # Abre test.html en tu navegador
   ```

2. **Probar con tu API:**
   - Configura \`data-api-url\` apuntando a tu API local
   - Asegúrate de que CORS permite \`http://localhost\`

---

## ��� Workflow Completo

1. **Desarrollas el widget:**

   ```bash
   npm run dev
   ```

2. **Compilas:**

   ```bash
   npm run build
   ```

3. **Despliegas a GitHub Pages:**

   ```bash
   npm run deploy
   ```

4. **Integras en tu web:**

   ```html
   <script
     src="https://victorandujar.github.io/chat-widget/widget.js"
     data-api-url="https://tu-api.com/api/chat"
   ></script>
   ```

5. **Tu API procesa las consultas y devuelve ofertas**

---

## ��� Monitoreo y Analytics

Puedes agregar tracking de eventos:

```javascript
// Escuchar mensajes enviados
document.addEventListener("ia-widget-message-sent", (e) => {
  console.log("Usuario preguntó:", e.detail);
  // Enviar a Google Analytics, Mixpanel, etc.
});
```

---

## ��� Troubleshooting

### El widget no aparece

- ✅ Verifica que la URL del script es correcta
- ✅ Abre DevTools > Console para ver errores
- ✅ Comprueba que el archivo se descarga correctamente

### Error de CORS

- ✅ Configura CORS en tu API backend
- ✅ Verifica que los orígenes incluyen GitHub Pages y tu web
- ✅ Asegúrate de que \`UseCors()\` está antes de \`MapControllers()\`

### La API no responde

- ✅ Verifica que la URL del API es correcta y accesible
- ✅ Prueba el endpoint con curl/Postman primero
- ✅ Revisa los logs del servidor backend
- ✅ Comprueba que el formato de request/response es correcto

---

**¿Necesitas ayuda?** Revisa \`QUICKSTART.md\` o los ejemplos en \`examples/\`
