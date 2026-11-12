/**
 * Hero Shader Animation — WebGL puro (sin librerías ni CDN)
 * Líneas animadas con la paleta del difuminado del hero:
 * dorado → ámbar → azul real sobre fondo claro.
 * Script clásico: funciona también abriendo el archivo con file:///
 */
(function () {
  var VERT = [
    "attribute vec2 position;",
    "void main() {",
    "  gl_Position = vec4(position, 0.0, 1.0);",
    "}",
  ].join("\n");

  var FRAG = [
    "precision highp float;",
    "uniform vec2 resolution;",
    "uniform float time;",
    "",
    "float lines(vec2 uv, float t, float j) {",
    "  float lineWidth = 0.002;",
    "  float s = 0.0;",
    "  for (int i = 0; i < 5; i++) {",
    "    float fi = float(i);",
    "    s += lineWidth * fi * fi / abs(fract(t - 0.01 * j + fi * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));",
    "  }",
    "  return s;",
    "}",
    "",
    "void main(void) {",
    "  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);",
    "  float t = time * 0.05;",
    "",
    "  float a0 = lines(uv, t, 0.0);",
    "  float a1 = lines(uv, t, 1.0);",
    "  float a2 = lines(uv, t, 2.0);",
    "",
    "  vec3 gold  = vec3(0.949, 0.741, 0.337);",
    "  vec3 amber = vec3(0.949, 0.741, 0.337);",
    "  vec3 blue  = vec3(0.180, 0.294, 0.647);",
    "",
    "  vec3 col = vec3(1.0);",
    "  col = mix(col, gold,  clamp(a0, 0.0, 1.0) * 0.55);",
    "  col = mix(col, amber, clamp(a1, 0.0, 1.0) * 0.45);",
    "  col = mix(col, blue,  clamp(a2, 0.0, 1.0) * 0.55);",
    "",
    "  gl_FragColor = vec4(col, 1.0);",
    "}",
  ].join("\n");

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("Shader error:", gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  function init() {
    var container = document.getElementById("hero-shader");
    if (!container) return;

    var canvas = document.createElement("canvas");
    container.appendChild(canvas);

    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Quad a pantalla completa
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    var loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, "resolution");
    var uTime = gl.getUniformLocation(prog, "time");

    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    function resize() {
      var w = Math.max(1, Math.floor(container.clientWidth * dpr));
      var h = Math.max(1, Math.floor(container.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    var time = 1.0;
    function draw() {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    resize();
    window.addEventListener("resize", function () {
      resize();
      draw();
    });

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      draw();
      return;
    }

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(container);
    }

    (function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      time += 0.05;
      draw();
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
