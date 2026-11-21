import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Signature scene — 1,000 small blocks that rearrange into a new formation for every
 * section as the visitor scrolls:
 *   0 graduation cap → 1 open book → 2 double helix → 3 campus building → 4 rising bars → 5 globe
 * Sections opt in with  data-scene="<index>".
 */

const N = 1000;

interface Formation {
  points: Float32Array; // local positions
  size: number; // block size
  pos: [number, number, number]; // group position (wide screens)
  posNarrow: [number, number, number]; // group position (portrait screens)
  rot: [number, number, number];
  sway: number; // slow rotation amount
  scale: number;
  scaleNarrow: number;
  dim: number; // canvas opacity while this formation is shown
  wave?: boolean;
}

// Deterministic pseudo-random so the layout is identical on every visit
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// Shared colour design, filled in by build(): tone 0 (deep) … 1 (light); accent 1 = brand colour
const TONE = new Float32Array(N);
const ACCENT = new Uint8Array(N);

function build(): Formation[] {
  const r = rng(7);

  // 0 — graduation cap (mortarboard, skull cap, tassel)
  const cap = new Float32Array(N * 3);
  {
    let i = 0;
    const put = (x: number, y: number, z: number, tone: number, accent = 0) => {
      cap.set([x, y, z], i * 3);
      TONE[i] = tone;
      ACCENT[i] = accent;
      i++;
    };
    for (let a = 0; a < 20; a++) for (let b = 0; b < 20; b++) put((a - 9.5) * 0.17, 0.55, (b - 9.5) * 0.17, 0.25 + ((a + b) / 38) * 0.75);
    for (let a = 0; a < 14; a++) for (let b = 0; b < 14; b++) put((a - 6.5) * 0.17, 0.4, (b - 6.5) * 0.17, 0.2);
    for (let l = 0; l < 6; l++) for (let k = 0; k < 44; k++) {
      const ang = (k / 44) * Math.PI * 2, rad = 0.98 + l * 0.02;
      put(Math.cos(ang) * rad, 0.26 - l * 0.15, Math.sin(ang) * rad, 0.05 + l * 0.05);
    }
    for (let k = 0; k < 8; k++) put(((k % 2) - 0.5) * 0.12, 0.68 + Math.floor(k / 4) * 0.1, ((Math.floor(k / 2) % 2) - 0.5) * 0.12, 1, 1);
    for (let k = 0; k < 30; k++) put((k / 29) * 1.62, 0.7, (k / 29) * 1.62, 1, 1); // cord across the board
    for (let k = 0; k < 60; k++) put(1.66 + Math.sin(k * 0.15) * 0.02, 0.62 - (k / 59) * 1.25, 1.66, 1, 1); // hanging cord
    for (let k = 0; k < 42; k++) {
      const ang = (k / 14) * Math.PI * 2, rad = 0.05 + Math.floor(k / 14) * 0.045;
      put(1.66 + Math.cos(ang) * rad, -0.68 - (k % 7) * 0.07, 1.66 + Math.sin(ang) * rad, 1, 1); // tuft
    }
  }

  // 1 — open book: two curved pages over a cover
  const book = new Float32Array(N * 3);
  {
    let i = 0;
    const page = (x: number) => 0.52 * Math.sin(Math.PI * Math.min(1, x / 2.6)) * (1 - 0.35 * (x / 2.6));
    for (const side of [-1, 1]) {
      for (let a = 0; a < 20; a++) for (let b = 0; b < 16; b++, i++) {
        const x = 0.1 + a * 0.128;
        book.set([side * x, page(x), (b - 7.5) * 0.19], i * 3);
      }
      for (let a = 0; a < 18; a++) for (let b = 0; b < 10; b++, i++) {
        const x = 0.05 + a * 0.155;
        book.set([side * x, -0.2 - x * 0.03, (b - 4.5) * 0.335], i * 3);
      }
    }
  }

  // 2 — double helix with rungs
  const helix = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const strand = i % 5;
    const t = i / N;
    const a = t * Math.PI * 7;
    const y = (t - 0.5) * 10;
    if (strand < 2) helix.set([Math.cos(a) * 1.05, y, Math.sin(a) * 1.05], i * 3);
    else if (strand < 4) helix.set([Math.cos(a + Math.PI) * 1.05, y, Math.sin(a + Math.PI) * 1.05], i * 3);
    else {
      const ys = Math.round(y / 0.5) * 0.5;
      const ang = (ys / 10 + 0.5) * Math.PI * 7;
      const k = (r() - 0.5) * 2;
      helix.set([Math.cos(ang) * 1.05 * k, ys, Math.sin(ang) * 1.05 * k], i * 3);
    }
  }

  // 3 — campus building: steps, six columns, beam and pediment
  const campus = new Float32Array(N * 3);
  {
    let i = 0;
    const u = 0.2;
    const put = (x: number, y: number, z: number) => campus.set([x, y - 2.6, z], i++ * 3);
    [30, 28, 26].forEach((w, l) => { for (let a = 0; a < w; a++) for (let d = 0; d < 3; d++) put((a - (w - 1) / 2) * u, l * u, (d - 1) * u + (2 - l) * 0.1); });
    for (let col = 0; col < 6; col++) for (let h = 0; h < 14; h++) for (let k = 0; k < 4; k++) put((col - 2.5) * 0.92 + ((k % 2) - 0.5) * u, 0.6 + h * u, (Math.floor(k / 2) - 0.5) * u);
    for (let a = 0; a < 28; a++) for (let k = 0; k < 4; k++) put((a - 13.5) * u, 3.4 + (k % 2) * u, (Math.floor(k / 2) - 0.5) * u);
    [26, 22, 18, 14, 10, 6, 2].forEach((w, l) => { for (let a = 0; a < w; a++) for (let d = 0; d < 3; d++) put((a - (w - 1) / 2) * u, 3.8 + l * u, (d - 1) * u); });
    for (let k = 0; k < 6; k++) put(0, 5.2 + k * u, 0);
  }

  // 4 — rising bars with a trend line
  const bars = new Float32Array(N * 3);
  {
    let i = 0;
    const u = 0.2;
    for (let b = 0; b < 8; b++) {
      const h = 5 + b * 2;
      for (let y = 0; y < h; y++) for (let k = 0; k < 9; k++, i++) bars.set([(b - 3.5) * 0.85 + ((k % 3) - 1) * u, y * u - 1.9, (Math.floor(k / 3) - 1) * u], i * 3);
    }
    for (let k = 0; k < 136; k++, i++) {
      const t = k / 135;
      bars.set([(t - 0.5) * 7.2, -0.6 + t * 3.4 + Math.sin(t * 9) * 0.12, 0.9], i * 3);
    }
  }

  // 5 — sphere (Fibonacci distribution)
  const sphere = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    sphere.set([Math.cos(th) * rad * 2, y * 2, Math.sin(th) * rad * 2], i * 3);
  }

  // a few scattered accents so every formation carries the brand colour
  for (let i = 0; i < N; i++) if (!ACCENT[i]) { const a = r(); ACCENT[i] = a < 0.04 ? 1 : a < 0.055 ? 2 : 0; }

  return [
    { points: cap, size: 0.15, pos: [3.2, 0.1, 0], posNarrow: [0, -2.7, 0], rot: [0.42, 0.5, 0.1], sway: 0.5, scale: 0.92, scaleNarrow: 0.6, dim: 1 },
    { points: book, size: 0.12, pos: [0, -3.1, -2], posNarrow: [0, -4, -5], rot: [0.85, 0, 0], sway: 0.1, scale: 1.55, scaleNarrow: 1, dim: 0.7 },
    { points: helix, size: 0.11, pos: [5.2, 0, -1], posNarrow: [1.6, 0, -6], rot: [0, 0, 0.35], sway: 1.2, scale: 1, scaleNarrow: 0.8, dim: 0.75 },
    { points: campus, size: 0.17, pos: [0, -1.2, -9], posNarrow: [0, -2, -14], rot: [0.05, 0.3, 0], sway: 0.18, scale: 1.5, scaleNarrow: 1, dim: 0.5 },
    { points: bars, size: 0.17, pos: [4.6, -0.6, -2], posNarrow: [0.5, -1, -8], rot: [0.1, -0.5, 0], sway: 0.35, scale: 1, scaleNarrow: 0.8, dim: 0.7 },
    { points: sphere, size: 0.12, pos: [3.5, 0, 0], posNarrow: [0, -2.3, 0], rot: [0.2, 0, 0], sway: 1.4, scale: 1, scaleNarrow: 0.58, dim: 1 },
  ];
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export function mountHomeScene(canvas: HTMLCanvasElement, opts: { reducedMotion?: boolean; fadeOnScroll?: boolean } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  const fog = new THREE.Fog(0xffffff, 11, 26);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  const formations = build();
  const rand = rng(99);

  // Blocks
  const material = new THREE.MeshStandardMaterial({ metalness: 0.85, roughness: 0.28 });
  const mesh = new THREE.InstancedMesh(new RoundedBoxGeometry(1, 1, 1, 2, 0.14), material, N);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  // Per-block constants
  const delay = new Float32Array(N);
  const drift = new Float32Array(N * 3);
  const axis: THREE.Vector3[] = [];
  const accent = new Uint8Array(N);
  const tone = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    delay[i] = rand() * 0.4;
    drift.set([(rand() - 0.5) * 5, (rand() - 0.5) * 5, (rand() - 0.5) * 5], i * 3);
    axis.push(new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize());
    tone[i] = TONE[i]!;
    accent[i] = ACCENT[i]!;
  }

  // Fine dust
  const dustCount = window.innerWidth < 720 ? 220 : 500;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) dustPos.set([(rand() - 0.5) * 30, (rand() - 0.5) * 16, -8 + rand() * 14], i * 3);
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ size: 0.03, transparent: true, opacity: 0.6 });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // Light
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(-4, 6, 6);
  const warm = new THREE.PointLight(0xf36b3f, 60, 22);
  warm.position.set(5, -2, 5);
  const cool = new THREE.PointLight(0x8a7bff, 0, 22);
  cool.position.set(-6, 3, 2);
  scene.add(key, warm, cool);

  const color = new THREE.Color();
  const c1 = new THREE.Color(), c2 = new THREE.Color(), c3 = new THREE.Color();
  const applyTheme = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    const brand = dark ? 0xff794d : 0xf36b3f;
    // Light theme: graphite → slate → pearl. Dark theme: deep steel → silver.
    const lo = c1.setHex(dark ? 0x2a3160 : 0x161b45);
    const mid = c2.setHex(dark ? 0x7f8bd0 : 0x4a57a8);
    const hi = c3.setHex(dark ? 0xe6e9fb : 0xe3e7f8);
    for (let i = 0; i < N; i++) {
      if (accent[i] === 1) color.setHex(brand);
      else if (accent[i] === 2) color.setHex(dark ? 0x8a7bff : 0xffffff);
      else {
        const t = tone[i]!;
        if (t < 0.5) color.copy(lo).lerp(mid, t * 2);
        else color.copy(mid).lerp(hi, Math.min(1, (t - 0.5) * 2));
      }
      mesh.setColorAt(i, color);
    }
    material.metalness = dark ? 0.85 : 0.55;
    material.roughness = dark ? 0.28 : 0.32;
    mesh.instanceColor!.needsUpdate = true;
    fog.color.setHex(dark ? 0x0a0d1c : 0xf6f7fc);
    dustMat.color.setHex(dark ? 0xa7b0c0 : 0x8a93a3);
    scene.environmentIntensity = dark ? 0.5 : 0.9;
    renderer.toneMappingExposure = dark ? 1.2 : 1;
    cool.intensity = dark ? 40 : 0;
    warm.color.setHex(brand);
    dirty = true;
  };

  let narrow = false;
  let dirty = true;
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = camera.aspect < 1;
    dirty = true;
  };

  // Scroll → formation index (fractional while travelling between sections)
  let sections: HTMLElement[] = [];
  const collect = () => (sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")));
  const readProgress = () => {
    if (!sections.length) return 0;
    const vc = window.innerHeight / 2;
    let prevC = -Infinity, prevI = Number(sections[0]!.dataset.scene);
    for (const s of sections) {
      const b = s.getBoundingClientRect();
      const c = b.top + b.height / 2;
      const idx = Number(s.dataset.scene);
      if (vc <= c) {
        if (prevC === -Infinity) return idx;
        return prevI + ((vc - prevC) / (c - prevC)) * (idx - prevI);
      }
      prevC = c;
      prevI = idx;
    }
    return prevI;
  };

  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  };

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const p3 = new THREE.Vector3();
  const s3 = new THREE.Vector3();
  const eul = new THREE.Euler();
  let p = 0; // smoothed progress
  let lastDrawn = -1;
  let time = 0;

  const frame = (dt: number) => {
    time += dt;
    const target = readProgress();
    p += (target - p) * (opts.reducedMotion ? 1 : Math.min(1, dt * 5));
    const max = formations.length - 1;
    const pc = Math.min(max, Math.max(0, p));
    const ia = Math.min(max - 1, Math.floor(pc));
    const A = formations[ia]!, B = formations[ia + 1]!;
    // plateau: each formation rests before it starts to rearrange
    const f = clamp01((pc - ia - 0.18) / 0.64);
    const waveW = (A.wave ? 1 - f : 0) + (B.wave ? f : 0);

    if (dirty || Math.abs(pc - lastDrawn) > 0.0004 || waveW > 0.01) {
      const size = mix(A.size, B.size, ease(f));
      for (let i = 0; i < N; i++) {
        const t = ease(clamp01((f - delay[i]! * 0.6) / 0.76));
        const burst = Math.sin(Math.PI * t);
        const j = i * 3;
        let x = mix(A.points[j]!, B.points[j]!, t) + drift[j]! * burst * 0.5;
        let y = mix(A.points[j + 1]!, B.points[j + 1]!, t) + drift[j + 1]! * burst * 0.5;
        const z = mix(A.points[j + 2]!, B.points[j + 2]!, t) + drift[j + 2]! * burst * 0.5;
        if (waveW > 0.01) {
          const w = A.wave ? 1 - t : t;
          const fx = A.wave ? A.points[j]! : B.points[j]!;
          const fz = A.wave ? A.points[j + 2]! : B.points[j + 2]!;
          y += (Math.sin(fx * 0.55 + time * 0.9) * 0.38 + Math.cos(fz * 0.8 + time * 0.6) * 0.28) * w;
          x += 0;
        }
        q.setFromAxisAngle(axis[i]!, burst * 2.4);
        m.compose(p3.set(x, y, z), q, s3.setScalar(size * (1 + burst * 0.5)));
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      lastDrawn = pc;
      dirty = false;
    }

    // Group placement
    const g = ease(f);
    const pa = narrow ? A.posNarrow : A.pos, pb = narrow ? B.posNarrow : B.pos;
    group.position.set(mix(pa[0], pb[0], g), mix(pa[1], pb[1], g), mix(pa[2], pb[2], g));
    const sway = mix(A.sway, B.sway, g);
    eul.set(mix(A.rot[0], B.rot[0], g), mix(A.rot[1], B.rot[1], g) + Math.sin(time * 0.22) * sway * 0.6 + time * 0.05 * sway, mix(A.rot[2], B.rot[2], g));
    group.rotation.copy(eul);
    group.scale.setScalar(mix(narrow ? A.scaleNarrow : A.scale, narrow ? B.scaleNarrow : B.scale, g));
    const fade = opts.fadeOnScroll ? clamp01(1 - window.scrollY / (window.innerHeight * 0.7)) : 1;
    canvas.style.opacity = String(mix(A.dim, B.dim, g) * (narrow ? 0.75 : 1) * fade);

    // Camera: gentle pointer parallax
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    dust.rotation.y = time * 0.01;
    dust.position.y = (pc * 0.6) % 4;

    renderer.render(scene, camera);
  };

  // Loop with adaptive quality
  let raf = 0, last = 0, frames = 0, slowMs = 0, lowPower = false, skip = false;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const raw = now - last;
    if (lowPower && (skip = !skip)) return;
    last = now;
    if (!lowPower && frames < 40) {
      frames++;
      if (frames > 8) slowMs += raw;
      if (frames === 40 && slowMs / 32 > 40) {
        lowPower = true;
        renderer.setPixelRatio(1);
        resize();
      }
    }
    frame(Math.min(raw / 1000, 0.05));
  };
  const start = () => {
    if (raf || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  // Reduced motion: no animation loop — redraw only when the user scrolls
  let pending = false;
  const still = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      dirty = true;
      frame(0);
    });
  };

  const onVis = () => (document.hidden ? stop() : opts.reducedMotion ? still() : start());
  const onResize = () => {
    resize();
    collect();
    if (opts.reducedMotion) still();
  };
  const mo = new MutationObserver(() => {
    applyTheme();
    if (opts.reducedMotion) still();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVis);
  if (opts.reducedMotion) window.addEventListener("scroll", still, { passive: true });
  else window.addEventListener("pointermove", onPointer, { passive: true });

  // If the GPU drops the context, hide the canvas and let the CSS backdrop show
  const onLost = (e: Event) => {
    e.preventDefault();
    stop();
    canvas.style.visibility = "hidden";
  };
  const onRestored = () => {
    canvas.style.visibility = "";
    dirty = true;
    opts.reducedMotion ? still() : start();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  collect();
  resize();
  applyTheme();
  p = readProgress();
  if (opts.reducedMotion) still();
  else start();

  return () => {
    stop();
    mo.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", still);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVis);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    mesh.geometry.dispose();
    material.dispose();
    dustGeo.dispose();
    dustMat.dispose();
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}
