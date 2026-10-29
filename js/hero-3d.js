/**
 * Hero 3D Canvas: Scroll-driven 3D Blue Pyramid & Lion Emblem
 * Pirámide 3D azul volumétrica con iluminación realista y emblema del león
 */

export function initHero3D() {
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
