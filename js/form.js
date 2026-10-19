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
      if (submitBtn) {
        submitBtn.innerHTML = "¡Recibido! Te contactamos pronto ✓";
        submitBtn.style.backgroundColor = "#ffffff";
        submitBtn.style.color = "#111111";
      }
    });
  }
}
