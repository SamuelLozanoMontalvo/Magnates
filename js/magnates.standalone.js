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
      { sp: 0.3, tilt: 0.35, sz: 0.52, x: 0.50, y: 0.44 },
      { sp: 1.8, tilt: 0.85, sz: 0.48, x: 0.78, y: 0.50 },
      { sp: 3.2, tilt: -0.35, sz: 0.48, x: 0.22, y: 0.50 },
      { sp: 4.5, tilt: 0.20, sz: 0.38, x: 0.50, y: 0.50 }
    ];

    // Geometría 3D: Prisma Triangular Truncado con León Facetado
    const FRONT_Z = 0.22;
    const BACK_Z = -0.22;

    // Vértices 2D frontales (x, y, zOffset para relieve 3D)
    const FRONT_V = [
      // Triángulo Exterior (0-3)
      [-0.165,  0.90,  0.00], // 0: TL
      [ 0.165,  0.90,  0.00], // 1: TR
      [ 1.450, -0.90,  0.00], // 2: BR
      [-1.450, -0.90,  0.00], // 3: BL

      // Silueta Exterior del León (4-21)
      [ 0.000, -0.30,  0.03], // 4: V-center frente
      [-0.080, -0.07,  0.02], // 5: Oreja interior L
      [-0.210, -0.07,  0.02], // 6: Oreja pico L
      [-0.340, -0.25,  0.01], // 7: Oreja caída exterior L
      [-0.310, -0.33,  0.01], // 8: Sien interior L
      [-0.340, -0.42,  0.00], // 9: Pómulo exterior L
      [-0.240, -0.58,  0.00], // 10: Mandíbula media L
      [-0.160, -0.74,  0.00], // 11: Mandíbula baja L
      [-0.080, -0.90,  0.00], // 12: Base barbilla L
      [ 0.000, -0.90,  0.02], // 13: Punta barbilla
      [ 0.080, -0.90,  0.00], // 14: Base barbilla R
      [ 0.160, -0.74,  0.00], // 15: Mandíbula baja R
      [ 0.240, -0.58,  0.00], // 16: Mandíbula media R
      [ 0.340, -0.42,  0.00], // 17: Pómulo exterior R
      [ 0.310, -0.33,  0.01], // 18: Sien interior R
      [ 0.340, -0.25,  0.01], // 19: Oreja caída exterior R
      [ 0.210, -0.07,  0.02], // 20: Oreja pico R
      [ 0.080, -0.07,  0.02], // 21: Oreja interior R

      // Ojos (22-27)
      [-0.250, -0.42,  0.02], // 22: Ojo L exterior
      [-0.110, -0.52,  0.04], // 23: Ojo L lagrimal
      [-0.180, -0.48,  0.01], // 24: Ojo L inferior
      [ 0.250, -0.42,  0.02], // 25: Ojo R exterior
      [ 0.110, -0.52,  0.04], // 26: Ojo R lagrimal
      [ 0.180, -0.48,  0.01], // 27: Ojo R inferior

      // Nariz y Frentes Faciales (28-31)
      [-0.065, -0.63,  0.06], // 28: Nariz L
      [ 0.065, -0.63,  0.06], // 29: Nariz R
      [ 0.000, -0.73,  0.08], // 30: Punta de nariz
      [ 0.000, -0.52,  0.05]  // 31: Entrecejo
    ];

    const N = FRONT_V.length;
    const B = (i) => i + N;

    // Construir vértices 3D completos (Frontales + Traseros)
    const VERTICES = [];
    for (let i = 0; i < N; i++) {
      VERTICES.push([FRONT_V[i][0], FRONT_V[i][1], FRONT_Z + FRONT_V[i][2]]);
    }
    for (let i = 0; i < N; i++) {
      VERTICES.push([FRONT_V[i][0], FRONT_V[i][1], BACK_Z - FRONT_V[i][2]]);
    }

    // Lista de Aristas 3D organizadas por tipo de material y luz
    const EDGES = [
      // Triángulo Exterior (Front, Back y Costillas de profundidad)
      { p: [0, 1], type: 'triangle' }, { p: [1, 2], type: 'triangle' },
      { p: [2, 3], type: 'triangle' }, { p: [3, 0], type: 'triangle' },
      { p: [B(0), B(1)], type: 'triangle' }, { p: [B(1), B(2)], type: 'triangle' },
      { p: [B(2), B(3)], type: 'triangle' }, { p: [B(3), B(0)], type: 'triangle' },
      { p: [0, B(0)], type: 'triangle' }, { p: [1, B(1)], type: 'triangle' },
      { p: [2, B(2)], type: 'triangle' }, { p: [3, B(3)], type: 'triangle' },

      // Silueta Exterior del León Frontal
      { p: [4, 5], type: 'lion' }, { p: [5, 6], type: 'lion' }, { p: [6, 7], type: 'lion' },
      { p: [7, 8], type: 'lion' }, { p: [8, 9], type: 'lion' }, { p: [9, 10], type: 'lion' },
      { p: [10, 11], type: 'lion' }, { p: [11, 12], type: 'lion' }, { p: [12, 13], type: 'lion' },
      { p: [13, 14], type: 'lion' }, { p: [14, 15], type: 'lion' }, { p: [15, 16], type: 'lion' },
      { p: [16, 17], type: 'lion' }, { p: [17, 18], type: 'lion' }, { p: [18, 19], type: 'lion' },
      { p: [19, 20], type: 'lion' }, { p: [20, 21], type: 'lion' }, { p: [21, 4], type: 'lion' },

      // Silueta Exterior del León Trasero
      { p: [B(4), B(5)], type: 'lion' }, { p: [B(5), B(6)], type: 'lion' }, { p: [B(6), B(7)], type: 'lion' },
      { p: [B(7), B(8)], type: 'lion' }, { p: [B(8), B(9)], type: 'lion' }, { p: [B(9), B(10)], type: 'lion' },
      { p: [B(10), B(11)], type: 'lion' }, { p: [B(11), B(12)], type: 'lion' }, { p: [B(12), B(13)], type: 'lion' },
      { p: [B(13), B(14)], type: 'lion' }, { p: [B(14), B(15)], type: 'lion' }, { p: [B(15), B(16)], type: 'lion' },
      { p: [B(16), B(17)], type: 'lion' }, { p: [B(17), B(18)], type: 'lion' }, { p: [B(18), B(19)], type: 'lion' },
      { p: [B(19), B(20)], type: 'lion' }, { p: [B(20), B(21)], type: 'lion' }, { p: [B(21), B(4)], type: 'lion' },

      // Ojos Frontales y Traseros
      { p: [22, 23], type: 'lion' }, { p: [23, 24], type: 'lion' }, { p: [24, 22], type: 'lion' },
      { p: [25, 26], type: 'lion' }, { p: [26, 27], type: 'lion' }, { p: [27, 25], type: 'lion' },
      { p: [B(22), B(23)], type: 'lion' }, { p: [B(23), B(24)], type: 'lion' }, { p: [B(24), B(22)], type: 'lion' },
      { p: [B(25), B(26)], type: 'lion' }, { p: [B(26), B(27)], type: 'lion' }, { p: [B(27), B(25)], type: 'lion' },

      // Nariz Frontal y Trasera
      { p: [28, 29], type: 'lion' }, { p: [29, 30], type: 'lion' }, { p: [30, 28], type: 'lion' },
      { p: [B(28), B(29)], type: 'lion' }, { p: [B(29), B(30)], type: 'lion' }, { p: [B(30), B(28)], type: 'lion' },

      // Facetas y líneas de expresión Frontales
      { p: [31, 30], type: 'lion' }, // Tabique
      { p: [31, 4],  type: 'lion' }, // Ceño central
      { p: [31, 23], type: 'lion' }, { p: [31, 26], type: 'lion' }, // Ceño a lagrimales
      { p: [31, 5],  type: 'lion' }, { p: [31, 21], type: 'lion' }, // Ceño a orejas
      { p: [22, 8],  type: 'lion' }, { p: [25, 18], type: 'lion' }, // Ojo a sienes
      { p: [24, 9],  type: 'lion' }, { p: [27, 17], type: 'lion' }, // Ojo a pómulos
      { p: [28, 10], type: 'lion' }, { p: [29, 16], type: 'lion' }, // Nariz a mandíbula
      { p: [30, 13], type: 'lion' }, // Punta de nariz a barbilla

      // Facetas Traseras
      { p: [B(31), B(30)], type: 'lion' },
      { p: [B(31), B(4)],  type: 'lion' },
      { p: [B(31), B(23)], type: 'lion' }, { p: [B(31), B(26)], type: 'lion' },
      { p: [B(31), B(5)],  type: 'lion' }, { p: [B(31), B(21)], type: 'lion' },
      { p: [B(22), B(8)],  type: 'lion' }, { p: [B(25), B(18)], type: 'lion' },
      { p: [B(24), B(9)],  type: 'lion' }, { p: [B(27), B(17)], type: 'lion' },
      { p: [B(28), B(10)], type: 'lion' }, { p: [B(29), B(16)], type: 'lion' },
      { p: [B(30), B(13)], type: 'lion' },

      // Costillas de profundidad del León (Front a Back)
      { p: [4, B(4)],   type: 'strut' },
      { p: [6, B(6)],   type: 'strut' },
      { p: [20, B(20)], type: 'strut' },
      { p: [8, B(8)],   type: 'strut' },
      { p: [18, B(18)], type: 'strut' },
      { p: [9, B(9)],   type: 'strut' },
      { p: [17, B(17)], type: 'strut' },
      { p: [11, B(11)], type: 'strut' },
      { p: [15, B(15)], type: 'strut' },
      { p: [13, B(13)], type: 'strut' },
      { p: [30, B(30)], type: 'strut' },

      // Tirantes de suspensión interna (Triángulo a León)
      { p: [0, 5],   type: 'strut' }, { p: [1, 21],   type: 'strut' },
      { p: [3, 12],  type: 'strut' }, { p: [2, 14],   type: 'strut' },
      { p: [B(0), B(5)],  type: 'strut' }, { p: [B(1), B(21)],  type: 'strut' },
      { p: [B(3), B(12)], type: 'strut' }, { p: [B(2), B(14)],  type: 'strut' }
    ];

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
          rawT = 0;
        } else if (mid <= c1) {
          const dist = Math.max(1, c1 - c0);
          rawT = clamp((mid - c0) / dist, 0, 1);
        } else if (mid <= c2) {
          const dist = Math.max(1, c2 - c1);
          rawT = 1 + clamp((mid - c1) / dist, 0, 1);
        } else {
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
        targetSz = 0.35;
      }

      const scale = targetSz * Math.min(width, height);
      const centerX = targetX * width;
      const centerY = targetY * height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Aura radial dual dinámica (Núcleo azul eléctrico + Corona rojo carmesí)
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 1.7);
      radialGlow.addColorStop(0, "rgba(43, 80, 237, 0.25)");
      radialGlow.addColorStop(0.55, "rgba(227, 19, 27, 0.16)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
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

        const perspective = 1 / (1 + zRotated * 0.15);
        return [
          centerX + xRotated * scale * 0.52 * perspective,
          centerY - yRotated * scale * 0.52 * perspective,
          zRotated
        ];
      });

      // Ordenar aristas por profundidad media
      const edgesWithDepth = EDGES.map((edge) => {
        const p1 = projected[edge.p[0]];
        const p2 = projected[edge.p[1]];
        const avgZ = (p1[2] + p2[2]) / 2;
        return { edge, p1, p2, avgZ };
      });
      edgesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

      // Dibujar aristas 3D ordenadas
      ctx.lineCap = "round";
      edgesWithDepth.forEach(({ edge, p1, p2, avgZ }) => {
        const isFront = avgZ < 0;

        if (edge.type === 'triangle') {
          // Triángulo exterior (resplandor azul eléctrico)
          ctx.strokeStyle = isFront
            ? `rgba(65, 120, 255, ${0.85 + (avgZ < -0.1 ? 0.15 : 0)})`
            : "rgba(35, 75, 195, 0.38)";
          ctx.shadowColor = "#3b5bdb";
          ctx.shadowBlur = isFront ? 14 : 0;
          ctx.lineWidth = isFront ? 2.5 : 1.2;
        } else if (edge.type === 'lion') {
          // Cabeza del león (resplandor blanco puro luminoso)
          ctx.strokeStyle = isFront
            ? `rgba(255, 255, 255, ${0.92 + (avgZ < -0.1 ? 0.08 : 0)})`
            : "rgba(215, 228, 255, 0.32)";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = isFront ? 10 : 0;
          ctx.lineWidth = isFront ? 2.0 : 1.0;
        } else {
          // Costillas y tirantes de profundidad
          ctx.strokeStyle = isFront
            ? "rgba(90, 145, 255, 0.45)"
            : "rgba(45, 80, 180, 0.18)";
          ctx.shadowBlur = 0;
          ctx.lineWidth = isFront ? 1.0 : 0.7;
        }

        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      });

      // Dibujar vértices luminosos
      projected.forEach(([px, py, pz], idx) => {
        const isFront = pz < 0;
        const isTriangle = idx < 4 || (idx >= 32 && idx < 36);

        ctx.shadowBlur = isFront ? 6 : 0;
        ctx.shadowColor = isTriangle ? "#3b5bdb" : "#ffffff";
        ctx.fillStyle = isTriangle
          ? (isFront ? "#4dabf7" : "rgba(59, 91, 219, 0.5)")
          : (isFront ? "#ffffff" : "rgba(255, 255, 255, 0.4)");

        ctx.beginPath();
        ctx.arc(px, py, isFront ? (isTriangle ? 2.8 : 2.0) : 1.4, 0, Math.PI * 2);
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
