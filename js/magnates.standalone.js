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

    // 5. Hero 3D Canvas (3D Blue Pyramid & Lion Emblem)
    const hero = document.getElementById("hero");
    const stage = document.getElementById("stage");
    const canvas = document.getElementById("cv");

    if (!hero || !stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Keyframes por pantalla:
    // 0: Intro (Centro), 1: Problema (Derecha), 2: Solución (Izquierda), 3: Fondo
    const KEYFRAMES = [
      { sp: 0.18, tilt: 0.22, sz: 0.54, x: 0.50, y: 0.44 },
      { sp: 0.65, tilt: 0.28, sz: 0.50, x: 0.78, y: 0.50 },
      { sp: -0.42, tilt: 0.16, sz: 0.50, x: 0.22, y: 0.50 },
      { sp: 0.20, tilt: 0.24, sz: 0.40, x: 0.50, y: 0.50 }
    ];

    // Geometría 3D de la Pirámide (Vértices)
    // Apex superior redondeado y base simétrica
    const V_APEX  = [ 0.00,  1.15,  0.00 ];
    const V_FRONT = [ 0.00, -0.90,  1.05 ];
    const V_LEFT  = [-1.15, -0.90,  0.00 ];
    const V_RIGHT = [ 1.15, -0.90,  0.00 ];
    const V_BACK  = [ 0.00, -0.90, -1.05 ];

    // Vértices 2D del León esculpido (relieve sobre las caras frontales)
    function getPyramidLionPoint(x, y, relief = 0.035) {
      const v = (1.15 - y) / 2.05;
      const zSurface = 1.05 * v - (1.05 / 1.15) * Math.abs(x);
      return [x, y, zSurface + relief];
    }

    // Puntos clave del contorno exterior del león
    const LION_CONTOUR_RAW = [
      [ 0.000, -0.300], // 0: V-center frente
      [-0.080, -0.070], // 1: Oreja interior L
      [-0.210, -0.070], // 2: Oreja pico L
      [-0.340, -0.250], // 3: Oreja caída exterior L
      [-0.310, -0.330], // 4: Sien interior L
      [-0.340, -0.420], // 5: Pómulo exterior L
      [-0.240, -0.580], // 6: Mandíbula media L
      [-0.160, -0.740], // 7: Mandíbula baja L
      [-0.080, -0.900], // 8: Base barbilla L
      [ 0.000, -0.900], // 9: Punta barbilla
      [ 0.080, -0.900], // 10: Base barbilla R
      [ 0.160, -0.740], // 11: Mandíbula baja R
      [ 0.240, -0.580], // 12: Mandíbula media R
      [ 0.340, -0.420], // 13: Pómulo exterior R
      [ 0.310, -0.330], // 14: Sien interior R
      [ 0.340, -0.250], // 15: Oreja caída exterior R
      [ 0.210, -0.070], // 16: Oreja pico R
      [ 0.080, -0.070]  // 17: Oreja interior R
    ];

    // Ojos (calados en relieve negativo)
    const EYE_L_RAW = [
      [-0.250, -0.420],
      [-0.110, -0.520],
      [-0.180, -0.480]
    ];
    const EYE_R_RAW = [
      [ 0.250, -0.420],
      [ 0.110, -0.520],
      [ 0.180, -0.480]
    ];

    // Nariz triangular calada
    const NOSE_RAW = [
      [-0.070, -0.630],
      [ 0.070, -0.630],
      [ 0.000, -0.730]
    ];

    // Facetas internas del rostro del león
    const BROW_CENTER_RAW = [0.000, -0.520];

    // Convertir a vértices 3D sobre la superficie piramidal
    const LION_CONTOUR_3D = LION_CONTOUR_RAW.map(p => getPyramidLionPoint(p[0], p[1], 0.035));
    const EYE_L_3D = EYE_L_RAW.map(p => getPyramidLionPoint(p[0], p[1], 0.040));
    const EYE_R_3D = EYE_R_RAW.map(p => getPyramidLionPoint(p[0], p[1], 0.040));
    const NOSE_3D = NOSE_RAW.map(p => getPyramidLionPoint(p[0], p[1], 0.042));
    const BROW_CENTER_3D = getPyramidLionPoint(BROW_CENTER_RAW[0], BROW_CENTER_RAW[1], 0.040);

    // Responsive Canvas Sizing
    let width = 0;
    let height = 0;
    let dpr = 1;

    function handleResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    // Funciones de Interpolación
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

      if (!prefersReducedMotion) {
        timer += deltaTime;
      }

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

      // Respiración idle suave para que la pirámide mantenga ángulo frontal visible
      const idleSpin = prefersReducedMotion ? 0 : Math.sin(timer * 0.85) * 0.16;
      const idleTilt = prefersReducedMotion ? 0 : Math.cos(timer * 0.65) * 0.05;

      const spin = lerp(currentKeyframe.sp, nextKeyframe.sp, factor) + idleSpin;
      const tilt = lerp(currentKeyframe.tilt, nextKeyframe.tilt, factor) + idleTilt;
      let targetX = lerp(currentKeyframe.x, nextKeyframe.x, factor);
      let targetY = lerp(currentKeyframe.y, nextKeyframe.y, factor);
      let targetSz = lerp(currentKeyframe.sz, nextKeyframe.sz, factor);

      if (isMobile) {
        targetX = 0.5;
        targetY = 0.25;
        targetSz = 0.36;
      }

      const scale = targetSz * Math.min(width, height);
      const centerX = targetX * width;
      const centerY = targetY * height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Halo radial ambiental (Núcleo azul cobalto + destello carmesí profundo)
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 1.6);
      radialGlow.addColorStop(0, "rgba(24, 110, 245, 0.26)");
      radialGlow.addColorStop(0.45, "rgba(227, 19, 27, 0.12)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Transformación 3D (Rotación Euler + Proyección con perspectiva)
      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      function transformPoint(pt) {
        // Rotación en Y (Spin)
        const xRot = pt[0] * cosSpin + pt[2] * sinSpin;
        let zRot = -pt[0] * sinSpin + pt[2] * cosSpin;

        // Rotación en X (Tilt)
        const yRot = pt[1] * cosTilt - zRot * sinTilt;
        zRot = pt[1] * sinTilt + zRot * cosTilt;

        // Proyección con perspectiva
        const perspective = 1 / (1 + zRot * 0.14);
        return [
          centerX + xRot * scale * 0.50 * perspective,
          centerY - yRot * scale * 0.50 * perspective,
          zRot
        ];
      }

      // Proyectar vértices principales de la Pirámide
      const pApex  = transformPoint(V_APEX);
      const pFront = transformPoint(V_FRONT);
      const pLeft  = transformPoint(V_LEFT);
      const pRight = transformPoint(V_RIGHT);
      const pBack  = transformPoint(V_BACK);

      // Proyectar geometría del León
      const pLionContour = LION_CONTOUR_3D.map(transformPoint);
      const pEyeL = EYE_L_3D.map(transformPoint);
      const pEyeR = EYE_R_3D.map(transformPoint);
      const pNose = NOSE_3D.map(transformPoint);
      const pBrow = transformPoint(BROW_CENTER_3D);

      // Definición de Caras de la Pirámide
      const faces = [
        {
          id: 'front-left',
          pts: [pApex, pLeft, pFront],
          colorTop: '#3b9eff',
          colorMid: '#1e84fc',
          colorBot: '#0f61d5',
          wireColor: 'rgba(90, 180, 255, 0.95)'
        },
        {
          id: 'front-right',
          pts: [pApex, pFront, pRight],
          colorTop: '#1b74eb',
          colorMid: '#0d57c6',
          colorBot: '#073ea4',
          wireColor: 'rgba(55, 140, 245, 0.90)'
        },
        {
          id: 'back-right',
          pts: [pApex, pRight, pBack],
          colorTop: 'rgba(10, 45, 130, 0.45)',
          colorMid: 'rgba(6, 30, 95, 0.45)',
          colorBot: 'rgba(3, 20, 70, 0.45)',
          wireColor: 'rgba(35, 80, 190, 0.35)'
        },
        {
          id: 'back-left',
          pts: [pApex, pBack, pLeft],
          colorTop: 'rgba(12, 55, 145, 0.50)',
          colorMid: 'rgba(8, 38, 110, 0.50)',
          colorBot: 'rgba(4, 25, 80, 0.50)',
          wireColor: 'rgba(40, 95, 210, 0.35)'
        },
        {
          id: 'base',
          pts: [pFront, pLeft, pBack, pRight],
          colorTop: 'rgba(5, 20, 60, 0.55)',
          colorMid: 'rgba(3, 15, 50, 0.55)',
          colorBot: 'rgba(2, 10, 40, 0.55)',
          wireColor: 'rgba(30, 70, 180, 0.30)'
        }
      ];

      // Calcular normal en pantalla (2D cross product) y profundidad promedio
      faces.forEach(f => {
        const p0 = f.pts[0];
        const p1 = f.pts[1];
        const p2 = f.pts[2];
        const crossZ = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
        f.isVisible = crossZ > 0;
        f.avgZ = f.pts.reduce((acc, p) => acc + p[2], 0) / f.pts.length;
      });

      // Ordenar caras por profundidad (Z-Sorting) para que las traseras se pinten primero
      faces.sort((a, b) => b.avgZ - a.avgZ);

      // 1. Dibujar Caras de la Pirámide
      faces.forEach(f => {
        ctx.beginPath();
        ctx.moveTo(f.pts[0][0], f.pts[0][1]);
        for (let i = 1; i < f.pts.length; i++) {
          ctx.lineTo(f.pts[i][0], f.pts[i][1]);
        }
        ctx.closePath();

        if (f.id === 'front-left' || f.id === 'front-right') {
          // Degradado volumétrico realista como la imagen de referencia
          const grad = ctx.createLinearGradient(pApex[0], pApex[1], f.pts[1][0], f.pts[1][1]);
          grad.addColorStop(0, f.colorTop);
          grad.addColorStop(0.5, f.colorMid);
          grad.addColorStop(1, f.colorBot);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Caras posteriores traslúcidas que dan cuerpo y volumen 3D
          ctx.fillStyle = f.colorMid;
          ctx.fill();
        }

        // Aristas finas de la cara
        ctx.strokeStyle = f.wireColor;
        ctx.lineWidth = f.isVisible ? 1.4 : 0.8;
        ctx.stroke();
      });

      // 2. Dibujar el Emblema del LEÓN GEOMÉTRICO sobre la cara frontal
      // Silueta blanca luminosa del león
      const lionAvgZ = pLionContour.reduce((acc, p) => acc + p[2], 0) / pLionContour.length;
      const isLionFacingCamera = lionAvgZ > -0.2;

      if (isLionFacingCamera) {
        // Relleno blanco esculpido del rostro
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pLionContour[0][0], pLionContour[0][1]);
        for (let i = 1; i < pLionContour.length; i++) {
          ctx.lineTo(pLionContour[i][0], pLionContour[i][1]);
        }
        ctx.closePath();

        // Relleno blanco facetado con ligera variación de luz entre lado izquierdo y derecho
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.fill();

        // Borde blanco nítido
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.restore();

        // Calado de los Ojos (negativos en azul profundo)
        function drawEye(pts) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          ctx.lineTo(pts[1][0], pts[1][1]);
          ctx.lineTo(pts[2][0], pts[2][1]);
          ctx.closePath();
          ctx.fillStyle = "#0c46b3";
          ctx.fill();
          ctx.strokeStyle = "#082d77";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
        drawEye(pEyeL);
        drawEye(pEyeR);

        // Calado de la Nariz (triángulo invertido en azul profundo)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pNose[0][0], pNose[0][1]);
        ctx.lineTo(pNose[1][0], pNose[1][1]);
        ctx.lineTo(pNose[2][0], pNose[2][1]);
        ctx.closePath();
        ctx.fillStyle = "#0a3a99";
        ctx.fill();
        ctx.strokeStyle = "#06276b";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Líneas de Facetas Internas del León (entrecejo y puente de la nariz)
        ctx.save();
        ctx.strokeStyle = "rgba(180, 210, 255, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        // Línea central de la frente a la nariz
        ctx.moveTo(pLionContour[0][0], pLionContour[0][1]);
        ctx.lineTo(pBrow[0], pBrow[1]);
        ctx.lineTo(pNose[2][0], pNose[2][1]);
        // Conexión entrecejo a ojos
        ctx.moveTo(pBrow[0], pBrow[1]);
        ctx.lineTo(pEyeL[1][0], pEyeL[1][1]);
        ctx.moveTo(pBrow[0], pBrow[1]);
        ctx.lineTo(pEyeR[1][0], pEyeR[1][1]);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Aristas de Luz Principales de la Pirámide
      // Cresta central frontal (Apex -> Front) con brillo especular intenso
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pApex[0], pApex[1]);
      ctx.lineTo(pFront[0], pFront[1]);
      ctx.strokeStyle = "rgba(175, 225, 255, 0.96)";
      ctx.lineWidth = 3.2;
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();

      // Siluetas laterales frontales
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pApex[0], pApex[1]);
      ctx.lineTo(pLeft[0], pLeft[1]);
      ctx.lineTo(pFront[0], pFront[1]);
      ctx.lineTo(pRight[0], pRight[1]);
      ctx.lineTo(pApex[0], pApex[1]);
      ctx.strokeStyle = "rgba(100, 185, 255, 0.90)";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // 4. Vértice Apex Redondeado y Luminoso (Cúspide de la pirámide)
      ctx.save();
      const apexGlow = ctx.createRadialGradient(pApex[0], pApex[1], 0, pApex[0], pApex[1], 10);
      apexGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
      apexGlow.addColorStop(0.4, "rgba(147, 197, 253, 0.9)");
      apexGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = apexGlow;
      ctx.beginPath();
      ctx.arc(pApex[0], pApex[1], 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Vértices de las esquinas de la base
      [pFront, pLeft, pRight].forEach(pt => {
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
