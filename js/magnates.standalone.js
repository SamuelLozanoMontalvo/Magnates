/**
 * MAGNATES — Standalone Bundle (Works directly with file:/// without a web server)
 */
(function () {
  const TECH_STACK = [
    ["Google Analytics", "#E37400"],
    ["Search Console", "#1A73E8"],
    ["Tag Manager", "#4285F4"],
    ["Google Ads", "#C99700"],
    ["Business Profile", "#34A853"],
    ["Looker Studio", "#5B7FE8"],
    ["Meta Ads", "#0866FF"],
    ["Instagram", "#D6249F"],
    ["TikTok", "#222222"],
    ["Shopify", "#5E8E3E"],
    ["WordPress", "#21759B"],
    ["Duda", "#7B61FF"],
    ["Brevo", "#0B996E"],
    ["Figma", "#A259FF"],
    ["Canva", "#00A5B5"],
    ["WhatsApp Business", "#128C7E"]
  ];

  const ICONS = {
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    chat: '<path d="M21 12a8 8 0 01-11.6 7.1L3 21l1.9-5.4A8 8 0 1121 12z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'
  };

  const SERVICES = [
    {
      iconKey: "target",
      title: "Meta Ads",
      description: "Campañas en Facebook e Instagram con segmentación local y medición de ventas.",
      features: ["Segmentación por zona", "Creativos y copys", "Remarketing y pixel"]
    },
    {
      iconKey: "pen",
      title: "Diseño",
      description: "Identidad de marca y piezas que se ven profesionales en todos los canales.",
      features: ["Logo y branding", "Piezas para redes", "Material impreso"]
    },
    {
      iconKey: "globe",
      title: "Web & Tiendas",
      description: "Sitios rápidos y optimizados en WordPress, Duda y Shopify listos para vender.",
      features: ["Diseño responsive", "Tienda online", "Velocidad y SEO técnico"]
    },
    {
      iconKey: "chat",
      title: "Community Manager",
      description: "Estrategia y gestión diaria de tus redes para crecer con comunidad real.",
      features: ["Calendario de contenido", "Reels y stories", "Respuesta a mensajes"]
    },
    {
      iconKey: "search",
      title: "SEO & Analítica",
      description: "Search Console, Analytics y Business Profile para que te encuentren en Cartagena.",
      features: ["SEO local", "Google Maps", "Reportes mensuales"]
    },
    {
      iconKey: "mail",
      title: "Email & Automatización",
      description: "Flujos y newsletters con Brevo para fidelizar y vender de nuevo.",
      features: ["Newsletters", "Automatizaciones", "Segmentación de listas"]
    }
  ];

  const CONTACT_SERVICES = [
    "Meta Ads",
    "Diseño",
    "Página web",
    "Tienda online",
    "Community manager",
    "SEO",
    "Email marketing",
    "Todo 360"
  ];

  function init() {
    // 1. Tech Marquee
    const mqs = document.getElementById("mqs");
    if (mqs) {
      let markup = "";
      [0, 1].forEach((isReverse) => {
        const list = isReverse ? [...TECH_STACK].reverse() : [...TECH_STACK];
        const badgesHtml = list
          .map(([name, color]) => `<span class="b" style="background:${color}">${name}</span>`)
          .join("");
        const tracksHtml = [1, 2, 3]
          .map(() => `<div class="tr">${badgesHtml}</div>`)
          .join("");
        markup += `<div class="mq${isReverse ? " rv" : ""}">${tracksHtml}</div>`;
      });
      mqs.innerHTML = markup;
    }

    // 2. Services Grid
    const sv = document.getElementById("sv");
    if (sv) {
      sv.innerHTML = SERVICES.map((service, index) => {
        const iconSvg = ICONS[service.iconKey] || "";
        const stepNum = String(index + 1).padStart(2, "0");
        const features = service.features.map((f) => `<li>${f}</li>`).join("");
        return `
          <div class="card rv-in" style="transition-delay:${index * 70}ms">
            <div class="ic"><svg viewBox="0 0 24 24">${iconSvg}</svg></div>
            <span>${stepNum}</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul>${features}</ul>
          </div>
        `;
      }).join("");

      sv.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
      });
    }

    // 3. Contact Form Choice Buttons & Feedback
    const ch = document.getElementById("ch");
    if (ch) {
      ch.innerHTML = CONTACT_SERVICES.map((name) => `<button type="button">${name}</button>`).join("");
      ch.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => btn.classList.toggle("on"));
      });
    }

    const fm = document.getElementById("fm");
    if (fm) {
      fm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = fm.querySelector(".send");
        if (submitBtn) {
          submitBtn.innerHTML = "¡Recibido! Te contactamos pronto ✓";
          submitBtn.style.backgroundColor = "#ffffff";
          submitBtn.style.color = "#111111";
        }
      });
    }

    // 4. Scroll Reveal Intersection Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv-in").forEach((el) => revealObserver.observe(el));

    // 5. Hero 3D Canvas
    const hero = document.getElementById("hero");
    const stage = document.getElementById("stage");
    const canvas = document.getElementById("cv");
    if (!hero || !stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    const NUM_SCENES = 3;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Escenas: 0: Centro (Magnates), 1: Derecha (Problema), 2: Izquierda (Solución)
    const KEYFRAMES = [
      { sp: 0.3, tilt: 0.35, sz: 0.32, x: 0.50, y: 0.44 },
      { sp: 1.8, tilt: 0.90, sz: 0.24, x: 0.77, y: 0.50 },
      { sp: 3.2, tilt: -0.4, sz: 0.24, x: 0.23, y: 0.50 }
    ];

    const PHI = 1.618;
    const VERTICES = [
      [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
      [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
      [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -PHI], [-PHI, 0, -PHI]
    ];

    const EDGES = [];
    for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
        const dist = Math.hypot(
          VERTICES[i][0] - VERTICES[j][0],
          VERTICES[i][1] - VERTICES[j][1],
          VERTICES[i][2] - VERTICES[j][2]
        );
        if (Math.abs(dist - 2) < 0.05) {
          EDGES.push([i, j]);
        }
      }
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    function handleResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = stage.clientWidth;
      height = stage.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    const clamp = (val) => (val < 0 ? 0 : val > 1 ? 1 : val);
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a, b, f) => a + (b - a) * f;

    let progress = 0;
    let timer = 0;
    let lastTime = performance.now();

    function render(currentTime) {
      requestAnimationFrame(render);
      const deltaTime = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      if (!prefersReducedMotion) timer += deltaTime;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh = Math.max(1, window.innerHeight);

      // t va de 0 (pantalla 1: Magnates) a 1 (pantalla 2: Problema) a 2 (pantalla 3: Solución)
      const rawT = clamp(scrollY / vh, 0, 2);
      progress += (rawT - progress) * (1 - Math.exp(-deltaTime * 7));

      const isMobile = width < 860;
      const index = Math.min(Math.floor(progress), NUM_SCENES - 2);
      const factor = easeInOutCubic(clamp(progress - index, 0, 1));

      const currentKeyframe = KEYFRAMES[index];
      const nextKeyframe = KEYFRAMES[index + 1];

      const spin = lerp(currentKeyframe.sp, nextKeyframe.sp, factor) + timer * 0.22;
      const tilt = lerp(currentKeyframe.tilt, nextKeyframe.tilt, factor);
      let targetX = lerp(currentKeyframe.x, nextKeyframe.x, factor);
      let targetY = lerp(currentKeyframe.y, nextKeyframe.y, factor);
      let targetSz = lerp(currentKeyframe.sz, nextKeyframe.sz, factor);

      // Cuando scrollea más allá del hero (hacia stack, servicios, contacto):
      if (scrollY > vh * 2) {
        const beyondFactor = clamp((scrollY - vh * 2) / (vh * 1.5), 0, 1);
        targetX = lerp(targetX, 0.50, beyondFactor);
        targetY = lerp(targetY, 0.48, beyondFactor);
        targetSz = 0.28;
      }

      if (isMobile) {
        targetX = 0.5;
        targetY = 0.26;
        targetSz = 0.22;
      }

      const scale = targetSz * Math.min(width, height);
      const centerX = targetX * width;
      const centerY = targetY * height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 1.8);
      radialGlow.addColorStop(0, "rgba(227, 19, 27, 0.28)");
      radialGlow.addColorStop(1, "rgba(227, 19, 27, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      const projected = VERTICES.map((vertex) => {
        const xRotated = vertex[0] * cosSpin + vertex[2] * sinSpin;
        let zRotated = -vertex[0] * sinSpin + vertex[2] * cosSpin;
        const yRotated = vertex[1] * cosTilt - zRotated * sinTilt;
        zRotated = vertex[1] * sinTilt + zRotated * cosTilt;

        const perspective = 1 / (1 + zRotated * 0.12);
        return [
          centerX + xRotated * scale * 0.5 * perspective,
          centerY - yRotated * scale * 0.5 * perspective,
          zRotated
        ];
      });

      ctx.lineCap = "round";
      EDGES.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const avgDepth = (p1[2] + p2[2]) / 2;
        const isFront = avgDepth < 0;

        ctx.strokeStyle = `rgba(${isFront ? 255 : 200}, ${isFront ? 70 : 20}, 30, ${isFront ? 0.95 : 0.45})`;
        ctx.shadowColor = "#e3131b";
        ctx.shadowBlur = isFront ? 14 : 0;
        ctx.lineWidth = isFront ? 2.2 : 1.2;

        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      });

      projected.forEach(([px, py]) => {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#b6b095";
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    requestAnimationFrame(render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
