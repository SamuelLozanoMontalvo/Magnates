/**
 * Services Component: Dynamic card generation and interactive mouse spotlight
 */

export function initServices(containerId, services, icons) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = services
    .map((service, index) => {
      const iconSvg = icons[service.iconKey] || "";
      const stepNumber = String(index + 1).padStart(2, "0");
      const featuresHtml = service.features
        .map((feature) => `<li>${feature}</li>`)
        .join("");

      return `
        <div class="card rv-in" style="transition-delay: ${index * 70}ms">
          <div class="ic">
            <svg viewBox="0 0 24 24">${iconSvg}</svg>
          </div>
          <span>${stepNumber}</span>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <ul>${featuresHtml}</ul>
        </div>
      `;
    })
    .join("");

  container.innerHTML = html;

  // Mouse spotlight glow tracking
  container.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });
}
