/**
 * Hero 3D Canvas: Scroll-driven icosahedron wireframe animation
 */

export function initHero3D() {
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

  // 12 Vertices of an Icosahedron based on Golden Ratio PHI
  const PHI = 1.618;
  const VERTICES = [
    [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
    [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -PHI], [-PHI, 0, -PHI]
  ];

  // Calculate 30 Edges between vertices of distance ≈ 2
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

  // Math Helper Functions
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

    if (!prefersReducedMotion) {
      timer += deltaTime;
    }

    // Calculate scroll progress through hero section
    const heroRect = hero.getBoundingClientRect();
    const scrollableDist = Math.max(1, hero.offsetHeight - height);
    const rawProgress = clamp(-heroRect.top / scrollableDist);
    progress += (rawProgress - progress) * (1 - Math.exp(-deltaTime * 9));

    const isMobile = width < 860;
    const t = progress * (NUM_SCENES - 1);
    const index = Math.min(Math.floor(t), NUM_SCENES - 2);
    const localProgress = clamp(t - index);
    const factor = easeInOutCubic(localProgress);

    const currentKeyframe = KEYFRAMES[index];
    const nextKeyframe = KEYFRAMES[index + 1];

    const spin = lerp(currentKeyframe.sp, nextKeyframe.sp, factor) + timer * 0.25;
    const tilt = lerp(currentKeyframe.tilt, nextKeyframe.tilt, factor);
    let targetX = lerp(currentKeyframe.x, nextKeyframe.x, factor);
    let targetY = lerp(currentKeyframe.y, nextKeyframe.y, factor);
    let targetSz = lerp(currentKeyframe.sz, nextKeyframe.sz, factor);

    if (isMobile) {
      if ((index === 0 && factor > 0.4) || index === 1) {
        targetX = 0.5;
        targetY = 0.24;
        targetSz = 0.20;
      }
    }

    const scale = targetSz * Math.min(width, height);
    const centerX = targetX * width;
    const centerY = targetY * height;

    // Reset transform & clear
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Dynamic radial background glow behind the 3D shape
    const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 1.8);
    radialGlow.addColorStop(0, "rgba(227, 19, 27, 0.28)");
    radialGlow.addColorStop(1, "rgba(227, 19, 27, 0)");
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

      const perspective = 1 / (1 + zRotated * 0.12);
      return [
        centerX + xRotated * scale * 0.5 * perspective,
        centerY - yRotated * scale * 0.5 * perspective,
        zRotated
      ];
    });

    // Draw Edges (Lines) with depth lighting
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

    // Draw Vertices (Points)
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
