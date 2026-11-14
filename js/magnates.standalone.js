/**
 * MAGNATES — Standalone Bundle (Works directly with file:/// without a web server)
 * Figma Exact Replica Controller
 */
(function () {
  function init() {
    // 1. Navigation Active Link on Scroll
    const navLinks = document.querySelectorAll("nav .nav-link");
    const sections = ["hero", "problema", "servicios", "tecnologias", "marketing", "categorias", "contacto"];

    function updateNav() {
      const scrollY = window.scrollY || window.pageYOffset;
      let current = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (scrollY >= top) {
            current = id;
          }
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("nav-active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("nav-active");
        }
      });
    }

    window.addEventListener("scroll", updateNav, { passive: true });
    updateNav();

    // 2. Contact Form Submission Handling
    const fm = document.getElementById("fm");
    if (fm) {
      fm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = fm.querySelector(".f-submit, button[type='submit']");
        if (!submitBtn) return;

        const nombre = (document.getElementById("n")?.value || "").trim();
        const email = (document.getElementById("e")?.value || "").trim();
        const tel = (document.getElementById("t")?.value || "").trim();
        const mensaje = (document.getElementById("m")?.value || "").trim();

        submitBtn.disabled = true;
        submitBtn.innerHTML = "¡Propuesta enviada con éxito! Te contactamos pronto ✓";
        submitBtn.style.backgroundColor = "#25D366";
        submitBtn.style.color = "#ffffff";

        // Confirmation notice with direct WhatsApp link
        let notice = document.getElementById("form-success-notice");
        if (!notice) {
          notice = document.createElement("div");
          notice.id = "form-success-notice";
          notice.style.cssText = "margin-top:16px;padding:14px;background:#f0fdf4;border:1px solid #22c55e;border-radius:4px;font-size:13.5px;color:#15803d;line-height:1.5;";
          fm.appendChild(notice);
        }

        const waText = encodeURIComponent(`¡Hola Magnates! Acabo de enviar mi proyecto desde la web:\n\n• Nombre: ${nombre}\n• Email: ${email}\n• WhatsApp: ${tel}\n• Mensaje: ${mensaje}`);
        const waUrl = `https://wa.me/573046059708?text=${waText}`;

        notice.innerHTML = `
          <b>✓ Solicitud recibida</b><br>
          Te responderemos a tu correo en breve.<br>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;border-radius:3px;">
            Respuesta inmediata por WhatsApp ↗
          </a>
        `;

        // Async submit to FormSubmit
        try {
          fetch("https://formsubmit.co/ajax/contacto@magnates.site", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(fm)
          }).catch(() => {});
        } catch (_) {}

        setTimeout(() => {
          fm.reset();
        }, 2000);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
