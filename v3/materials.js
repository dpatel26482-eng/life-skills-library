// PBR material helpers.
//
// Poly Haven ships an "arm" map: R = ambient occlusion, G = roughness, B = metalness.
// Three.js reads aoMap from R, roughnessMap from G and metalnessMap from B, so the one
// texture can be assigned to all three slots — the standard glTF ORM packing.
//
// This module is the reason the scene stops looking like flat boxes: diffuse gives it
// colour variation, the normal map gives surface relief, and the arm map puts grime in
// the crevices and varies the sheen.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// One shared LoadingManager across every loader in the app, so the progress bar
// reflects real asset loading rather than a guess.
export const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
const cache = new Map();

function tex(url, { srgb = false, repeat = [1, 1], aniso = 8 } = {}) {
  const key = url + JSON.stringify(repeat) + srgb;
  if (cache.has(key)) return cache.get(key);
  const t = loader.load(url);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  cache.set(key, t);
  return t;
}

/**
 * Build a textured MeshStandardMaterial from a Poly Haven texture set.
 * @param {string} name  folder-relative basename, e.g. 'rock_wall_07'
 */
export function pbr(name, opts = {}) {
  const {
    repeat = [1, 1],
    color = 0xffffff,
    roughness = 1,
    metalness = 1,
    normalScale = 1,
    aoIntensity = 1,
    side = THREE.FrontSide
  } = opts;

  const base = `assets/textures/${name}`;
  const mat = new THREE.MeshStandardMaterial({
    color,
    map: tex(`${base}_Diffuse.jpg`, { srgb: true, repeat }),
    normalMap: tex(`${base}_nor_gl.jpg`, { repeat }),
    aoMap: tex(`${base}_arm.jpg`, { repeat }),
    roughnessMap: tex(`${base}_arm.jpg`, { repeat }),
    metalnessMap: tex(`${base}_arm.jpg`, { repeat }),
    roughness,
    metalness,
    side
  });
  mat.normalScale.set(normalScale, normalScale);
  mat.aoMapIntensity = aoIntensity;
  return mat;
}

/**
 * aoMap samples the second UV set. Most primitives only ship `uv`, so mirror it
 * into `uv1` or ambient occlusion silently does nothing.
 */
export function enableAO(geometry) {
  if (geometry.attributes.uv && !geometry.attributes.uv1) {
    geometry.setAttribute('uv1', geometry.attributes.uv);
  }
  return geometry;
}

/**
 * Bevelled box. A hard 90° corner is one of the loudest "this is CG" tells —
 * real edges are never perfectly sharp, so they catch a highlight. Swapping
 * BoxGeometry for this costs nothing and removes most of the blocky read.
 */
export function box(w, h, d, radius = 0.02, segments = 3) {
  const r = Math.min(radius, Math.min(w, h, d) / 2.05);
  return enableAO(new RoundedBoxGeometry(w, h, d, segments, r));
}

/**
 * Draw a book-spine label to a canvas and return it as a texture.
 * Text is rendered rotated so it runs bottom-to-top like a real spine.
 */
export function spineLabel(text, { fg = '#f3dcae', bg = null } = {}) {
  const W = 128, H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');

  if (bg) { x.fillStyle = bg; x.fillRect(0, 0, W, H); }
  else x.clearRect(0, 0, W, H);

  x.translate(W / 2, H / 2);
  x.rotate(-Math.PI / 2);
  x.textAlign = 'center';
  x.textBaseline = 'middle';

  x.font = '600 42px "Work Sans", system-ui, sans-serif';
  x.letterSpacing = '6px';
  x.shadowColor = 'rgba(0,0,0,.85)';
  x.shadowBlur = 8;
  x.fillStyle = fg;
  x.fillText(text.toUpperCase(), 0, 0);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Soft radial sprite used as an outer glow behind a lit object. */
export function glowSprite(colour = '#f0c877', size = 2.4) {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, colour);
  g.addColorStop(0.35, colour + 'aa');
  g.addColorStop(1, colour + '00');
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, opacity: 0.36
  }));
  sprite.scale.set(size, size, 1);
  return sprite;
}
