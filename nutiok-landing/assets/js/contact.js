(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = form.querySelector(".contact-form__feedback");
  const submitBtn = form.querySelector('button[type="submit"]');
  const cfg = window.NUTIOK_CONFIG || {};

  const fields = {
    name: form.querySelector("#contact-name"),
    email: form.querySelector("#contact-email"),
    subject: form.querySelector("#contact-subject"),
    message: form.querySelector("#contact-message"),
  };

  function showFieldError(key, msg) {
    const err = form.querySelector(`[data-error-for="${key}"]`);
    if (!err) return;
    err.textContent = msg || "";
    err.classList.toggle("is-visible", Boolean(msg));
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    feedback.className = "contact-form__feedback";

    ["name", "email", "subject", "message"].forEach((k) => showFieldError(k, ""));

    const name = fields.name?.value.trim() || "";
    const email = fields.email?.value.trim() || "";
    const subject = fields.subject?.value.trim() || "";
    const message = fields.message?.value.trim() || "";

    let ok = true;
    if (!name) {
      showFieldError("name", "El nombre es obligatorio.");
      ok = false;
    }
    if (!email) {
      showFieldError("email", "El correo es obligatorio.");
      ok = false;
    } else if (!validateEmail(email)) {
      showFieldError("email", "Introduce un correo válido.");
      ok = false;
    }
    if (!subject) {
      showFieldError("subject", "El asunto es obligatorio.");
      ok = false;
    }
    if (!message) {
      showFieldError("message", "El mensaje es obligatorio.");
      ok = false;
    }
    if (!ok) return;

    const endpoint = cfg.formspreeEndpoint;
    if (!endpoint) {
      feedback.textContent =
        "Configura formspreeEndpoint en assets/js/config.private.js (ver README).";
      feedback.classList.add("contact-form__feedback--err");
      return;
    }

    submitBtn?.classList.add("is-loading");
    const prevLabel = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando…';
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
        }),
      });

      if (!res.ok) throw new Error("Respuesta no exitosa");

      feedback.textContent = "¡Mensaje enviado! Te responderemos pronto.";
      feedback.classList.add("contact-form__feedback--ok");
      form.reset();
    } catch {
      feedback.textContent = "No se pudo enviar. Intenta de nuevo más tarde.";
      feedback.classList.add("contact-form__feedback--err");
    } finally {
      submitBtn?.classList.remove("is-loading");
      if (submitBtn && prevLabel !== undefined) submitBtn.innerHTML = prevLabel;
    }
  });
})();
