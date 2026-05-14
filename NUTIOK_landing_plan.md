# 🥗 NUTIOK — Plan de Desarrollo: Landing Page

> **Proyecto de grado** · Ingeniería de Sistemas y Computación · Universidad de Cundinamarca, Seccional Ubaté  
> Autores: Wilson Nicolás Bustos Alonso · Carlos Alfonso Delgado Salazar · 2026-1

---

## 1. Visión General

La landing page de NUTIOK es el punto de entrada digital del aplicativo móvil. Su propósito es comunicar de forma clara y atractiva el problema que resuelve, sus funcionalidades y facilitar el contacto con el equipo, incluyendo un chatbot inteligente que responde preguntas sobre la aplicación.

**Paleta de colores oficiales NUTIOK**

| Rol           | Color        | Hex       |
|---------------|--------------|-----------|
| Principal     | Verde NUTIOK | `#4CAF50` |
| Acento        | Naranja      | `#FF7043` |
| Fondo         | Blanco puro  | `#FFFFFF` |
| Texto primario| Gris oscuro  | `#1E1E1E` |
| Texto suave   | Gris medio   | `#6B6B6B` |
| Superficie     | Verde suave  | `#F1F8F1` |

**Tipografía sugerida**

- Títulos: `Nunito` (Google Fonts) — redondeada, amigable, legible
- Cuerpo: `DM Sans` (Google Fonts) — moderna, limpia, accesible

---

## 2. Estructura de Archivos del Proyecto

```
nutiok-landing/
│
├── index.html                  # Página principal
├── .env.example                # Variables de entorno de ejemplo
├── .gitignore                  # Ignorar .env real
│
├── assets/
│   ├── css/
│   │   ├── main.css            # Estilos globales y variables CSS
│   │   ├── navbar.css          # Estilos del menú lateral
│   │   ├── hero.css            # Sección Inicio / Hero
│   │   ├── features.css        # Sección Funcionalidades
│   │   ├── how-it-works.css    # Sección Cómo Funciona
│   │   ├── contact.css         # Sección Contáctanos
│   │   └── chatbot.css         # Módulo Chatbot
│   │
│   ├── js/
│   │   ├── navbar.js           # Lógica de navegación lateral
│   │   ├── scroll.js           # Smooth scroll y animaciones en scroll
│   │   ├── chatbot.js          # Lógica del chatbot con Gemini API
│   │   └── main.js             # Inicialización general
│   │
│   └── img/
│       ├── logo-nutiok.svg     # Logotipo oficial
│       ├── hero-mockup.png     # Mockup del app en el hero
│       ├── icon-*.svg          # Íconos de funcionalidades
│       └── og-nutiok.png       # Open Graph para redes sociales
│
└── README.md                   # Instrucciones de instalación y uso
```

---

## 3. Archivo `.env.example`

```env
# -----------------------------------------------
# NUTIOK Landing Page — Variables de Entorno
# Copiar este archivo como .env y completar valores
# NUNCA subir el archivo .env real al repositorio
# -----------------------------------------------

# API Key de Google AI Studio (Gemini)
# Obtener en: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=TU_API_KEY_AQUI

# Modelo Gemini a usar
GEMINI_MODEL=gemini-flash-latest

# Endpoint base de Gemini
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/models
```

> **Nota de seguridad:** En producción, la API key NO debe exponerse en frontend puro. Se recomienda implementar un pequeño proxy backend (Cloud Function, Vercel Serverless, etc.) que reciba la solicitud del cliente y llame a Gemini con la clave almacenada como variable de entorno del servidor. Para prototipo/demo académico, se puede usar directamente desde JS con la restricción de dominio activada en Google Cloud Console.

---

## 4. Arquitectura Modular

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                          │
│  ┌──────────┐  ┌──────────────────────────────────────┐ │
│  │  Navbar  │  │           Contenido Principal         │ │
│  │ (izq.)   │  │  ┌────────┐ ┌──────────┐ ┌────────┐  │ │
│  │          │  │  │  Hero  │ │Features  │ │How It  │  │ │
│  │ Inicio   │  │  │Section │ │Section   │ │Works   │  │ │
│  │ Funcio-  │  │  └────────┘ └──────────┘ └────────┘  │ │
│  │ nalidades│  │  ┌────────┐ ┌──────────┐             │ │
│  │ Cómo     │  │  │Contact │ │ Chatbot  │             │ │
│  │ Funciona │  │  │Section │ │ Widget   │             │ │
│  │ Contacto │  │  └────────┘ └──────────┘             │ │
│  │ Chatbot  │  └──────────────────────────────────────┘ │
│  └──────────┘                                           │
└─────────────────────────────────────────────────────────┘
         │                        │
    navbar.js                chatbot.js
    scroll.js              (Gemini API)
    main.js
```

---

## 5. Secciones de la Landing Page

### 5.1 Menú de Navegación (`<nav>`)

- **Posición:** Lateral izquierda, fija (`position: fixed; left: 0`)
- **Ancho:** `240px` en desktop; colapsable en mobile (hamburger icon)
- **Elementos:**

```
[Logo NUTIOK]
─────────────
🏠 Inicio
⚙️ Funcionalidades
📋 Cómo Funciona
📬 Contáctanos
🤖 Chatbot
```

- **Comportamiento:**
  - El ítem activo se resalta con color verde y borde izquierdo naranja
  - Scroll suave al hacer clic en cada ítem (`scroll-behavior: smooth`)
  - En mobile (`< 768px`): menú tipo drawer que se abre con botón hamburguesa

---

### 5.2 Sección Inicio / Hero (`#inicio`)

**Objetivo:** Comunicar en segundos qué es NUTIOK, el problema y la propuesta de valor.

**Contenido:**

```
[Headline principal]
"Come bien, aunque el tiempo no lo permita."

[Subheadline]
NUTIOK es el compañero inteligente que ayuda a los estudiantes
universitarios a mantener una alimentación saludable dentro
de sus exigentes jornadas académicas.

[Problema destacado — tarjeta visual]
⚠️ El 70% de los universitarios omite al menos una comida
    principal por día debido a sus horarios académicos.

[Propuesta de valor — 3 íconos]
🔔 Recordatorios inteligentes  |  🥗 Recetas saludables  |  📍 Restaurantes cercanos

[CTA — Botón principal]
[Descargar NUTIOK] → verde
[Conocer más]      → outline naranja

[Mockup del app — imagen derecha o centrada en mobile]
```

**Notas de diseño:**
- Fondo blanco con wave decorativo verde suave en la parte inferior
- Animación de entrada: fade-in + slide-up con `animation-delay` escalonado
- El mockup del app puede tener sombra suave y leve efecto float (CSS keyframes)

---

### 5.3 Sección Funcionalidades (`#funcionalidades`)

**Objetivo:** Mostrar las 5 funcionalidades clave del app con íconos y descripción.

**Layout:** Grid de tarjetas 3-2 (desktop) / 1 columna (mobile)

**Tarjetas de funcionalidades:**

| # | Ícono | Título | Descripción |
|---|-------|--------|-------------|
| 1 | 🔔 | **Recordatorios Push Personalizados** | Notificaciones adaptadas al horario académico del estudiante para que nunca olvide una comida principal. |
| 2 | 📖 | **Recetario Saludable** | Colección de recetas nutritivas, fáciles de preparar y económicas, pensadas para la vida universitaria. |
| 3 | 📍 | **Mapa de Restaurantes Cercanos** | Localiza opciones de alimentación saludable y económica alrededor de la universidad mediante Google Maps API. |
| 4 | 📊 | **Perfil Nutricional con IMC** | Calcula automáticamente el Índice de Masa Corporal y genera un perfil nutricional personalizado para cada usuario. |
| 5 | 📝 | **Notas de Alimentación** | Registro diario de hábitos alimenticios para seguimiento personal y toma de conciencia nutricional. |

**Notas de diseño:**
- Tarjetas con borde superior de `4px solid #4CAF50`
- Hover: leve elevación con `box-shadow` y acento naranja en el ícono
- Fondo de sección: `#F1F8F1` (verde muy suave) para diferenciar del hero

---

### 5.4 Sección Cómo Funciona (`#como-funciona`)

**Objetivo:** Explicar el flujo del usuario en 3 pasos simples.

**Layout:** Timeline horizontal (desktop) / vertical (mobile)

**Pasos:**

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [ 1 ]──────────────[ 2 ]──────────────[ 3 ]                │
│                                                              │
│  📲 Regístrate         🗓️ Configura tu     🔔 Recibe y        │
│  y crea tu            horario académico   actúa              │
│  perfil               y preferencias                        │
│  nutricional          alimenticias                           │
│                                                              │
│  Ingresa tus datos    Indica tus clases,  NUTIOK te          │
│  básicos: peso,       horarios y metas    recordará comer,   │
│  altura, edad y       nutricionales.      te sugerirá        │
│  objetivo de salud.                       recetas y          │
│                                           restaurantes       │
│                                           cercanos.          │
└──────────────────────────────────────────────────────────────┘
```

**Notas de diseño:**
- Línea conectora entre pasos: `border-top: 2px dashed #4CAF50`
- Números en círculo con fondo naranja (`#FF7043`) y texto blanco
- Animación: los pasos aparecen con `IntersectionObserver` al hacer scroll

---

### 5.5 Sección Contáctanos (`#contacto`)

**Objetivo:** Canal de comunicación para interesados, docentes o evaluadores.

**Contenido:**

```
[Título]
¿Tienes preguntas sobre NUTIOK?

[Subtítulo]
Escríbenos y con gusto te respondemos.

[Formulario]
┌─────────────────────────────────┐
│ Nombre completo                 │
├─────────────────────────────────┤
│ Correo electrónico              │
├─────────────────────────────────┤
│ Asunto                          │
├─────────────────────────────────┤
│ Mensaje                         │
│                                 │
│                                 │
└─────────────────────────────────┘
         [Enviar mensaje →]

[Info adicional — lado derecho o debajo]
📧 nutiok@udec.edu.co (ejemplo)
🏛️ Universidad de Cundinamarca, Seccional Ubaté
👨‍💻 Wilson Bustos · Carlos Delgado
```

**Implementación del formulario:**
- Se puede integrar con [Formspree](https://formspree.io) (gratis, sin backend) o [EmailJS](https://www.emailjs.com)
- Validación client-side con JS vanilla (campos requeridos, formato de email)
- Feedback visual: spinner durante envío, mensaje de éxito/error

---

### 5.6 Módulo Chatbot (`#chatbot`)

**Objetivo:** Responder preguntas sobre NUTIOK usando la API de Gemini (Google AI Studio), con respuestas limitadas estrictamente al contexto del aplicativo.

---

#### 5.6.1 Base de Conocimiento del Chatbot

El sistema prompt que se enviará a Gemini en cada conversación:

```
Eres el asistente virtual de NUTIOK, una aplicación móvil para Android
desarrollada como proyecto de grado en la Universidad de Cundinamarca,
Seccional Ubaté, por Wilson Nicolás Bustos Alonso y Carlos Alfonso
Delgado Salazar (2026-1).

Tu único rol es responder preguntas sobre NUTIOK. Si te preguntan algo
que no está relacionado con NUTIOK, responde amablemente:
"Solo puedo responder preguntas relacionadas con NUTIOK. ¿Te puedo ayudar
con algo sobre la aplicación?"

---

CONTEXTO DE NUTIOK:

**¿Qué es NUTIOK?**
NUTIOK es una aplicación móvil para Android que ayuda a los estudiantes
universitarios a mejorar sus hábitos alimenticios durante las jornadas
académicas. Mitiga la omisión de comidas principales, que es un problema
frecuente por las largas horas de clase y la falta de planificación.

**Problema que resuelve:**
Los estudiantes universitarios frecuentemente omiten comidas o las
sustituyen por opciones poco nutritivas debido a sus horarios académicos
exigentes y la falta de planificación alimentaria.

**Funcionalidades principales:**
1. Recordatorios push personalizados según el horario académico del usuario.
2. Recetario saludable con recetas fáciles y económicas.
3. Mapa de restaurantes cercanos a la universidad (Google Maps API).
4. Perfil nutricional con cálculo automático de IMC (Índice de Masa Corporal).
5. Notas de alimentación para registro y seguimiento diario.

**Tecnologías utilizadas:**
- Frontend móvil: Flutter / Dart
- Backend y base de datos: Supabase (PostgreSQL + autenticación)
- Mapas: Google Maps API
- Control de versiones: GitHub
- Metodología: Híbrida XP + Scrum (4 sprints)

**Equipo:**
- Wilson Nicolás Bustos Alonso
- Carlos Alfonso Delgado Salazar
- Programa: Ingeniería de Sistemas y Computación
- Institución: Universidad de Cundinamarca, Seccional Ubaté

**Disponibilidad:**
NUTIOK está en desarrollo activo como proyecto de grado 2026-1.
Actualmente no está disponible en tiendas de aplicaciones públicas.

---

Responde siempre en español, de forma clara, amigable y breve.
No inventes información que no esté en este contexto.
```

---

#### 5.6.2 Interfaz del Chatbot

**Diseño:** Widget flotante en esquina inferior derecha + sección dedicada `#chatbot`

**Estructura HTML del widget:**

```
┌─────────────────────────────────────┐
│ 🤖 Asistente NUTIOK            [×] │  ← Header verde
├─────────────────────────────────────┤
│                                     │
│  [Bot] ¡Hola! Soy el asistente     │
│  de NUTIOK. ¿En qué te puedo       │
│  ayudar hoy?                        │
│                                     │
│              [User] ¿Qué es NUTIOK? │
│                                     │
│  [Bot] NUTIOK es una aplicación     │
│  móvil para Android que...          │
│                                     │
├─────────────────────────────────────┤
│ [Escribe tu pregunta...]   [Enviar] │  ← Input + botón naranja
└─────────────────────────────────────┘
```

- **Botón flotante (FAB):** Ícono 🤖 en verde, fijo abajo-derecha, abre/cierra el widget
- **Indicador de escritura:** Tres puntos animados mientras Gemini responde
- **Scroll automático:** El chat hace scroll al último mensaje automáticamente

---

#### 5.6.3 Lógica de Llamada a Gemini API

**Referencia del endpoint:**

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: TU_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          { "text": "Pregunta del usuario aquí" }
        ]
      }
    ]
  }'
```

**Flujo de la función `sendMessage()` en `chatbot.js`:**

```
1. Capturar texto del input
2. Mostrar mensaje del usuario en el chat
3. Mostrar indicador de "escribiendo..."
4. Construir el payload:
   - system_instruction: BASE_DE_CONOCIMIENTO (constante)
   - contents: historial de mensajes + nuevo mensaje del usuario
5. POST a:
   https://generativelanguage.googleapis.com/v1beta/models/
   gemini-flash-latest:generateContent
   Headers: Content-Type: application/json
            X-goog-api-key: [desde variable de entorno o config]
6. Parsear response.candidates[0].content.parts[0].text
7. Mostrar respuesta del bot en el chat
8. Ocultar indicador de "escribiendo..."
9. Hacer scroll al último mensaje
10. En caso de error: mostrar mensaje de error amigable
```

**Estructura del payload completo:**

```json
{
  "system_instruction": {
    "parts": [{ "text": "[BASE DE CONOCIMIENTO NUTIOK]" }]
  },
  "contents": [
    { "role": "user", "parts": [{ "text": "¿Qué es NUTIOK?" }] },
    { "role": "model", "parts": [{ "text": "NUTIOK es..." }] },
    { "role": "user", "parts": [{ "text": "Nuevo mensaje..." }] }
  ],
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 512
  }
}
```

> `temperature: 0.3` garantiza respuestas precisas y conservadoras, evitando que el modelo "invente" información fuera del contexto de NUTIOK.

---

## 6. Variables CSS Globales (`main.css`)

```css
:root {
  /* Paleta NUTIOK */
  --color-primary:     #4CAF50;
  --color-primary-dark:#388E3C;
  --color-primary-soft:#F1F8F1;
  --color-accent:      #FF7043;
  --color-accent-dark: #E64A19;
  --color-bg:          #FFFFFF;
  --color-surface:     #F9FBF9;
  --color-text:        #1E1E1E;
  --color-text-soft:   #6B6B6B;
  --color-border:      #E0E0E0;

  /* Tipografía */
  --font-display: 'Nunito', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* Espaciado */
  --navbar-width: 240px;
  --section-padding: 80px 48px;

  /* Sombras */
  --shadow-card: 0 4px 20px rgba(0,0,0,0.07);
  --shadow-card-hover: 0 8px 32px rgba(76,175,80,0.15);

  /* Bordes */
  --radius-card: 16px;
  --radius-btn:  50px;

  /* Transiciones */
  --transition: all 0.25s ease;
}
```

---

## 7. Stack Tecnológico de la Landing

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Markup | HTML5 semántico | Accesibilidad y SEO |
| Estilos | CSS3 puro (sin frameworks) | Control total, sin dependencias |
| Interactividad | JavaScript ES6+ (vanilla) | Sin build tools, rápido de desplegar |
| IA / Chatbot | Google Gemini API (AI Studio) | Modelo gratuito, integración sencilla |
| Fuentes | Google Fonts (Nunito + DM Sans) | Tipografía de calidad sin costo |
| Íconos | Lucide Icons (SVG inline) | Ligeros, personalizables con CSS |
| Formulario | Formspree o EmailJS | Sin backend propio |
| Deploy | GitHub Pages / Netlify / Vercel | Hosting gratuito y CI/CD automático |

---

## 8. Guía de Responsividad

| Breakpoint | Ancho | Comportamiento |
|---|---|---|
| Mobile S | `< 480px` | Navbar como drawer. 1 columna. Chatbot ocupa pantalla completa. |
| Mobile L | `480–768px` | Igual a Mobile S con padding mayor. |
| Tablet | `768–1024px` | Navbar colapsable. Grid 2 columnas en Features. |
| Desktop | `> 1024px` | Navbar lateral fija `240px`. Grid 3-2 en Features. Layout completo. |

---

## 9. Buenas Prácticas Aplicadas

### Accesibilidad
- Atributos `aria-label` en todos los botones de ícono
- Contraste mínimo WCAG AA en texto sobre fondos
- Navegación por teclado funcional (`tabindex`, `focus-visible`)
- Texto alternativo en todas las imágenes (`alt`)

### Rendimiento
- Imágenes en formato `.webp` con fallback `.png`
- CSS y JS no bloqueantes (`defer` en scripts)
- Google Fonts con `display=swap`
- Lazy loading en imágenes (`loading="lazy"`)

### SEO y Metadatos
- `<title>NUTIOK — Nutrición para universitarios</title>`
- Meta description con la propuesta de valor
- Open Graph tags para compartir en redes sociales
- `robots.txt` y `sitemap.xml`

### Seguridad
- API Key nunca en el código fuente (`config.js` ignorado en `.gitignore`)
- Headers de seguridad recomendados en deploy (CSP, X-Frame-Options)
- Validación y sanitización de inputs del formulario y chatbot

---

## 10. Plan de Sprints de la Landing Page

### Sprint L-0 — Setup y estructura base *(1 semana)*
- [ ] Crear repositorio GitHub `nutiok-landing`
- [ ] Configurar estructura de archivos y carpetas
- [ ] Crear `.env.example` y `.gitignore`
- [ ] Implementar variables CSS globales y tipografía
- [ ] Montar esqueleto HTML con todas las secciones vacías
- [ ] Navbar lateral funcional con scroll suave

### Sprint L-1 — Hero y Funcionalidades *(1 semana)*
- [ ] Diseñar e implementar sección Hero con mockup
- [ ] Implementar sección Funcionalidades con grid de tarjetas
- [ ] Animaciones de entrada con `IntersectionObserver`
- [ ] Responsividad Mobile / Tablet completa

### Sprint L-2 — Cómo Funciona y Contacto *(1 semana)*
- [ ] Implementar sección Cómo Funciona con timeline
- [ ] Implementar sección Contáctanos con formulario
- [ ] Integrar Formspree o EmailJS
- [ ] Validación de formulario con JS

### Sprint L-3 — Chatbot y QA Final *(1 semana)*
- [ ] Implementar widget de chatbot (UI completa)
- [ ] Integrar Gemini API con base de conocimiento NUTIOK
- [ ] Pruebas de conversaciones fuera de contexto (rechazo correcto)
- [ ] Auditoría de accesibilidad (Lighthouse ≥ 90)
- [ ] Optimización de rendimiento y SEO
- [ ] Deploy en GitHub Pages o Netlify

---

## 11. Checklist de Entrega

- [ ] Todas las secciones implementadas y responsivas
- [ ] Chatbot responde solo sobre NUTIOK
- [ ] `.env.example` documentado y `.env` en `.gitignore`
- [ ] Lighthouse Performance ≥ 85 · Accessibility ≥ 90 · SEO ≥ 90
- [ ] Formulario de contacto funcional
- [ ] URL pública de deploy documentada en `README.md`
- [ ] Código comentado y modular
- [ ] README con instrucciones de instalación, configuración y despliegue

---

## 12. Recursos y Referencias

- [Google AI Studio — Gemini API](https://aistudio.google.com)
- [Gemini API Docs — generateContent](https://ai.google.dev/api/generate-content)
- [Formspree](https://formspree.io) — Formularios sin backend
- [Google Fonts — Nunito](https://fonts.google.com/specimen/Nunito)
- [Google Fonts — DM Sans](https://fonts.google.com/specimen/DM+Sans)
- [Lucide Icons](https://lucide.dev)
- [WCAG 2.1 — Guía de accesibilidad](https://www.w3.org/WAI/WCAG21/quickref/)
- [Netlify — Deploy gratuito](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

---

*Documento generado como parte del plan de desarrollo de NUTIOK · Universidad de Cundinamarca · 2026*
