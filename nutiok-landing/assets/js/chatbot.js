(function () {
  const KNOWLEDGE_BASE = `Eres el asistente virtual de NUTIOK, una aplicación móvil para Android
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

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const cfg = window.NUTIOK_CONFIG || {};
    const apiKey = cfg.geminiApiKey;
    const model = cfg.geminiModel || "gemini-flash-latest";
    const baseUrl = (cfg.geminiBaseUrl || "https://generativelanguage.googleapis.com/v1beta/models").replace(/\/$/, "");

    if (!apiKey) {
      appendBubble(
        "Para usar el asistente, configura tu clave de Gemini en assets/js/config.private.js (consulta el README).",
        "bot"
      );
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
            parts: [{ text: KNOWLEDGE_BASE }],
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
        const msg = data?.error?.message || "Error al contactar el servicio.";
        throw new Error(msg);
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
        "No obtuve una respuesta clara. Intenta reformular tu pregunta.";

      appendBubble(reply, "bot");
      apiHistory.push({ role: "model", text: reply });

      const maxPairs = 12;
      while (apiHistory.length > maxPairs * 2) {
        apiHistory.shift();
      }
    } catch (err) {
      appendBubble(
        "Lo siento, hubo un problema al generar la respuesta. Verifica tu conexión y la configuración de la API.",
        "bot"
      );
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
