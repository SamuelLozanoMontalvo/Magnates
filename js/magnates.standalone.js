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
      description: "Campañas en Facebook e Instagram con segmentación en Cartagena, Colombia y mercados internacionales.",
      features: ["Segmentación local y global", "Creativos y copys de alto impacto", "Remarketing y pixel"]
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
      description: "Search Console, Analytics y posicionamiento para que te encuentren en Cartagena, Colombia y el mundo.",
      features: ["SEO local Cartagena", "SEO nacional & Google Maps", "Reportes mensuales"]
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
        if (!submitBtn) return;

        // 1. Recoger datos del formulario
        const nombre = (document.getElementById("n")?.value || "").trim();
        const email = (document.getElementById("e")?.value || "").trim();
        const tel = (document.getElementById("t")?.value || "").trim();
        const mensaje = (document.getElementById("m")?.value || "").trim();
        const selected = Array.from(ch ? ch.querySelectorAll("button.on") : []).map((b) => b.textContent.trim());
        const servicios = selected.length ? selected.join(", ") : "Estrategia 360 general";

        const serviciosInput = document.getElementById("servicios_input");
        if (serviciosInput) {
          serviciosInput.value = servicios;
        }

        // 2. RESPUESTA INSTANTÁNEA (0 segundos de espera para el usuario)
        submitBtn.disabled = true;
        submitBtn.innerHTML = "¡Propuesta enviada con éxito! Te contactamos pronto ✓";
        submitBtn.style.backgroundColor = "#25D366";
        submitBtn.style.borderColor = "#25D366";
        submitBtn.style.color = "#ffffff";
        submitBtn.style.opacity = "1";

        // Notificación de confirmación con enlace directo a WhatsApp para cerrar ventas de inmediato
        let successNotice = document.getElementById("form-success-notice");
        if (!successNotice) {
          successNotice = document.createElement("div");
          successNotice.id = "form-success-notice";
          successNotice.style.cssText = "margin-top:16px;padding:14px 18px;background:rgba(37,211,102,0.12);border:1px solid #25D366;border-radius:4px;font-size:13.5px;line-height:1.55;color:#e8e8e8;";
          fm.appendChild(successNotice);
        }

        const waText = encodeURIComponent(`¡Hola Magnates! Acabo de enviar mi proyecto desde la web:\n\n• Nombre: ${nombre}\n• Email: ${email}\n• WhatsApp: ${tel}\n• Servicios: ${servicios}\n• Detalles: ${mensaje}`);
        const waUrl = `https://wa.me/573126414593?text=${waText}`;

        successNotice.innerHTML = `
          <b style="color:#25D366;display:block;margin-bottom:4px">✓ Solicitud recibida</b>
          Hemos recibido tus datos y te enviaremos una propuesta formal a tu correo en breve.<br>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:9px 16px;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;border-radius:3px;box-shadow:0 4px 12px rgba(37,211,102,0.3);">
            <span>¿Respuesta inmediata? Abrir en WhatsApp</span> <span>↗</span>
          </a>
        `;

        // 3. Envío asíncrono al correo samylozano00@gmail.com en segundo plano
        try {
          fetch("https://formsubmit.co/ajax/samylozano00@gmail.com", {
            method: "POST",
            headers: {
              "Accept": "application/json"
            },
            body: new FormData(fm)
          }).catch(() => {});
        } catch (_) {}

        // Limpieza de campos
        setTimeout(() => {
          fm.reset();
          if (ch) ch.querySelectorAll("button.on").forEach((b) => b.classList.remove("on"));
        }, 1500);
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
    const NUM_SCENES = 4;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 0: Intro (Centro), 1: Problema (Derecha), 2: Solución (IZQUIERDA - equilibrado con texto a la derecha), 3: Fondo
    const KEYFRAMES = [
      { sp: 0.3, tilt: 0.35, sz: 0.50, x: 0.50, y: 0.44 },
      { sp: 1.8, tilt: 0.90, sz: 0.48, x: 0.78, y: 0.50 },
      { sp: 3.2, tilt: -0.4, sz: 0.48, x: 0.22, y: 0.50 },
      { sp: 4.5, tilt: 0.20, sz: 0.36, x: 0.50, y: 0.50 }
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

    const clamp = (val, min = 0, max = 1) => (val < min ? min : val > max ? max : val);
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

      const screenIntro = document.querySelector(".screen-intro");
      const screenProblem = document.querySelector(".screen-problem");
      const screenSolution = document.querySelector(".screen-solution");

      const vh = Math.max(1, window.innerHeight);
      const mid = vh / 2;

      let rawT = 0;
      if (screenIntro && screenProblem && screenSolution) {
        const rIntro = screenIntro.getBoundingClientRect();
        const rProb = screenProblem.getBoundingClientRect();
        const rSol = screenSolution.getBoundingClientRect();

        // Centros de cada pantalla respecto al viewport
        const c0 = rIntro.top + rIntro.height / 2;
        const c1 = rProb.top + rProb.height / 2;
        const c2 = rSol.top + rSol.height / 2;

        if (mid <= c0) {
          // En Intro (t=0)
          rawT = 0;
        } else if (mid <= c1) {
          // Transición suave de Intro (t=0) a Problema (t=1)
          const dist = Math.max(1, c1 - c0);
          rawT = clamp((mid - c0) / dist, 0, 1);
        } else if (mid <= c2) {
          // Transición suave de Problema (t=1) a Solución (t=2)
          const dist = Math.max(1, c2 - c1);
          rawT = 1 + clamp((mid - c1) / dist, 0, 1);
        } else {
          // Transición de Solución hacia el fondo general de la página (t=2 a t=3)
          rawT = 2 + clamp((mid - c2) / (vh * 0.8), 0, 1);
        }
      } else {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        rawT = clamp(scrollY / vh, 0, 3);
      }

      progress += (rawT - progress) * (1 - Math.exp(-deltaTime * 9));

      const isMobile = width < 860;
      const index = Math.min(Math.floor(progress), 2);
      const factor = easeInOutCubic(clamp(progress - index, 0, 1));

      const currentKeyframe = KEYFRAMES[index];
      const nextKeyframe = KEYFRAMES[index + 1];

      const spin = lerp(currentKeyframe.sp, nextKeyframe.sp, factor) + timer * 0.22;
      const tilt = lerp(currentKeyframe.tilt, nextKeyframe.tilt, factor);
      let targetX = lerp(currentKeyframe.x, nextKeyframe.x, factor);
      let targetY = lerp(currentKeyframe.y, nextKeyframe.y, factor);
      let targetSz = lerp(currentKeyframe.sz, nextKeyframe.sz, factor);

      if (isMobile) {
        targetX = 0.5;
        targetY = 0.25;
        targetSz = 0.32;
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
