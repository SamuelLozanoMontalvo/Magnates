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

      const selected = Array.from(tagsContainer ? tagsContainer.querySelectorAll("button.on") : []).map((b) => b.textContent.trim());
      const serviciosInput = document.getElementById("servicios_input");
      if (serviciosInput) {
        serviciosInput.value = selected.length ? selected.join(", ") : "Estrategia 360 general";
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Enviando propuesta...";
      submitBtn.style.opacity = "0.75";

      fetch("https://formsubmit.co/ajax/samylozano00@gmail.com", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: new FormData(form)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network error");
          return res.json();
        })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.innerHTML = "¡Propuesta enviada con éxito! Te contactamos pronto ✓";
          submitBtn.style.backgroundColor = "#25D366";
          submitBtn.style.borderColor = "#25D366";
          submitBtn.style.color = "#ffffff";
          form.reset();
          if (tagsContainer) tagsContainer.querySelectorAll("button.on").forEach((b) => b.classList.remove("on"));
        })
        .catch(() => {
          form.submit();
        });
    });
  }
}
