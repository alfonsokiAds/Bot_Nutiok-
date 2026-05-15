(function () {
  /** @param {"en"|"es"} locale */
  function knowledgeBase(locale) {
    if (locale === "en") {
      return `You are the virtual assistant for NUTIOK, an Android mobile app developed as a
degree project at Universidad de Cundinamarca, Seccional Ubaté, by Wilson Nicolás Bustos Alonso
and Carlos Alfonso Delgado Salazar (2026-1).

Your only role is to answer questions about NUTIOK. If asked about anything unrelated to NUTIOK,
reply politely: "I can only answer questions about NUTIOK. Can I help you with something about the app?"

---

NUTIOK CONTEXT:

**What is NUTIOK?**
NUTIOK is an Android mobile app that helps university students improve their eating habits during
busy academic days. It addresses skipping main meals, a common issue due to long class hours and poor planning.

**Problem it solves:**
University students often skip meals or replace them with less nutritious options because of demanding schedules and lack of meal planning.

**Main features:**
1. Personalized push reminders based on the user's class schedule.
2. Healthy recipe book with easy, affordable recipes.
3. Map of restaurants near the university (Google Maps API).
4. Nutritional profile with automatic BMI calculation.
5. Food notes for daily logging and tracking.

**Technologies:**
- Mobile frontend: Flutter / Dart
- Backend and database: Supabase (PostgreSQL + authentication)
- Maps: Google Maps API
- Version control: GitHub
- Methodology: Hybrid XP + Scrum (4 sprints)

**Team:**
- Wilson Nicolás Bustos Alonso
- Carlos Alfonso Delgado Salazar
- Program: Systems and Computing Engineering
- Institution: Universidad de Cundinamarca, Seccional Ubaté

**Availability:**
NUTIOK is actively under development as a 2026-1 degree project. It is not yet available on public app stores.

---

Always respond in English, clearly, in a friendly tone, and briefly.
Do not invent information that is not in this context.`;
    }

    return `Eres el asistente virtual de NUTIOK, una aplicación móvil para Android
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
No inventes información que no esté en este contexto.`;
  }

  const fab = document.querySelector(".chat-fab");
  const widget = document.querySelector(".chat-widget");
  const closeBtn = document.querySelector(".chat-widget__close");
  const messagesEl = document.querySelector(".chat-widget__messages");
  const typingEl = document.querySelector(".chat-typing");
  const input = document.querySelector(".chat-widget__input");
  const sendBtn = document.querySelector(".chat-widget__send");

  if (!fab || !widget || !messagesEl || !input || !sendBtn) return;

  /** @type {{role: 'user'|'model', text: string}[]} */
  let apiHistory = [];

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function appendBubble(text, who) {
    const div = document.createElement("div");
    div.className = `chat-bubble chat-bubble--${who}`;
    div.textContent = text;
    if (typingEl && typingEl.parentNode === messagesEl) {
      messagesEl.insertBefore(div, typingEl);
    } else {
      messagesEl.appendChild(div);
    }
    scrollToBottom();
  }

  function setTyping(on) {
    typingEl?.classList.toggle("is-visible", on);
    if (on) scrollToBottom();
  }

  function setOpen(open) {
    widget.classList.toggle("is-open", open);
    fab.setAttribute("aria-expanded", String(open));
    widget.setAttribute("aria-hidden", open ? "false" : "true");
  }

  document.querySelectorAll("[data-open-chat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setOpen(true);
      input.focus();
    });
  });

  fab.addEventListener("click", () => {
    const open = !widget.classList.contains("is-open");
    setOpen(open);
    if (open) input.focus();
  });

  closeBtn?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && widget.classList.contains("is-open")) {
      setOpen(false);
      fab.focus();
    }
  });

  function resolveLocale(cfg) {
    const raw = String(cfg.chatbotLocale || "es").toLowerCase();
    return raw === "en" || raw.startsWith("en-") ? "en" : "es";
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const cfg = window.NUTIOK_CONFIG || {};
    const apiKey = String(cfg.geminiApiKey ?? "").trim();
    const model = cfg.geminiModel || "gemini-2.0-flash";
    const baseUrl = (cfg.geminiBaseUrl || "https://generativelanguage.googleapis.com/v1beta/models").replace(/\/$/, "");
    const locale = resolveLocale(cfg);
    const noKeyMsg =
      locale === "en"
        ? "The Gemini API key is still empty in the browser. Open nutiok-landing/assets/js/config.private.js, set geminiApiKey: \"AIza...\" (exact property name), save the file, restart python serve.py if needed, then hard-reload the page (Ctrl+Shift+R). In DevTools > Network, config.private.js must return 200 — if it is 404, you are not serving the folder that contains that file."
        : "La clave de Gemini sigue vacía en el navegador. Abre nutiok-landing/assets/js/config.private.js, pon geminiApiKey: \"AIza...\" (nombre exacto de la propiedad), guarda, reinicia python serve.py si hace falta y recarga en forzado (Ctrl+Mayús+R). En Herramientas > Red, config.private.js debe dar 200; si ves 404, no estás sirviendo la carpeta donde está ese archivo.";

    if (!apiKey) {
      appendBubble(noKeyMsg, "bot");
      return;
    }

    input.value = "";
    appendBubble(text, "user");
    apiHistory.push({ role: "user", text });

    const contents = apiHistory.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const url = `${baseUrl}/${model}:generateContent`;

    setTyping(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: knowledgeBase(locale) }],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.error?.message || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const candidate = data?.candidates?.[0];
      const finish = candidate?.finishReason;
      const parts = candidate?.content?.parts;
      const replyText = parts?.map((p) => p.text).join("");

      if (!replyText) {
        const blockReason = data?.promptFeedback?.blockReason;
        const detail = blockReason || finish || "EMPTY";
        const fallback =
          locale === "en"
            ? `The model returned no text (${detail}). Try rephrasing your question.`
            : `El modelo no devolvió texto (${detail}). Prueba a reformular la pregunta.`;
        appendBubble(fallback, "bot");
        apiHistory.push({ role: "model", text: fallback });
      } else {
        appendBubble(replyText, "bot");
        apiHistory.push({ role: "model", text: replyText });
      }

      const maxPairs = 12;
      while (apiHistory.length > maxPairs * 2) {
        apiHistory.shift();
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      const intro =
        locale === "en"
          ? "Sorry, something went wrong while generating the reply."
          : "Lo siento, hubo un problema al generar la respuesta.";
      const hint =
        locale === "en"
          ? "Check: internet connection, API key in Google AI Studio, model name (gemini-2.0-flash), and that the key’s “Application restrictions” allow this origin (e.g. http://127.0.0.1:8080)."
          : "Revisa: conexión, clave en Google AI Studio, nombre del modelo (p. ej. gemini-2.0-flash) y que las restricciones de la clave permitan este origen (p. ej. http://127.0.0.1:8080).";
      appendBubble(`${intro}\n\n${hint}\n\n${locale === "en" ? "Detail" : "Detalle"}: ${detail}`, "bot");
      apiHistory.pop();
      console.error(err);
    } finally {
      setTyping(false);
      input.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
