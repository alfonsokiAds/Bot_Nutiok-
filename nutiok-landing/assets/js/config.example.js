/**
 * Configuración pública por defecto (sin secretos).
 * Para claves locales: crea assets/js/config.private.js (gitignored) con:
 *
 *   window.NUTIOK_CONFIG = window.NUTIOK_CONFIG || {};
 *   window.NUTIOK_CONFIG.geminiApiKey = "TU_CLAVE";
 *   window.NUTIOK_CONFIG.formspreeEndpoint = "https://formspree.io/f/tu_id";
 */
window.NUTIOK_CONFIG = window.NUTIOK_CONFIG || {};
Object.assign(window.NUTIOK_CONFIG, {
  geminiApiKey: "AIzaSyDrA6AHXKKqP36LYb15qkHQVP0lLLTpKb0",
  geminiModel: "gemini-flash-latest",
  geminiBaseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  formspreeEndpoint: "",
});
