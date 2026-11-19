"use strict";

/* ---------- DATOS ---------- */
const PROJECTS = [
  {
    n: "Dgonzalez",
    t: "Dgonzalezeventos",
    k: "portrait",
    ink: "light",
    d: "Artist site with a live set player.",
  },
  {
    n: "alpha project",
    t: "Alpha Project",
    k: "ice",
    ink: "dark",
    d: "See through complexity. Find what matters.",
  },
  {
    n: "tacoma forests",
    t: "Tacoma Forests",
    k: "forest",
    ink: "light",
    d: "Every layer tells a story.",
  },
  {
    n: "lunar",
    t: "Lunar",
    k: "moon",
    ink: "light",
    d: "An orbit-driven lunar calendar.",
  },
  {
    n: "nyblo one",
    t: "NYBLO ONE",
    k: "device",
    ink: "light",
    d: "Product launch for a radiant device.",
  },
  {
    n: "ostrel",
    t: "OSTREL",
    k: "led",
    ink: "light",
    d: "Pixel-LED typography on mobile.",
  },
  {
    n: "easycity",
    t: "easycity",
    k: "g",
    c: ["#ff9a8b", "#6a11cb"],
    ink: "light",
    d: "Urban mobility, simplified.",
  },
  {
    n: "portale",
    t: "Portale",
    k: "g",
    c: ["#00c9a7", "#0b3d5c"],
    ink: "light",
    d: "A gateway to digital art.",
  },
  {
    n: "tomorrowgo",
    t: "TomorrowGo",
    k: "g",
    c: ["#f7971e", "#ffd200"],
    ink: "dark",
    d: "Travel booking for the future.",
  },
  {
    n: "tucard",
    t: "tucard",
    k: "g",
    c: ["#8e2de2", "#4a00e0"],
    ink: "light",
    d: "Digital business cards.",
  },
  {
    n: "metal piece",
    t: "Metal Piece",
    k: "g",
    c: ["#bdc3c7", "#2c3e50"],
    ink: "dark",
    d: "Industrial design showcase.",
  },
  {
    n: "hand agate",
    t: "Hand Agate",
    k: "g",
    c: ["#fbc2eb", "#a6c1ee"],
    ink: "dark",
    d: "Minerals, handcrafted.",
  },
  {
    n: "wild gallery",
    t: "Wild Gallery",
    k: "g",
    c: ["#56ab2f", "#a8e063"],
    ink: "dark",
    d: "Wildlife photography archive.",
  },
  {
    n: "chesit pro",
    t: "Chesit Pro",
    k: "g",
    c: ["#232526", "#6b6b6b"],
    ink: "light",
    d: "Chess training platform.",
  },
  {
    n: "dot card",
    t: "Dot Card",
    k: "g",
    c: ["#ee0979", "#ff6a00"],
    ink: "light",
    d: "Dot-matrix loyalty cards.",
  },
  {
    n: "kernel code",
    t: "Kernel Code",
    k: "g",
    c: ["#0f2027", "#2c5364"],
    ink: "light",
    d: "A developer bootcamp.",
  },
  {
    n: "moontime",
    t: "Moontime",
    k: "g",
    c: ["#2b5876", "#4e4376"],
    ink: "light",
    d: "Sleep rituals and tracking.",
  },
  {
    n: "planets",
    t: "Planets",
    k: "g",
    c: ["#fc4a1a", "#f7b733"],
    ink: "light",
    d: "An interactive solar atlas.",
  },
  {
    n: "drift school",
    t: "Drift School",
    k: "g",
    c: ["#434343", "#000000"],
    ink: "light",
    d: "Learn to drift, safely.",
  },
  {
    n: "mirror",
    t: "Mirror",
    k: "g",
    c: ["#c9d6ff", "#e2e2e2"],
    ink: "dark",
    d: "Reflective studio identity.",
  },
  {
    n: "orbital",
    t: "Orbital",
    k: "g",
    c: ["#1d2b64", "#f8cdda"],
    ink: "light",
    d: "Satellite data dashboard.",
  },
  {
    n: "circular cup",
    t: "Circular Cup",
    k: "g",
    c: ["#11998e", "#38ef7d"],
    ink: "dark",
    d: "Reusable cup subscription.",
  },
  {
    n: "deport",
    t: "Deport",
    k: "g",
    c: ["#2193b0", "#6dd5ed"],
    ink: "dark",
    d: "Sports club community.",
  },
];
/* Orden del índice (página izquierda) */
const INDEX_ORDER = [
  "dgonzalezeventos",

];
const TOTAL_PAGES = PROJECTS.length + 1; // página 0 = Contents
const LAST_SPREAD = TOTAL_PAGES / 2 - 1;

const $ = (s) => document.querySelector(s);
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DUR = RM ? 30 : 1100;
const sleep = (ms) => new Promise((r) => setTimeout(r, RM ? 0 : ms));

/* ---------- ARTE (canvas procedural: placeholders de capturas) ---------- */
const AW = 600,
  AH = 780;
const artCache = new Map();
const SERIF = "italic 400 {s}px 'Instrument Serif', Georgia, serif";
function wrap(ctx, text, x, y, maxW, lh) {
  const lines = [];
  let line = "";
  text.split(" ").forEach((w) => {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = t;
  });
  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
  return lines.length;
}
function lin(ctx, a, b, ang = 135) {
  const r = (ang * Math.PI) / 180,
    g = ctx.createLinearGradient(
      AW / 2 - (Math.cos(r) * AW) / 2,
      AH / 2 - (Math.sin(r) * AH) / 2,
      AW / 2 + (Math.cos(r) * AW) / 2,
      AH / 2 + (Math.sin(r) * AH) / 2,
    );
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  return g;
}
function drawArt(ctx, p, idx) {
  const f = (s) => SERIF.replace("{s}", s);
  ctx.textBaseline = "alphabetic";
  switch (p.k) {
    case "portrait": {
      ctx.fillStyle = lin(ctx, "#ff8a2a", "#c71f16", 120);
      ctx.fillRect(0, 0, AW, AH);
      ctx.fillStyle = "rgba(255,225,150,.35)";
      ctx.beginPath();
      ctx.arc(300, 320, 220, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#1b0a07";
      ctx.beginPath();
      ctx.ellipse(300, 700, 240, 190, 0, 0, 7);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(300, 370, 95, 120, 0, 0, 7);
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(300, 360, 120, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = "#ffb36b";
      ctx.fillRect(168, 350, 34, 70);
      ctx.fillRect(398, 350, 34, 70);
      ctx.fillStyle = "#fff";
      ctx.font = f(104);
      ctx.fillText("Dgonzalez", 40, 640);
      ctx.fillText("eventos", 40, 735);
      break;
    }
    case "ice": {
      ctx.fillStyle = lin(ctx, "#e6f4ff", "#8fc0ea", 100);
      ctx.fillRect(0, 0, AW, AH);
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.translate(120 + i * 70, 470 + (i % 2) * 40);
        ctx.rotate(0.35 + i * 0.18);
        ctx.fillStyle = `rgba(255,255,255,${0.16 + i * 0.05})`;
        ctx.strokeStyle = "rgba(255,255,255,.8)";
        ctx.lineWidth = 2;
        ctx.fillRect(-70, -90, 140, 200);
        ctx.strokeRect(-70, -90, 140, 200);
        ctx.restore();
      }
      ctx.fillStyle = "#0b2447";
      ctx.font = f(70);
      wrap(ctx, "See through complexity. Find what matters.", 40, 150, 500, 72);
      ctx.font = "700 22px Manrope, sans-serif";
      ctx.fillText("ALPHA PROJECT", 40, 60);
      break;
    }
    case "forest": {
      ctx.fillStyle = lin(ctx, "#4b9be6", "#d3ebff", 90);
      ctx.fillRect(0, 0, AW, AH);
      ctx.fillStyle = "rgba(255,255,255,.8)";
      [
        [120, 300, 90, 28],
        [460, 240, 100, 30],
        [380, 360, 70, 22],
      ].forEach((c) => {
        ctx.beginPath();
        ctx.ellipse(c[0], c[1], c[2], c[3], 0, 0, 7);
        ctx.fill();
      });
      const g = ctx.createLinearGradient(190, 0, 410, 0);
      g.addColorStop(0, "#3a2418");
      g.addColorStop(0.5, "#6b4a30");
      g.addColorStop(1, "#2a190f");
      ctx.fillStyle = g;
      ctx.fillRect(190, 260, 220, AH);
      let s = 7;
      const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `hsl(${95 + rnd() * 30},${45 + rnd() * 25}%,${25 + rnd() * 25}%)`;
        ctx.beginPath();
        ctx.ellipse(
          180 + rnd() * 240,
          270 + rnd() * 500,
          10 + rnd() * 26,
          8 + rnd() * 18,
          0,
          0,
          7,
        );
        ctx.fill();
      }
      ctx.fillStyle = "#fff";
      ctx.font = f(88);
      ctx.fillText("Every layer", 40, 130);
      ctx.fillText("tells a story.", 40, 215);
      break;
    }
    case "moon": {
      ctx.fillStyle = lin(ctx, "#080c2a", "#2c3f86", 100);
      ctx.fillRect(0, 0, AW, AH);
      for (let i = 0; i < 90; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(Math.sin(i * 3.1)) * 0.9})`;
        ctx.fillRect((i * 137) % AW, (i * 89) % AH, 2, 2);
      }
      const g = ctx.createRadialGradient(260, 300, 20, 300, 350, 190);
      g.addColorStop(0, "#fff8e6");
      g.addColorStop(1, "#a9b2d6");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(300, 350, 180, 0, 7);
      ctx.fill();
      ctx.fillStyle = "rgba(80,90,140,.25)";
      [
        [250, 300, 34],
        [350, 400, 46],
        [320, 290, 18],
        [240, 420, 22],
      ].forEach((c) => {
        ctx.beginPath();
        ctx.arc(c[0], c[1], c[2], 0, 7);
        ctx.fill();
      });
      ctx.fillStyle = "#fff";
      ctx.font = f(130);
      ctx.fillText("Lunar", 40, 720);
      break;
    }
    case "device": {
      ctx.fillStyle = "#ff6a00";
      ctx.fillRect(0, 0, AW, AH);
      for (let i = 0; i < 28; i++) {
        ctx.fillStyle =
          i % 2 ? "rgba(255,230,160,.22)" : "rgba(255,255,255,.04)";
        ctx.beginPath();
        ctx.moveTo(300, 360);
        const a = (i / 28) * Math.PI * 2;
        ctx.lineTo(300 + Math.cos(a) * 900, 360 + Math.sin(a) * 900);
        ctx.lineTo(
          300 + Math.cos(a + 0.11) * 900,
          360 + Math.sin(a + 0.11) * 900,
        );
        ctx.fill();
      }
      const g = ctx.createRadialGradient(300, 360, 10, 300, 360, 300);
      g.addColorStop(0, "rgba(255,240,180,.9)");
      g.addColorStop(1, "rgba(255,120,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, AW, AH);
      ctx.fillStyle = lin(ctx, "#ff9a3c", "#c93b00", 90);
      ctx.beginPath();
      ctx.roundRect(190, 180, 220, 360, 40);
      ctx.fill();
      ctx.fillStyle = "#2a0f00";
      ctx.beginPath();
      ctx.arc(300, 330, 64, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#ffd08a";
      ctx.beginPath();
      ctx.arc(300, 330, 22, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "800 76px Manrope, sans-serif";
      ctx.fillText("NYBLO ONE", 40, 700);
      break;
    }
    case "led": {
      ctx.fillStyle = lin(ctx, "#0a0a0a", "#1d1d26", 100);
      ctx.fillRect(0, 0, AW, AH);
      ctx.fillStyle = "#101012";
      ctx.strokeStyle = "#3a3a44";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(140, 90, 320, 600, 40);
      ctx.fill();
      ctx.stroke();
      const o = document.createElement("canvas");
      o.width = 40;
      o.height = 12;
      const c = o.getContext("2d");
      c.fillStyle = "#fff";
      c.font = "bold 11px monospace";
      c.textBaseline = "middle";
      c.fillText("OSTREL", 1, 6);
      const d = c.getImageData(0, 0, 40, 12).data;
      for (let y = 0; y < 12; y++)
        for (let x = 0; x < 40; x++) {
          const on = d[(y * 40 + x) * 4 + 3] > 110;
          ctx.fillStyle = on ? "#ff3d7f" : "rgba(255,255,255,.07)";
          ctx.beginPath();
          ctx.arc(166 + x * 7, 330 + y * 8, 2.6, 0, 7);
          ctx.fill();
        }
      ctx.fillStyle = "#ff3d7f";
      ctx.font = "700 22px Manrope, sans-serif";
      ctx.fillText("OSTREL", 40, 740);
      break;
    }
    default: {
      ctx.fillStyle = lin(ctx, p.c[0], p.c[1], 120);
      ctx.fillRect(0, 0, AW, AH);
      const v = idx % 4;
      ctx.fillStyle = "rgba(255,255,255,.2)";
      if (v === 0)
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(300, 330, 60 + i * 50, 0, 7);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(255,255,255,.35)";
          ctx.stroke();
        }
      if (v === 1)
        for (let i = 0; i < 7; i++)
          ctx.fillRect(60 + i * 72, 560 - i * 60, 50, 60 + i * 60);
      if (v === 2)
        for (let y = 0; y < 8; y++)
          for (let x = 0; x < 8; x++) {
            ctx.beginPath();
            ctx.arc(110 + x * 55, 140 + y * 48, 6 + ((x + y) % 4) * 2, 0, 7);
            ctx.fill();
          }
      if (v === 3) {
        ctx.save();
        ctx.translate(300, 330);
        ctx.rotate(0.5);
        ctx.fillRect(-120, -120, 240, 240);
        ctx.fillStyle = "rgba(0,0,0,.18)";
        ctx.fillRect(-70, -70, 240, 240);
        ctx.restore();
      }
      ctx.fillStyle = p.ink === "dark" ? "#0c1730" : "#fff";
      ctx.font = f(104);
      wrap(ctx, p.t, 40, 650, 520, 100);
    }
  }
}
function artCanvas(idx) {
  if (!artCache.has(idx)) {
    const c = document.createElement("canvas");
    c.width = AW;
    c.height = AH;
    drawArt(c.getContext("2d"), PROJECTS[idx - 1], idx - 1);
    artCache.set(idx, c);
  }
  return artCache.get(idx);
}

/* ---------- PÁGINAS ---------- */
const LOGO_SVG = '<img src="img/logo-blaco.png" alt="quillon logo">';
function makePage(i, anim) {
  const el = document.createElement("div");
  el.className = "pg-inner" + (anim ? " anim" : "");
  if (i === 0) {
    const names = INDEX_ORDER,
      half = Math.ceil(names.length / 2);
    const col = (arr) =>
      "<ul>" +
      arr
        .map(
          (n) =>
            `<li><button data-page="${PROJECTS.findIndex((p) => p.n === n) + 1}">${n}</button></li>`,
        )
        .join("") +
      "</ul>";
    el.innerHTML = `<div class="contents"><div class="brand"><span class="logo-mark">${LOGO_SVG}</span></div><h2>Contents</h2><div class="cols">${col(names.slice(0, half))}${col(names.slice(half))}</div></div>`;
    return el;
  }
  const p = PROJECTS[i - 1];
  el.innerHTML = `<div class="work ${p.ink}" style="position:absolute;inset:0" aria-label="${p.t}">
    <div class="art"><canvas width="${AW}" height="${AH}"></canvas></div>
    <div class="mock-nav"><b>${p.n}</b><span><i>Work</i><i>About</i><i>Contact</i></span></div>
    <div class="work-copy"><p>${p.d}</p><span class="cta"><i>Visit ↗</i></span></div>
    <span class="pnum">${String(i).padStart(2, "0")}</span></div>`;
  el.querySelector("canvas").getContext("2d").drawImage(artCanvas(i), 0, 0);
  return el;
}
const setPage = (host, i, anim = true) =>
  host.replaceChildren(makePage(i, anim));

/* ---------- TRANSICIÓN PIXELADA ---------- */
async function pixelRun(host, from, to, swap) {
  if (RM || from === 0 || to === 0) {
    if (swap) swap();
    return;
  }
  const ov = document.createElement("div");
  ov.className = "px-ov";
  const cv = document.createElement("canvas");
  cv.width = host.clientWidth;
  cv.height = host.clientHeight;
  const num = document.createElement("div");
  num.className = "px-num";
  ov.append(cv, num);
  host.append(ov);
  const ctx = cv.getContext("2d"),
    sm = document.createElement("canvas");
  const steps = (
    from !== null
      ? [
          [64, from],
          [32, from],
          [16, from],
          [8, from],
          [4, from],
        ]
      : []
  ).concat([
    [4, to],
    [8, to],
    [16, to],
    [32, to],
    [64, to],
  ]);
  let swapped = from === null;
  for (let s = 0; s < steps.length; s++) {
    const [r, idx] = steps[s];
    if (!swapped && idx === to) {
      swap && swap();
      swapped = true;
      host.append(ov);
    }
    sm.width = r;
    sm.height = Math.round((r * AH) / AW);
    sm.getContext("2d").drawImage(artCanvas(idx), 0, 0, sm.width, sm.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sm, 0, 0, cv.width, cv.height);
    num.textContent = Math.round((86 * (s + 1)) / steps.length);
    await sleep(75);
  }
  ov.remove();
}

/* ---------- MÁQUINA DE ESTADOS ---------- */
const book = $("#book"),
  cover = $("#cover"),
  leaf = $("#leaf"),
  pgL = $("#pgL"),
  pgR = $("#pgR");
const mq = matchMedia("(max-width:760px)");
let state = "closed",
  k = 0,
  m = 1,
  single = mq.matches;
const setState = (s) => {
  state = s;
  document.body.dataset.state = s;
};
const pad = (n) => String(n).padStart(2, "0");

function updatePager() {
  $("#count").textContent = single
    ? `${pad(m)} / ${pad(TOTAL_PAGES - 1)}`
    : `${pad(k + 1)} / ${pad(LAST_SPREAD + 1)}`;
}
function render() {
  if (single) {
    pgL.replaceChildren();
    setPage(pgR, m, false);
  } else {
    setPage(pgL, 2 * k, false);
    setPage(pgR, 2 * k + 1, false);
  }
  updatePager();
}

async function openBook() {
  if (state !== "closed") return;
  setState("opening");
  single = mq.matches;
  document.body.classList.add("has-book");
  setPage($("#coverBack"), 0, false);
  $("#coverBack").replaceChildren(makePage(0, false));
  k = 0;
  m = 1;
  if (single) setPage(pgR, 1, true);
  else {
    setPage(pgL, 0, false);
    setPage(pgR, 1, true);
  }
  updatePager();
  sc.target = 1.07;
  book.classList.remove("closed");
  cover.classList.add("open");
  await sleep(DUR + 30);
  pgL.classList.remove("noleft");
  cover.hidden = true;
  book.classList.add("ready");
  setState("open");
}
async function closeBook() {
  if (state !== "open") return;
  setState("opening");
  book.classList.remove("ready");
  cover.hidden = false;
  cover.style.transition = "none";
  cover.offsetWidth;
  cover.style.transition = "";
  pgL.classList.add("noleft");
  sc.target = 1;
  book.classList.add("closed");
  cover.classList.remove("open");
  await sleep(DUR + 30);
  document.body.classList.remove("has-book");
  setState("closed");
}

async function flip(dir) {
  setState("flipping");
  const t = "translateZ(2px) rotateY(";
  const lF = $("#leafFront"),
    lB = $("#leafBack");
  let front, back, reveal, revealIdx;
  if (dir > 0) {
    front = makePage(2 * k + 1, false);
    back = makePage(2 * k + 2, false);
    setPage(pgR, 2 * k + 3, true);
    reveal = pgR;
    revealIdx = 2 * k + 3;
  } else {
    front = makePage(2 * k - 1, false);
    back = makePage(2 * k, false);
    setPage(pgL, 2 * k - 2, true);
    reveal = pgL;
    revealIdx = 2 * k - 2;
  }
  lF.replaceChildren(front);
  lB.replaceChildren(back);
  leaf.style.transition = "none";
  leaf.style.transform = t + (dir > 0 ? "0" : "-180") + "deg)";
  leaf.hidden = false;
  leaf.offsetWidth;
  leaf.style.transition = `transform ${DUR}ms var(--flip-ease)`;
  leaf.classList.add("shade");
  book.classList.add("flipping");
  leaf.style.transform = t + (dir > 0 ? "-180" : "0") + "deg)";
  await sleep(DUR * 0.45);
  pixelRun(reveal, null, revealIdx, null);
  await sleep(DUR * 0.55 + 30);
  if (dir > 0) {
    pgL.replaceChildren(back);
    k++;
  } else {
    pgR.replaceChildren(front);
    k--;
  }
  leaf.hidden = true;
  leaf.classList.remove("shade");
  book.classList.remove("flipping");
  updatePager();
  setState("open");
}

async function gotoSpread(n) {
  if (n === k) return;
  if (Math.abs(n - k) === 1) return flip(n > k ? 1 : -1);
  setState("flipping");
  await Promise.all([
    pixelRun(pgL, 2 * k, 2 * n, () => setPage(pgL, 2 * n, true)),
    pixelRun(pgR, 2 * k + 1, 2 * n + 1, () => setPage(pgR, 2 * n + 1, true)),
  ]);
  k = n;
  updatePager();
  setState("open");
}
async function gotoPage(n) {
  if (n === m || n < 1 || n > TOTAL_PAGES - 1) return;
  setState("flipping");
  const old = m;
  m = n;
  await pixelRun(pgR, old, n, () => setPage(pgR, n, true));
  updatePager();
  setState("open");
}
function goTo(page) {
  if (state !== "open") return;
  closeDrawer();
  single ? gotoPage(page) : gotoSpread(Math.floor(page / 2));
}
function next() {
  if (state !== "open") return;
  if (single) gotoPage(m + 1);
  else if (k < LAST_SPREAD) flip(1);
}
function prev() {
  if (state !== "open") return;
  if (single) {
    m > 1 ? gotoPage(m - 1) : closeBook();
  } else k === 0 ? closeBook() : flip(-1);
}

/* ---------- Panel de índice (móvil) ---------- */
const drawer = $("#drawer");
function openDrawer() {
  $("#drawerBody").replaceChildren(makePage(0, false));
  drawer.classList.add("show");
  drawer.setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  drawer.classList.remove("show");
  drawer.setAttribute("aria-hidden", "true");
}

/* ---------- Eventos ---------- */
cover.addEventListener("click", openBook);
cover.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openBook();
  }
});
$("#edgeR").addEventListener("click", next);
$("#edgeL").addEventListener("click", prev);
$("#next").addEventListener("click", next);
$("#prev").addEventListener("click", prev);
$("#btnContents").addEventListener("click", openDrawer);
$("#drawerClose").addEventListener("click", closeDrawer);
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-page]");
  if (b) goTo(+b.dataset.page);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
  else if (e.key === "Escape") closeDrawer();
});
mq.addEventListener("change", () => {
  if (state === "open") {
    single = mq.matches;
    if (single) m = Math.max(1, Math.min(2 * k + 1, TOTAL_PAGES - 1));
    else k = Math.floor(m / 2);
    render();
  } else single = mq.matches;
});

/* Parallax interno de las páginas de trabajo */
document.addEventListener("mousemove", (e) => {
  const w = e.target.closest && e.target.closest(".work");
  if (!w) return;
  const r = w.getBoundingClientRect(),
    a = w.querySelector(".art");
  a.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5) * 2);
  a.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5) * 2);
});

/* ---------- Parallax global suave (rAF + lerp) ---------- */
const tilt = $("#tilt"),
  props = [...document.querySelectorAll(".prop")],
  scene = $("#scene");
const mouse = { x: 0, y: 0 },
  cur = { x: 0, y: 0 },
  sc = { v: 1, target: 1 };
addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = (e.clientY / innerHeight) * 2 - 1;
});
(function loop() {
  const L = 0.06;
  cur.x += (mouse.x - cur.x) * L;
  cur.y += (mouse.y - cur.y) * L;
  sc.v += (sc.target - sc.v) * 0.07;
  if (!RM) {
    scene.style.setProperty("--lx", 50 + cur.x * 7 + "%");
    scene.style.setProperty("--ly", 48 + cur.y * 6 + "%");
    props.forEach((p) => {
      const d = +p.dataset.depth;
      p.style.transform = `translate(${cur.x * -d}px,${cur.y * -d}px)`;
    });
    tilt.style.transform = `rotateX(${14 - cur.y * 2}deg) rotateY(${cur.x * 3}deg) scale(${sc.v})`;
  } else tilt.style.transform = `rotateX(8deg) scale(${sc.v})`;
  requestAnimationFrame(loop);
})();

/* Primera render: la página 1 vive debajo de la tapa */
(document.fonts && document.fonts.ready
  ? Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 1500)),
    ])
  : Promise.resolve()
).then(() => {
  artCache.clear();
  setPage(pgR, 1, false);
});
setPage(pgR, 1, false);
