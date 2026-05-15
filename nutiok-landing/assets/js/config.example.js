/**
 * Configuración pública por defecto (sin secretos).
 * Para la API key: crea assets/js/config.private.js (gitignored) y carga el script
 * en index.html después de este archivo. Nunca subas claves reales al repositorio.
 *
 *   window.NUTIOK_CONFIG = window.NUTIOK_CONFIG || {};
 *   window.NUTIOK_CONFIG.geminiApiKey = "TU_CLAVE";
 *   window.NUTIOK_CONFIG.formspreeEndpoint = "https://formspree.io/f/tu_id";
 *
 * Idioma del asistente: "en" (inglés) o "es" (español).
 */
window.NUTIOK_CONFIG = window.NUTIOK_CONFIG || {};
Object.assign(window.NUTIOK_CONFIG, {
  geminiApiKey: "AIzaSyAbyiSBGpePtBJHdUYlkAzdpOnpNVg_W7Y",
  geminiModel: "gemini-2.5-flash",
  geminiBaseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  /** "en" | "es" — idioma de las respuestas del chatbot */
  chatbotLocale: "en",
  formspreeEndpoint: "",
});
