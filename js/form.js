/**
 * Contact Form Component: Service tags selector and interactive submission
 */

export function initContactForm(formId, tagsContainerId, tags) {
  const form = document.getElementById(formId);
  const tagsContainer = document.getElementById(tagsContainerId);

  // Render choice buttons
  if (tagsContainer && tags) {
    tagsContainer.innerHTML = tags
      .map((tag) => `<button type="button">${tag}</button>`)
      .join("");

    tagsContainer.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("on");
      });
    });
  }

  // Handle submit feedback
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector(".send");
      if (!submitBtn) return;

      const nombre = (document.getElementById("n")?.value || "").trim();
      const email = (document.getElementById("e")?.value || "").trim();
      const tel = (document.getElementById("t")?.value || "").trim();
      const mensaje = (document.getElementById("m")?.value || "").trim();
      const selected = Array.from(tagsContainer ? tagsContainer.querySelectorAll("button.on") : []).map((b) => b.textContent.trim());
      const servicios = selected.length ? selected.join(", ") : "Estrategia 360 general";

      const serviciosInput = document.getElementById("servicios_input");
      if (serviciosInput) {
        serviciosInput.value = servicios;
      }

      // Respuesta instantánea 0s
      submitBtn.disabled = true;
      submitBtn.innerHTML = "¡Propuesta enviada con éxito! Te contactamos pronto ✓";
      submitBtn.style.backgroundColor = "#25D366";
      submitBtn.style.borderColor = "#25D366";
      submitBtn.style.color = "#ffffff";
      submitBtn.style.opacity = "1";

      let successNotice = document.getElementById("form-success-notice");
      if (!successNotice) {
        successNotice = document.createElement("div");
        successNotice.id = "form-success-notice";
        successNotice.style.cssText = "margin-top:16px;padding:14px 18px;background:rgba(37,211,102,0.12);border:1px solid #25D366;border-radius:4px;font-size:13.5px;line-height:1.55;color:#e8e8e8;";
        form.appendChild(successNotice);
      }

      const waText = encodeURIComponent(`¡Hola Magnates! Acabo de enviar mi proyecto desde la web:\n\n• Nombre: ${nombre}\n• Email: ${email}\n• WhatsApp: ${tel}\n• Servicios: ${servicios}\n• Detalles: ${mensaje}`);
      const waUrl = `https://wa.me/573046059708?text=${waText}`;

      successNotice.innerHTML = `
        <b style="color:#25D366;display:block;margin-bottom:4px">✓ Solicitud recibida</b>
        Hemos recibido tus datos y te enviaremos una propuesta formal a tu correo en breve.<br>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:9px 16px;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;border-radius:3px;box-shadow:0 4px 12px rgba(37,211,102,0.3);">
          <span>¿Respuesta inmediata? Abrir en WhatsApp</span> <span>↗</span>
        </a>
      `;

      try {
        fetch("https://formsubmit.co/ajax/contacto@magnates.site", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: new FormData(form)
        }).catch(() => {});
      } catch (_) {}

      setTimeout(() => {
        form.reset();
        if (tagsContainer) tagsContainer.querySelectorAll("button.on").forEach((b) => b.classList.remove("on"));
      }, 1500);
    });
  }
}
