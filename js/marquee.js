/**
 * Marquee Component: Generates dual-direction infinite tech stack carousels
 */

export function initMarquee(containerId, techStack) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let markup = "";

  [0, 1].forEach((isReverse) => {
    const list = isReverse ? [...techStack].reverse() : [...techStack];

    const badgesHtml = list
      .map(
        ([name, color]) =>
          `<span class="b" style="background:${color}">${name}</span>`
      )
      .join("");

    // Repeat tracks 3 times for seamless infinite scroll
    const tracksHtml = [1, 2, 3]
      .map(() => `<div class="tr">${badgesHtml}</div>`)
      .join("");

    markup += `<div class="mq${isReverse ? " rv" : ""}">${tracksHtml}</div>`;
  });

  container.innerHTML = markup;
}
