// =============================================================================
//  The Late Library — WebGL world
//
//  Two beats on one continuous scroll:
//    0.00 → 0.62   walk forward down the hall (camera rides a spline)
//    0.62 → 1.00   arrive at the shelf wall; drag to look, click a lit book
//
//  Geometry here is procedural so the scene runs with no downloaded assets.
//  Everything is grouped under `world.hall` / `world.shelf`, so a real GLB
//  (photogrammetry scan, modelled interior) can be dropped in later and swapped
//  for either group without touching the camera, scroll, picking or post stack.
//  See loadGLB() at the bottom for the intended seam.
// =============================================================================

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import Lenis from 'lenis';
import { pbr, enableAO, manager } from './materials.js';
import { buildRotunda, loadProps, ROT_R, ROT_H } from './rotunda.js';
import { makeBook } from './book.js';

const GOLD = 0xf0c877;
const LAMP = 0xffcf8a;

const canvas = document.getElementById('stage-canvas');
const hoverLabel = document.getElementById('hover-label');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- renderer --
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.80;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x070605, 0.019);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 400);
scene.add(camera);   // the open book is parented to the camera, so it must be in the graph

// Image-based lighting. Without an environment map every surface is lit only by
// point lights, which is the classic "CG" tell; the HDRI gives real reflections
// and soft directional fill across every PBR material in the scene.
let envReady = false;
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
new RGBELoader(manager).load('assets/hdri/ballroom_2k.hdr', (hdr) => {
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = pmrem.fromEquirectangular(hdr).texture;
  scene.environmentIntensity = 0.6;  // a hint of room, not a bright showroom
  hdr.dispose();
  pmrem.dispose();
  envReady = true;
}, undefined, (e) => console.warn('HDRI failed', e));

// ---------------------------------------------------------------- materials --
// Real PBR sets (Poly Haven, CC0): diffuse + normal + packed AO/rough/metal.
const woodDark = pbr('wood_table_001', { repeat: [1, 3], color: 0x9a887a, roughness: 1, metalness: 0.85 });
const woodMid = pbr('wood_table_001', { repeat: [1, 2], roughness: 1, metalness: 0.8 });
const stone = pbr('rock_wall_07', { repeat: [2, 4], roughness: 1, metalness: 0.9, normalScale: 1.3 });
const floorMat = pbr('brown_planks_03', { repeat: [3, 26], roughness: 1, metalness: 0.85 });
const bookMat = pbr('book_pattern', { roughness: 1, metalness: 0.7 });

const BOOK_COLOURS = [
  0x3c6b52, 0x20402e, 0x6d2f34, 0x3f1a1d, 0x35497c, 0x1e2949,
  0x5a3822, 0x2f2b26, 0x4a3520, 0x24303a, 0x53321f, 0x1f2b22
];

// =============================================================================
//  HALL — repeating bays receding down -Z
// =============================================================================
const hall = new THREE.Group();
scene.add(hall);

const BAY_COUNT = 13;
const BAY_GAP = 7.4;
const HALL_W = 9.2;
const HALL_H = 8.6;

// Every bay repeats the same handful of boxes. Built as individual meshes that was
// ~250 draw calls; as InstancedMesh it is one call per part type. Geometry and
// triangle count are unchanged — this is purely about how many times the CPU has
// to tell the GPU to draw something.
function buildHallInstanced() {
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const one = new THREE.Vector3(1, 1, 1);
  const v = new THREE.Vector3();

  const mk = (geo, mat, count) => {
    const im = new THREE.InstancedMesh(geo, mat, count);
    im.castShadow = false;
    im.receiveShadow = true;
    hall.add(im);
    return im;
  };

  const pillars = mk(enableAO(new THREE.BoxGeometry(1.15, HALL_H, 1.15)), stone, BAY_COUNT * 2);
  const blocks = mk(enableAO(new THREE.BoxGeometry(0.62, HALL_H * 0.66, BAY_GAP * 0.82)), woodDark, BAY_COUNT * 2);
  const boards = mk(enableAO(new THREE.BoxGeometry(0.94, 0.09, BAY_GAP * 0.8)), woodMid, BAY_COUNT * 2 * 5);
  const beams = mk(enableAO(new THREE.BoxGeometry(HALL_W + 1.2, 1.5, 1.0)), stone, BAY_COUNT);
  const globes = mk(new THREE.SphereGeometry(0.2, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff0cf }), BAY_COUNT);
  const shafts = mk(new THREE.ConeGeometry(1.5, 7.2, 20, 1, true),
    new THREE.MeshBasicMaterial({
      color: LAMP, transparent: true, opacity: 0.012,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    }), BAY_COUNT);

  let iP = 0, iBl = 0, iBo = 0;
  for (let b = 0; b < BAY_COUNT; b++) {
    const z = -b * BAY_GAP;

    for (const side of [-1, 1]) {
      v.set(side * HALL_W / 2, HALL_H / 2, z);
      pillars.setMatrixAt(iP++, m.compose(v, q, one));

      v.set(side * (HALL_W / 2 - 0.85), HALL_H * 0.33, z + BAY_GAP * 0.5);
      blocks.setMatrixAt(iBl++, m.compose(v, q, one));

      for (let sh = 0; sh < 5; sh++) {
        v.set(side * (HALL_W / 2 - 1.2), 0.66 + sh * 1.42, z + BAY_GAP * 0.5);
        boards.setMatrixAt(iBo++, m.compose(v, q, one));
      }
    }

    v.set(0, HALL_H - 0.75, z);
    beams.setMatrixAt(b, m.compose(v, q, one));

    const globeY = HALL_H - 2.3, globeZ = z + BAY_GAP * 0.5;
    v.set(0, globeY, globeZ);
    globes.setMatrixAt(b, m.compose(v, q, one));

    v.set(0, HALL_H - 5.2, globeZ);
    shafts.setMatrixAt(b, m.compose(v, q, one));

    // lights stay real objects — they are culled by distance every frame
    const lamp = new THREE.PointLight(LAMP, 30, 24, 2);
    lamp.position.set(0, globeY, globeZ);
    lamp.userData.isBayLamp = true;
    hall.add(lamp);
  }

  for (const im of [pillars, blocks, boards, beams, globes, shafts]) im.instanceMatrix.needsUpdate = true;
}

buildHallInstanced();

// floor + ceiling running the length of the hall
const HALL_LEN = BAY_COUNT * BAY_GAP;
// The hall slabs used to run 40 units past the end of the corridor and sat
// exactly on the rotunda's floor disc at y=0. Two coplanar surfaces fight over
// the depth buffer — that is the flicker. Stop them where the corridor stops.
const FLOOR_LEN = HALL_LEN + 20;
const floor = new THREE.Mesh(enableAO(new THREE.PlaneGeometry(HALL_W + 3, FLOOR_LEN)), floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.z = (20 - HALL_LEN) / 2;
// The last half-unit still meets the drum's floor disc. Drop the hall slab 1cm so
// the disc simply wins there: no coplanar surfaces left to flicker, and a 1cm
// step at floor level is invisible.
floor.position.y = -0.012;
floor.receiveShadow = true;
scene.add(floor);

const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(HALL_W + 3, FLOOR_LEN), stone);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(0, HALL_H, (20 - HALL_LEN) / 2);
scene.add(ceiling);

// -------------------------------------------------- books lining the hall --
// One InstancedMesh for every filler spine in the hall: hundreds of books, one draw call.
const fillerGeo = enableAO(new THREE.BoxGeometry(1, 1, 1));
const fillerMat = bookMat;
const HALL_BOOKS = BAY_COUNT * 2 * 4 * 16;
const hallBooks = new THREE.InstancedMesh(fillerGeo, fillerMat, HALL_BOOKS);
hallBooks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

{
  const m = new THREE.Matrix4();
  const colour = new THREE.Color();
  let n = 0;
  for (let b = 0; b < BAY_COUNT; b++) {
    for (const side of [-1, 1]) {
      for (let shelf = 0; shelf < 4; shelf++) {
        let cursor = 0;
        for (let k = 0; k < 16; k++) {
          const w = 0.1 + Math.random() * 0.1;
          const h = 0.5 + Math.random() * 0.34;
          const d = 0.42 + Math.random() * 0.1;
          const z = -b * BAY_GAP + BAY_GAP * 0.5 - BAY_GAP * 0.36 + cursor;
          cursor += w + 0.022;
          if (cursor > BAY_GAP * 0.74) break;
          m.makeScale(d, h, w);
          // sit them in front of the backing block's inner face, not inside it
          m.setPosition(side * (HALL_W / 2 - 1.45), 0.72 + shelf * 1.42 + h / 2, z);
          hallBooks.setMatrixAt(n, m);
          colour.setHex(BOOK_COLOURS[(Math.random() * BOOK_COLOURS.length) | 0]);
          colour.multiplyScalar(0.55 + Math.random() * 0.5);
          hallBooks.setColorAt(n, colour);
          n++;
        }
      }
    }
  }
  hallBooks.count = n;
  hallBooks.instanceMatrix.needsUpdate = true;
  if (hallBooks.instanceColor) hallBooks.instanceColor.needsUpdate = true;
}
scene.add(hallBooks);

// =============================================================================
//  ROTUNDA — the circular chamber the hall opens into
// =============================================================================
const SHELF_Z = -HALL_LEN - ROT_R + 0.5;          // drum centre: its near edge meets the hall end
const rot = buildRotunda(SHELF_Z);
scene.add(rot.group);
const shelf = rot.group;
const pickable = rot.pickable;

// the doorway the hall arrives through, punched into the drum wall
{
  const jambMat = stone;
  for (const dx of [-HALL_W / 2 - 0.3, HALL_W / 2 + 0.3]) {
    const jamb = new THREE.Mesh(enableAO(new THREE.BoxGeometry(1.4, HALL_H, 2.4)), jambMat);
    jamb.position.set(dx, HALL_H / 2, -HALL_LEN + 1.2);
    scene.add(jamb);
  }
  const head = new THREE.Mesh(enableAO(new THREE.BoxGeometry(HALL_W + 3.4, 2.2, 2.4)), jambMat);
  head.position.set(0, HALL_H + 0.4, -HALL_LEN + 1.2);
  scene.add(head);
}

let chandelierLight = null;
let chandelierHalo = null;
let propsReady = false;
loadProps(rot.group, (l) => { chandelierLight = l; })
  .then((p) => { propsReady = true; chandelierHalo = p?.halo || null; })
  .catch((err) => console.warn('props failed to load', err));

scene.add(new THREE.AmbientLight(0x33281c, 1.9));

// ------------------------------------------------------------------ motes --
const moteCount = 460;
const motePos = new Float32Array(moteCount * 3);
const moteSeed = new Float32Array(moteCount);
for (let i = 0; i < moteCount; i++) {
  motePos[i * 3] = (Math.random() - 0.5) * (HALL_W + 1);
  motePos[i * 3 + 1] = Math.random() * HALL_H;
  motePos[i * 3 + 2] = -Math.random() * HALL_LEN;
  moteSeed[i] = Math.random() * 100;
}
const moteGeo = new THREE.BufferGeometry();
moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
  color: GOLD, size: 0.045, transparent: true, opacity: 0.62,
  blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
}));
scene.add(motes);

// =============================================================================
//  POST — bloom, then grain + vignette + a touch of chromatic aberration
// =============================================================================
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.34, 0.62, 0.82);
composer.addPass(bloom);

const GrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAmount: { value: 0.075 },
    uVignette: { value: 1.02 },
    uContrast: { value: 1.28 },
    uLift: { value: 0.018 },
    uSat: { value: 1.18 },
    uShadowLift: { value: 0.16 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime, uAmount, uVignette, uContrast, uLift, uSat, uShadowLift;
    varying vec2 vUv;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

    void main(){
      vec2 uv = vUv;
      // slight chromatic split toward the edges
      vec2 dir = uv - 0.5;
      float d = dot(dir, dir);
      float ca = 0.0016 + d * 0.004;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * ca).b;

      // animated film grain, heavier in the shadows
      float g = hash(uv * vec2(1024.0, 768.0) + fract(uTime) * 91.7) - 0.5;
      float luma = dot(col, vec3(0.299, 0.587, 0.114));
      col += g * uAmount * (1.25 - luma);

      // ---- grade
      // Open the shadows first. sqrt() raises darks hard while leaving highlights
      // almost untouched, so the room brightens without washing out the contrast.
      col = mix(col, sqrt(col), uShadowLift);
      col = max(col - uLift, 0.0) / max(1.0 - uLift, 0.001);
      col = clamp((col - 0.5) * uContrast + 0.5, 0.0, 1.0);

      // warm the highlights, cool the shadows — separation without losing the palette
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 warm = vec3(1.06, 1.0, 0.9);
      vec3 cool = vec3(0.92, 0.96, 1.06);
      col *= mix(cool, warm, smoothstep(0.15, 0.75, lum));

      // saturation
      col = clamp(mix(vec3(lum), col, uSat), 0.0, 1.0);

      // vignette
      float vig = smoothstep(0.95, 0.22, length(dir) * uVignette);
      col *= mix(0.46, 1.0, vig);

      gl_FragColor = vec4(col, 1.0);
    }
  `
};
const grainPass = new ShaderPass(GrainShader);
composer.addPass(grainPass);

// =============================================================================
//  CAMERA PATH — scroll drives t along a spline down the hall
// =============================================================================
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2.55, 12),
  new THREE.Vector3(0.5, 2.5, 2),
  new THREE.Vector3(-0.4, 2.45, -14),
  new THREE.Vector3(0.35, 2.5, -32),
  new THREE.Vector3(0, 2.6, -52),
  new THREE.Vector3(0, 2.75, -HALL_LEN + 2)      // through the doorway
]);

const SHELF_START = 0.58;          // scroll fraction where the walk ends
const ORBIT_R = 11.8;              // how far the camera sits from the island
const lookTarget = new THREE.Vector3();
const camTarget = new THREE.Vector3();

let scrollProgress = 0;            // 0..1 damped
let scrollRaw = 0;
let pointer = { x: 0, y: 0 };      // -1..1, look-around / orbit offset
let dragging = false, dragX = 0, dragY = 0;
let pointerHoming = false;   // easing drag offset back to centre after a focus

// Only the handful of bay lamps near the camera stay enabled. Three.js shades
// every fragment against every visible light, so 13 corridor lamps cost the same
// whether they are on screen or 80 metres behind you. Hiding a light removes it
// from the lighting pass entirely.
const bayLamps = [];
hall.traverse((o) => { if (o.isLight && o.userData.isBayLamp) bayLamps.push(o); });
const LIT_BAYS = 5;
const _lampWorld = new THREE.Vector3();

function cullLights() {
  const scored = bayLamps.map((l) => {
    l.getWorldPosition(_lampWorld);
    return { l, d: _lampWorld.distanceToSquared(camera.position) };
  }).sort((a, b) => a.d - b.d);
  scored.forEach((e, i) => { e.l.visible = i < LIT_BAYS; });
}

function placeCamera(p) {
  const walk = Math.min(p / SHELF_START, 1);
  path.getPointAt(walk * 0.999, camTarget);

  if (p <= SHELF_START) {
    // walking the hall
    camera.position.copy(camTarget);
    lookTarget.set(0, 2.6, camTarget.z - 16);
    return;
  }

  // Inside the drum: the remaining scroll swings the camera around the island,
  // and the pointer adds its own offset so dragging feels like looking around.
  const t = (p - SHELF_START) / (1 - SHELF_START);
  const enter = Math.min(t / 0.35, 1);                       // glide in off the doorway
  // Full circuit: the island is dressed on both faces, so the scroll carries the
  // camera a complete 360° around it and drag adds a free offset on top.
  const angle = Math.PI / 2 + t * Math.PI * 2 + pointer.x * Math.PI;
  const radius = THREE.MathUtils.lerp(ROT_R - 2.5, ORBIT_R, enter);
  const height = THREE.MathUtils.lerp(2.75, 4.6 + pointer.y * 1.4, enter);

  camera.position.set(
    Math.cos(angle) * radius,
    height,
    SHELF_Z + Math.sin(angle) * radius
  );
  lookTarget.set(0, THREE.MathUtils.lerp(2.6, 4.5, enter), SHELF_Z);
}

// ---------------------------------------------------------------- scrolling --
const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
lenis.on('scroll', ({ scroll, limit }) => {
  scrollRaw = limit > 0 ? Math.min(Math.max(scroll / limit, 0), 1) : 0;
  document.documentElement.style.setProperty('--scroll', scrollRaw.toFixed(4));
});

function seek(p) {
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  lenis.scrollTo(p * limit, { duration: 1.6 });
}

// Swing the camera round the island until it is square on to a given book.
function focusBook(id) {
  const mesh = pickable.find((m) => m.userData.id === id);
  if (!mesh) return;
  const wp = new THREE.Vector3();
  mesh.getWorldPosition(wp);

  // The old version used the book's bearing from the island centre. For a book on
  // a flat face that points sideways, not out of the face — which is why it mostly
  // landed somewhere else. Aim along the face normal, nudged by the book's offset
  // across that face so it ends up centred in frame.
  const faceDir = mesh.userData.dir || 1;
  const ang = Math.atan2(faceDir * ORBIT_R, wp.x);
  let t = (ang - Math.PI / 2) / (Math.PI * 2);
  t = ((t % 1) + 1) % 1;

  // Drag offset is added straight onto the orbit angle, so accumulated dragging
  // threw the result off. Ease it back to zero as we travel.
  pointerHoming = true;
  seek(SHELF_START + t * (1 - SHELF_START));
}

// ------------------------------------------------------------------ picking --
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let hovered = null;

function updatePointerFromEvent(e) {
  ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
  ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function pickAt() {
  raycaster.setFromCamera(ndc, camera);
  // Test the island as well, not just the books: otherwise a book on the far face
  // is clickable straight through the shelving and the camera flies into the unit.
  const hits = raycaster.intersectObjects([rot.island, ...pickable], true)
    // A book's own glow sprite and printed spine label sit in front of it. They
    // were being hit first, so every click resolved to "not a book" and nothing
    // happened. They are decoration — the ray passes straight through.
    .filter((h) => !h.object.isSprite && !h.object.userData.ignoreRay);
  if (!hits.length) return null;
  const first = hits[0].object;
  return pickable.includes(first) ? first : null;
}

function setHover(obj) {
  if (hovered === obj) return;
  hovered = obj;
  document.body.classList.toggle('is-pointing', !!obj);
  if (obj) {
    hoverLabel.textContent = obj.userData.numeral + ' · ' + obj.userData.title;
    hoverLabel.hidden = false;
  } else {
    hoverLabel.hidden = true;
  }
}

window.addEventListener('pointermove', (e) => {
  updatePointerFromEvent(e);
  if (dragging) {
    pointer.x += (e.clientX - dragX) * -0.0052;   // unclamped: drag spins a full circle
    pointer.y = THREE.MathUtils.clamp(pointer.y + (e.clientY - dragY) * 0.0032, -0.7, 0.7);
    dragX = e.clientX; dragY = e.clientY;
  } else if (scrollProgress > SHELF_START) {
    // gentle parallax even without dragging
    pointer.x += ((e.clientX / window.innerWidth - 0.5) * 0.85 - pointer.x) * 0.06;
    pointer.y += ((0.5 - e.clientY / window.innerHeight) * 0.4 - pointer.y) * 0.06;
  }
  if (hoverLabel && !hoverLabel.hidden) {
    hoverLabel.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 10}px)`;
  }
  setHover(!reading && scrollProgress > SHELF_START - 0.05 ? pickAt() : null);
});

canvas.addEventListener('pointerdown', (e) => { pointerHoming = false; dragging = true; dragX = e.clientX; dragY = e.clientY; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointerup', (e) => {
  dragging = false;
  try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
});
canvas.addEventListener('click', (e) => {
  updatePointerFromEvent(e);

  // While a book is open its two pages are the buttons.
  if (reading && reading.phase === 'read') {
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects([reading.rig.rightPage, reading.rig.leftPage], false);
    if (hits.length) {
      if (hits[0].object === reading.rig.rightPage) window.LLReader.open(reading.mesh.userData.id);
      else closeBookScene();
    }
    return;
  }

  const hit = pickAt();
  if (hit) pullBook(hit);
});

// ------------------------------------------------------- pulling a book out --
// Clicking a lit spine runs one continuous move: the camera pushes in toward the
// shelf while the book lifts out, flies to a point just in front of the lens and
// swings open to fill the frame. Reversing it puts everything back.

const openBooks = new Map();          // id -> book rig, built lazily
let reading = null;                   // { mesh, rig, phase, t, camFrom, camTo, lookFrom, lookTo, bookFrom }
let busyBook = null;

const hud = document.getElementById('book-hud');

// A soft light riding on the camera, switched on only while a book is open. The
// pages are ordinary paper now, so they need light falling on them rather than
// emitting their own — this is the equivalent of holding it up to the lamp.
const readingLight = new THREE.PointLight(0xffe9c9, 0, 16, 1.4);
readingLight.position.set(0, 1.4, 1.2);
camera.add(readingLight);
const _fwd = new THREE.Vector3();
const _bookWorld = new THREE.Vector3();

function rigFor(mesh) {
  const id = mesh.userData.id;
  if (!openBooks.has(id)) {
    const rig = makeBook({
      title: mesh.userData.title,
      numeral: mesh.userData.numeral,
      colour: mesh.userData.colour
    });
    // Parented to the camera: the spread is then always dead-centre and square to
    // the lens by construction, instead of being chased there with a slerp.
    camera.add(rig.group);
    openBooks.set(id, rig);
  }
  return openBooks.get(id);
}

function pullBook(mesh) {
  if (!mesh || reading || busyBook) return;
  busyBook = mesh;
  setHover(null);

  const rig = rigFor(mesh);
  mesh.getWorldPosition(_bookWorld);

  // where the camera ends up: same bearing, much closer to the book
  camera.getWorldDirection(_fwd);
  const camTo = _bookWorld.clone()
    .add(camera.position.clone().sub(_bookWorld).normalize().multiplyScalar(5.6));
  camTo.y = _bookWorld.y + 0.35;

  reading = {
    mesh, rig,
    phase: 'opening', t: 0,
    camFrom: camera.position.clone(),
    camTo,
    lookFrom: lookTarget.clone(),
    lookTo: _bookWorld.clone(),
    bookFrom: _bookWorld.clone(),
  };

  document.body.classList.add('is-reading');
  rig.group.visible = true;
  rig.setOpen(0);
  rig.group.quaternion.identity();
  rig.group.position.copy(camera.worldToLocal(_bookWorld.clone()));
  rig.group.scale.setScalar(0.3);
  // The spine has a glow sprite and a printed label parented alongside it. Hiding
  // only the mesh left those on the shelf, so the book you clicked still appeared
  // to be sitting there while a second one flew out.
  mesh.visible = false;
  if (mesh.userData.glow) mesh.userData.glow.visible = false;
  if (mesh.userData.label) mesh.userData.label.visible = false;
}

function closeBookScene() {
  if (!reading || reading.phase !== 'read') return;
  reading.phase = 'closing';
  reading.t = 0;
  document.body.classList.remove('is-reading');
  hud.classList.remove('is-on');
  hud.setAttribute('aria-hidden', 'true');
}

// Drive the open/close animation. Returns true while it owns the camera.
function updateReading(dt) {
  if (!reading) return false;
  const r = reading;

  if (r.phase === 'read') {
    // hold: park the book squarely in front of the lens
    placeOpenBook(1);
    return true;
  }

  r.t = Math.min(r.t + dt / 1.15, 1);
  const k = r.phase === 'opening' ? r.t : 1 - r.t;
  const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   // ease in/out

  camera.position.lerpVectors(r.camFrom, r.camTo, e);
  lookTarget.lerpVectors(r.lookFrom, r.lookTo, e);
  camera.lookAt(lookTarget);

  placeOpenBook(e);
  // the cover only starts turning once the book is most of the way to the lens
  r.rig.setOpen(THREE.MathUtils.clamp((e - 0.45) / 0.55, 0, 1));

  if (r.t >= 1) {
    if (r.phase === 'opening') {
      r.phase = 'read';
      hud.classList.add('is-on');
      hud.setAttribute('aria-hidden', 'false');
    } else {
      readingLight.intensity = 0;
      r.rig.group.visible = false;
      r.mesh.visible = true;
      if (r.mesh.userData.glow) r.mesh.userData.glow.visible = true;
      if (r.mesh.userData.label) r.mesh.userData.label.visible = true;
      busyBook = null;
      reading = null;
      window.dispatchEvent(new CustomEvent('ll-book-closed'));
      return false;
    }
  }
  return true;
}

// Slide the book from its shelf slot to a fixed spot in front of the lens.
// All in camera space, so "in front of the lens" is simply -Z.
const READ_POS = new THREE.Vector3(0, -0.06, -2.5);
const _slotWorld = new THREE.Vector3();
function placeOpenBook(e) {
  const r = reading;
  readingLight.intensity = 2.2 * e;

  // Recompute the shelf slot in camera space every frame. It was captured once,
  // at pull time — but the camera moves during the flight, so on the way back
  // that stale point no longer matched the shelf and the book sank into the
  // wrong place. The slot is fixed in the world; only the camera moves.
  r.mesh.getWorldPosition(_slotWorld);
  const slotLocal = camera.worldToLocal(_slotWorld.clone());

  r.rig.group.position.lerpVectors(slotLocal, READ_POS, e);
  r.rig.group.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, e));
  r.rig.group.quaternion.identity();
}

// shelving the HTML reader returns to the 3D book, still open
window.addEventListener('ll-reader-closed', () => {});

// =============================================================================
//  LOOP
// =============================================================================
const clock = new THREE.Clock();
let frames = 0;

function render() {
  const dt = clock.getDelta();
  const t = clock.getElapsedTime();

  if (pointerHoming) {
    pointer.x += (0 - pointer.x) * 0.08;
    pointer.y += (0 - pointer.y) * 0.08;
    if (Math.abs(pointer.x) < 0.002 && Math.abs(pointer.y) < 0.002) { pointer.x = pointer.y = 0; pointerHoming = false; }
  }
  scrollProgress += (scrollRaw - scrollProgress) * (reduceMotion ? 1 : 0.09);
  if (!updateReading(dt)) {
    placeCamera(scrollProgress);
    camera.lookAt(lookTarget);
  }
  cullLights();

  // motes drift upward and wrap
  const arr = moteGeo.attributes.position.array;
  for (let i = 0; i < moteCount; i++) {
    arr[i * 3 + 1] += dt * (0.09 + (moteSeed[i] % 1) * 0.13);
    arr[i * 3] += Math.sin(t * 0.4 + moteSeed[i]) * dt * 0.06;
    if (arr[i * 3 + 1] > HALL_H) arr[i * 3 + 1] = 0;
  }
  moteGeo.attributes.position.needsUpdate = true;

  // lit books breathe
  for (const m of pickable) {
    if (m === busyBook) continue;
    const pulse = 0.22 + Math.sin(t * 1.6 + m.position.x) * 0.09;
    m.material.emissiveIntensity = hovered === m ? 0.95 : pulse;
    m.scale.setScalar(hovered === m ? 1.09 : 1);
  }

  // Chandelier: a slow swell that briefly lifts the room, with a candle flicker
  // riding on top so it never looks like a plain sine fade.
  if (chandelierLight) {
    const swell = Math.pow((Math.sin(t * 0.22) + 1) / 2, 2.2);      // long, mostly-dim cycle
    const flicker = 0.94 + Math.sin(t * 11.3) * 0.03 + Math.sin(t * 4.1) * 0.03;
    chandelierLight.intensity = (330 + swell * 240) * flicker;
    if (chandelierHalo) chandelierHalo.material.opacity = 0.22 + swell * 0.3;
  }

  // torches breathe independently so the wall light never looks like one lamp
  if (rot.torchFlames) {
    for (const tf of rot.torchFlames) {
      const f = 0.82 + Math.sin(t * 7.3 + tf.seed) * 0.1 + Math.sin(t * 3.1 + tf.seed * 2) * 0.08;
      tf.light.intensity = tf.base * f;
      tf.flame.scale.set(1 + (f - 1) * 0.3, 1.5 + (f - 1) * 0.6, 1);
      tf.halo.material.opacity = 0.2 + f * 0.12;
    }
  }

  grainPass.uniforms.uTime.value = t;
  composer.render();
  frames++;
}

function loop(time) {
  lenis.raf(time);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ------------------------------------------------------------------ resize --
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// ------------------------------------------------------------------- chrome --
// The menu overrides an open book. Reading mode owns the camera, so a seek
// issued underneath it scrolled the page but left the view pinned to the book —
// which read as the menu being dead. Shut the book first, then travel.
function seekFromChrome(p) {
  if (reading && reading.phase === 'read') closeBookScene();
  if (window.LLReader?.isOpen()) window.LLReader.close();
  seek(p);
}

document.querySelectorAll('[data-seek]').forEach((btn) => {
  btn.addEventListener('click', () => seekFromChrome(parseFloat(btn.dataset.seek)));
});
document.getElementById('letter-to-shelf')?.addEventListener('click', () => seekFromChrome(0.85));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !window.LLReader.isOpen()) closeBookScene();
});

// side-panel topics: click one to be taken round to face that book
const topicList = document.getElementById('book-list');
if (topicList) {
  topicList.innerHTML = pickable.map((m) =>
    `<li><button type="button" class="topic-link" data-id="${m.userData.id}">` +
    `<span class="topic-num">${m.userData.numeral}</span>${m.userData.title}</button></li>`
  ).join('');
  topicList.addEventListener('click', (e) => {
    const btn = e.target.closest('.topic-link');
    if (btn) focusBook(btn.dataset.id);
  });
}

// =============================================================================
//  LOADING SCREEN
//  Real progress from the shared LoadingManager. The canvas fades in behind the
//  bar once most assets are in — blurred, because at that point some textures
//  are still arriving — then the blur resolves to nothing as it hands over.
// =============================================================================
{
  const loaderEl = document.getElementById('loader');
  const barFill = document.getElementById('loader-bar-fill');
  const pctEl = document.getElementById('loader-pct');

  let target = 0;      // where the manager says we are
  let shown = 0;       // eased value actually painted
  let done = false;

  manager.onProgress = (url, loaded, total) => {
    if (total > 0) target = Math.max(target, loaded / total);
  };

  function finish() {
    if (done) return;
    done = true;
    target = 1;
  }
  manager.onLoad = finish;
  manager.onError = () => { /* a missing asset must not strand the loader */ };

  // onLoad alone is not enough. This block runs at the end of the module, so on a
  // warm cache the queue can empty *before* the handler is attached and onLoad
  // never fires — leaving repeat visitors stuck at 99%. These two flags are the
  // real "everything heavy is in" signal, so they close the loader independently.
  function assetsSettled() {
    return envReady && propsReady;
  }

  // Safety net: if an asset never resolves, reveal anyway rather than hanging
  // on a loading screen forever.
  setTimeout(finish, 20000);

  // Driven by a timer rather than requestAnimationFrame: rAF is paused in a
  // background tab, which would leave someone staring at a frozen 0% until they
  // switched to it. A timer keeps ticking (throttled, but it ticks).
  const tick = setInterval(paint, 33);

  function paint() {
    if (!done && assetsSettled()) finish();

    if (done) {
      // Once everything is in, close the bar at a fixed rate. Easing toward 1 is
      // asymptotic — it rounds to 99% and never actually arrives, which left the
      // loading screen up indefinitely.
      shown = Math.min(1, shown + 0.05);
    } else {
      // ease toward the target so the bar glides instead of jumping between files
      shown += (target - shown) * 0.08;
    }
    if (shown > 0.999) shown = 1;

    const pct = Math.round(shown * 100);
    if (barFill) barFill.style.transform = `scaleX(${shown.toFixed(4)})`;
    if (pctEl) pctEl.textContent = pct + '%';

    // Reveal the scene behind the bar for the back half of the load, blurred.
    const reveal = THREE.MathUtils.clamp((shown - 0.5) / 0.45, 0, 1);
    document.documentElement.style.setProperty('--load-reveal', reveal.toFixed(3));
    document.documentElement.style.setProperty('--load-blur', (30 * (1 - reveal)).toFixed(1) + 'px');

    if (shown === 1) {
      // hand over: blur resolves to zero and the overlay lifts
      document.documentElement.style.setProperty('--load-blur', '0px');
      loaderEl?.classList.add('is-gone');
      document.body.classList.add('is-loaded');
      clearInterval(tick);
    }
  }
  paint();
}

// =============================================================================
//  ASSET SEAM
//  Drop a .glb in v3/assets/ and call this from the console (or uncomment) to
//  swap procedural geometry for real scanned/modelled geometry. Camera path,
//  scroll, picking and post-processing all keep working — only the meshes change.
//    loadGLB('assets/library.glb', { replace: 'hall', scale: 1, y: 0 })
// =============================================================================
export async function loadGLB(url, { replace = 'hall', scale = 1, y = 0 } = {}) {
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const gltf = await new GLTFLoader().loadAsync(url);
  const model = gltf.scene;
  model.scale.setScalar(scale);
  model.position.y = y;
  const target = replace === 'hall' ? hall : shelf;
  target.clear();
  target.add(model);
  return model;
}

// debug/verification hook — lets a headless check force frames and jump the camera.
// tick() exists because a backgrounded tab pauses requestAnimationFrame: without it
// neither Lenis nor the render loop advances, and the scene can't be checked at all.
let virtualTime = 0;
window.__world = {
  seek,
  lenis,
  tick: (count = 30, step = 16.7) => {
    for (let i = 0; i < count; i++) { virtualTime += step; lenis.raf(virtualTime); render(); }
    return { progress: +scrollProgress.toFixed(3), scrollRaw: +scrollRaw.toFixed(3), frames };
  },
  jumpTo: (p) => {
    const limit = document.documentElement.scrollHeight - window.innerHeight;
    lenis.scrollTo(p * limit, { immediate: true });
    return window.__world.tick(40);
  },
  renderOnce: () => { render(); return { progress: scrollProgress, frames }; },
  setProgress: (p) => { scrollRaw = p; scrollProgress = p; placeCamera(p); render(); },
  pick: (id) => pullBook(pickable.find((m) => m.userData.id === id)),
  closeBook: closeBookScene,
  focusBook,
  readingState: () => (reading ? { id: reading.mesh.userData.id, phase: reading.phase, t: +reading.t.toFixed(2) } : null),
  stats: () => ({
    frames,
    envReady,
    propsReady,
    progress: +scrollProgress.toFixed(3),
    drawCalls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    camera: camera.position.toArray().map((n) => +n.toFixed(2)),
    hovered: hovered ? hovered.userData.id : null
  }),
  loadGLB,
  scene, renderer, camera, composer,

  // Timed render benchmark. rAF is paused in a background tab, so this drives the
  // frames itself and reports the real cost of one composed frame.
  bench: (n = 60) => {
    const gl = renderer.getContext();
    render(); gl.finish();                      // warm up shaders/uploads
    const t0 = performance.now();
    for (let i = 0; i < n; i++) render();
    gl.finish();                                // WebGL is async — without this we
    const ms = (performance.now() - t0) / n;    // only time CPU-side command submission
    let lights = 0, litLights = 0, shadowLights = 0, meshes = 0, casters = 0, tris = 0;
    scene.traverse((o) => {
      if (o.isLight) { lights++; if (o.visible) litLights++; if (o.castShadow) shadowLights++; }
      if (o.isMesh) {
        meshes++;
        if (o.castShadow) casters++;
        const g = o.geometry;
        const count = g?.index ? g.index.count : (g?.attributes?.position?.count || 0);
        tris += (count / 3) * (o.isInstancedMesh ? o.count : 1);
      }
    });
    return {
      msPerFrame: +ms.toFixed(2), estFps: Math.round(1000 / ms),
      lights, litLights, shadowLights, meshes, casters,
      triangles: Math.round(tris),
      programs: renderer.info.programs?.length,
      textures: renderer.info.memory.textures,
      geometries: renderer.info.memory.geometries,
      pixelRatio: renderer.getPixelRatio()
    };
  },

  // overall brightness dial: __world.exposure(1.8) brighter, 1.6 dimmer
  exposure: (v) => {
    if (v !== undefined) renderer.toneMappingExposure = v;
    render();
    return renderer.toneMappingExposure;
  },

  // live dial for the bookcase fill — lighting is subjective, so tune it in place:
  //   __world.shelfLight(28)   brighter shelves
  //   __world.shelfLight(12)   dimmer
  shelfLight: (v) => {
    if (v !== undefined) rot.faceFills.forEach((l) => { l.intensity = v; });
    render();
    return rot.faceFills.map((l) => l.intensity);
  },
  grade: (o = {}) => {
    for (const [k, v] of Object.entries(o)) {
      if (grainPass.uniforms['u' + k[0].toUpperCase() + k.slice(1)]) {
        grainPass.uniforms['u' + k[0].toUpperCase() + k.slice(1)].value = v;
      }
    }
    render();
    return Object.fromEntries(Object.entries(grainPass.uniforms).map(([k, u]) => [k, u.value]));
  }
};
