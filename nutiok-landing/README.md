# NUTIOK — Landing page

Sitio estático de presentación del aplicativo móvil **NUTIOK** (proyecto de grado, Universidad de Cundinamarca, Seccional Ubaté). HTML5, CSS modular y JavaScript sin bundler.

## Requisitos

- Navegador moderno.
- (Opcional) Clave de [Google AI Studio](https://aistudio.google.com/app/apikey) para el chatbot Gemini.
- (Opcional) Formulario [Formspree](https://formspree.io) para el envío de contacto.

## Puesta en marcha local

1. Clona o copia la carpeta `nutiok-landing`.
2. Arranca el servidor incluido (recomendado para evitar restricciones CORS con Gemini y Formspree):

```bash
cd nutiok-landing
python serve.py
```

Por defecto abre el navegador en `http://127.0.0.1:8080/`. Otro puerto: `python serve.py --port 3000`. Sin abrir el navegador: `python serve.py --no-open`.

Alternativa manual:

```bash
python -m http.server 8080
```

## Configuración

### Variables de entorno (referencia)

El archivo [`.env.example`](.env.example) documenta nombres alineados al plan del proyecto. En este sitio **sin paso de build**, los valores sensibles no se leen automáticamente desde `.env`; sirven como guía si más adelante usas un proxy serverless.

### `config.private.js` (secretos locales, no versionado)

1. Crea el archivo `assets/js/config.private.js` (está en [`.gitignore`](.gitignore)).
2. En `index.html`, justo después de `config.example.js`, añade:

```html
<script src="assets/js/config.private.js"></script>
```

3. Ajusta tus claves y endpoints en `config.private.js`:

```javascript
window.NUTIOK_CONFIG = window.NUTIOK_CONFIG || {};
Object.assign(window.NUTIOK_CONFIG, {
  geminiApiKey: "TU_API_KEY",
  formspreeEndpoint: "https://formspree.io/f/tu_form_id",
});
```

Los valores por defecto (modelo, URL base) vienen de [`assets/js/config.example.js`](assets/js/config.example.js), cargado en `index.html`.

**Seguridad:** exponer `geminiApiKey` en el navegador es aceptable solo para prototipos; en producción usa un **proxy backend** (Netlify/Vercel Function, Cloud Function, etc.) y restricciones por dominio en Google Cloud.

### Formulario de contacto

Registra un formulario en Formspree y pega la URL en `formspreeEndpoint`. El cliente envía JSON con `name`, `email`, `subject`, `message` y `_replyto`.

## SEO

Sustituye `https://TU-DOMINIO` en [`robots.txt`](robots.txt) y [`sitemap.xml`](sitemap.xml) y actualiza `og:image` en `index.html` con la **URL absoluta** de tu despliegue para mejores previews en redes.

## Calidad (Lighthouse)

Tras desplegar en HTTPS, ejecuta Lighthouse en Chrome DevTools y revisa **Rendimiento**, **Accesibilidad** y **SEO**. Ajusta imágenes (exporta `og-nutiok` a PNG 1200×630 si las redes no aceptan SVG) y la URL absoluta de `og:image`.

## Despliegue

- **GitHub Pages:** publica el contenido de `nutiok-landing` en la raíz del branch `gh-pages` o carpeta `/docs`; documenta la URL pública aquí cuando exista.
- **Netlify / Vercel:** arrastra la carpeta o conecta el repositorio; configura variables de entorno solo si añades funciones serverless.

## Estructura

```
nutiok-landing/
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/   (main, navbar, hero, features, how-it-works, contact, chatbot)
│   ├── js/    (config.example.js, navbar, scroll, contact, chatbot, main)
│   └── img/
└── README.md
```

## Autores

Wilson Nicolás Bustos Alonso · Carlos Alfonso Delgado Salazar · 2026-1
