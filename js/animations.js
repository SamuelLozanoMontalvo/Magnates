/**
 * MAGNATES — Animaciones suaves al hacer scroll
 * Añade clases automáticamente (sin tocar el HTML) y las activa con
 * IntersectionObserver. Script clásico: funciona también con file:///
 */
(function () {
  var doc = document;

  function ready(fn) {
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  // Divide un título en líneas (separadas por <br>) para revelarlas una a una
  function splitLines(el) {
    var lines = [[]];
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeName === "BR") lines.push([]);
      else lines[lines.length - 1].push(n);
    });
    lines = lines.filter(function (l) {
      return l.some(function (n) {
        return n.nodeType !== 3 || n.textContent.trim() !== "";
      });
    });
    while (el.firstChild) el.removeChild(el.firstChild);
    lines.forEach(function (nodes, i) {
      var ln = doc.createElement("span");
      ln.className = "ln";
      var inner = doc.createElement("span");
      inner.className = "ln-in";
      inner.style.setProperty("--i", i);
      nodes.forEach(function (n, k) {
        if (n.nodeType === 3 && k === 0) n.textContent = n.textContent.replace(/^\s+/, "");
        inner.appendChild(n);
      });
      ln.appendChild(inner);
      el.appendChild(ln);
    });
  }

  function add(selector, opts) {
    opts = opts || {};
    doc.querySelectorAll(selector).forEach(function (el, idx) {
      el.classList.add("reveal");
      var d = (opts.delay || 0);
      if (opts.stagger) {
        var siblings = Array.prototype.filter.call(
          el.parentNode.children,
          function (c) { return c.matches(selector); }
        );
        var i = siblings.indexOf(el);
        if (opts.mod) i = i % opts.mod;
        d += i * opts.stagger;
      }
      if (d) el.style.setProperty("--d", d + "s");
    });
  }

  ready(function () {
    // Títulos por línea
    doc.querySelectorAll(
      ".prob-heading-left, .prob-heading-right, .sol-title, .tech-title, .mkt-title, .cat-title, .contact-title"
    ).forEach(function (h) {
      splitLines(h);
      h.classList.add("reveal-title", "reveal");
    });

    // Hero (secuencia de entrada)
    add(".hero-tagline", { delay: 0.15 });
    add(".hero-logo", { delay: 0.3 });
    add(".hero-subtitle", { delay: 0.55 });

    // Párrafos de sección
    add(".prob-desc-top, .sol-desc, .cat-desc, .contact-desc", { delay: 0.12 });
    add(".mkt-body p", { stagger: 0.12, delay: 0.1 });

    // Tarjetas / grupos escalonados
    add(".prob-card", { stagger: 0.09 });
    add(".sol-pillar", { stagger: 0.1 });
    add(".cat-card", { stagger: 0.08, mod: 3 });
    add(".tech-item", { stagger: 0.06 });
    add(".contact-card", { delay: 0.1 });

    // Los títulos no deben moverse como bloque (lo hacen sus líneas)
    doc.querySelectorAll(".reveal-title").forEach(function (h) {
      h.style.opacity = "1";
      h.style.translate = "0 0";
    });

    // Observador: se anima una sola vez
    var targets = doc.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach(function (t) { io.observe(t); });
    }

    // Navbar: sombra al hacer scroll
    var nav = doc.querySelector("nav");
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("nav-scrolled", (window.scrollY || 0) > 24);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  });
})();
