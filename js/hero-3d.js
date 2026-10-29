/**
 * Hero 3D Canvas: Scroll-driven 3D Triangle Prism & Lion Emblem
 * Emblema triangular 3D esculpido con león geométrico facetado
 */

export function initHero3D() {
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

  // Math Helper Functions
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

    // Reset transform & clear
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Dynamic dual radial background aura (Electric Blue Core + Crimson Red Corona)
    const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 1.7);
    radialGlow.addColorStop(0, "rgba(43, 80, 237, 0.25)");
    radialGlow.addColorStop(0.55, "rgba(227, 19, 27, 0.16)");
    radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // 3D Rotation Matrix Trigonometry
    const cosSpin = Math.cos(spin);
    const sinSpin = Math.sin(spin);
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    // Project 3D vertices to 2D canvas coordinates
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

    // Sort edges by average depth so back elements are rendered first
    const edgesWithDepth = EDGES.map((edge) => {
      const p1 = projected[edge.p[0]];
      const p2 = projected[edge.p[1]];
      const avgZ = (p1[2] + p2[2]) / 2;
      return { edge, p1, p2, avgZ };
    });
    edgesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

    // Draw sorted 3D Edges
    ctx.lineCap = "round";
    edgesWithDepth.forEach(({ edge, p1, p2, avgZ }) => {
      const isFront = avgZ < 0;

      if (edge.type === 'triangle') {
        // Outer Triangle Prism (Electric Blue glow)
        ctx.strokeStyle = isFront
          ? `rgba(65, 120, 255, ${0.85 + (avgZ < -0.1 ? 0.15 : 0)})`
          : "rgba(35, 75, 195, 0.38)";
        ctx.shadowColor = "#3b5bdb";
        ctx.shadowBlur = isFront ? 14 : 0;
        ctx.lineWidth = isFront ? 2.5 : 1.2;
      } else if (edge.type === 'lion') {
        // Lion Head Wireframe (Luminous Pure White glow)
        ctx.strokeStyle = isFront
          ? `rgba(255, 255, 255, ${0.92 + (avgZ < -0.1 ? 0.08 : 0)})`
          : "rgba(215, 228, 255, 0.32)";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = isFront ? 10 : 0;
        ctx.lineWidth = isFront ? 2.0 : 1.0;
      } else {
        // Depth Struts & Suspension (Subtle Cyan/Blue glow)
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

    // Draw Vertices (Glowing Node Points)
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
