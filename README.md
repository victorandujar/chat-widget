# Widget de Chat IA para Búsqueda de Ofertas

Widget embebible de React + TypeScript + Vite que actúa como un RAG para búsqueda de ofertas.

## ���️ ¿Cómo Funciona?

```
1. Widget (Este Repo)
   ↓ npm run deploy
   Desplegado en GitHub Pages

2. Tu Web .NET (o cualquier web)
   ↓ <script src="...github.io/.../widget.js">
   Embede el widget con 1 línea

3. Tu API Backend (.NET, Node, Python...)
   ↓ Procesa consultas con IA/GPT
   Devuelve ofertas al widget
```

---

## ⚡ Uso Rápido

### Desplegar Widget (Solo 1 vez)

\`\`\`bash
npm install
npm run build
npm run deploy # Sube a GitHub Pages
\`\`\`

### Integrar en tu Web

\`\`\`html

<!-- Añade esto en tu web .NET (o cualquier web) -->

### Integrar en tu Web

#### Opción 1: Next.js (App Router) - Recomendado

```tsx
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <Script
          src="https://victorandujar.github.io/chat-widget/widget.js"
          strategy="afterInteractive"
          data-company="Mi Empresa"
          data-color="#0078ff"
          data-api-url="https://tu-api.com/api/chat"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Opción 2: HTML estático o cualquier web

```html
<!-- Añade esto en tu web .NET, PHP, o cualquier HTML -->
<script
  src="https://victorandujar.github.io/chat-widget/widget.js"
  data-company="Mi Empresa"
  data-color="#0078ff"
  data-api-url="https://tu-api.com/api/chat"
></script>
```

**Importante:** El widget ahora usa `position: fixed` para no desplazar el contenido de tu página.

\`\`\`

### Crear tu API Backend

Ver ejemplos en \`examples/dotnet/\` para crear el endpoint que procesa con IA.

---

## ��� Configuración del Widget

\`\`\`html

```html
<script
  src="https://victorandujar.github.io/chat-widget/widget.js"
  data-company="Nombre de tu empresa"
  data-color="#FF6B35"
  data-api-url="https://tu-api.com/api/chat"
  data-position="bottom-left"
  data-theme="dark"
></script>
```

**Parámetros:**

- `company`: Nombre de tu empresa
- `color`: **Color principal del widget (#hex)** - Se aplica al botón, cabecera y burbujas del usuario
- `api-url`: **URL absoluta de tu API backend** (ej: https://tu-api.com/api/chat) - Debe incluir https:// y ser accesible desde cualquier dominio
- `position`: bottom-right (default), bottom-left, top-right, top-left
- `theme`: light (default), dark

**Importante:** Asegúrate de que tu API backend tenga CORS configurado para permitir requests desde cualquier origen (*), ya que el widget se carga desde GitHub Pages.

\`\`\`

**Parámetros:**

- \`company\`: Nombre de tu empresa
- \`color\`: Color principal (#hex)
- \`api-url\`: URL de tu API backend
- \`position\`: bottom-right, bottom-left, top-right, top-left
- \`theme\`: light, dark

---

## �� Formato de la API

Tu backend debe aceptar POST en \`/api/chat\`:

**Request:**
\`\`\`json
{
"company": "string",
"message": "string",
"timestamp": "ISO 8601"
}
\`\`\`

**Response:**
\`\`\`json
{
"reply": "Respuesta del asistente",
"offers": [
{
"title": "Producto X",
"description": "Descripción",
"price": "99€",
"url": "https://..."
}
],
"success": true
}
\`\`\`

---

## ���️ Desarrollo

\`\`\`bash
npm install # Instalar
npm run dev # Desarrollo local
npm run build # Compilar
npm run deploy # Desplegar a GitHub Pages
\`\`\`

Abre \`test.html\` para probar localmente después de compilar.

---

## ��� Documentación

- **QUICKSTART.md** - Inicio rápido paso a paso
- **DEPLOYMENT.md** - Guía completa de despliegue

---

## ��� Enlaces Útiles

- **Widget desplegado**: https://victorandujar.github.io/chat-widget/widget.js
- **Repo**: https://github.com/victorandujar/chat-widget
- **Ejemplos Backend**: Ver carpeta \`examples/dotnet/\`

---

**¡Listo para usar! ���** Despliega el widget y añade 1 línea de código en tu web.
