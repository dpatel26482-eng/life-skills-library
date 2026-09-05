// =============================================================================
//  An openable 3D book.
//
//  Built around a spine at the origin. The right half is fixed; the left half is
//  a group pivoting on the spine, so rotating it from PI to ~0 swings the front
//  cover open exactly like a real book. Everything is parented to `group`, so the
//  whole book can be flown from the shelf to the camera as one object.
// =============================================================================

import * as THREE from 'three';

const PAGE_W = 1.30;      // half-spread width
const PAGE_H = 1.80;
const COVER_BLEED = 0.05; // covers sit slightly proud of the pages

// A page carries its call-to-action printed on it as a bordered plate, so it
// reads unmistakably as something you can click rather than as body text.
function drawPage(c, label) {
  const W = c.width, H = c.height;
  const x = c.getContext('2d');

  // ---- paper ---------------------------------------------------------------
  x.fillStyle = '#c0b49d';       // mid warm grey: the page is unlit, so this is
  x.fillRect(0, 0, W, H);        // literally what lands on screen
  for (let i = 0; i < 9000; i++) {
    x.fillStyle = `rgba(120,105,80,${Math.random() * 0.045})`;
    x.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4);
  }
  const g = x.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, 'rgba(90,72,48,.16)');
  g.addColorStop(0.22, 'rgba(90,72,48,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  if (!label) return;

  x.textAlign = 'center';
  x.textBaseline = 'middle';

  // ---- the button plate ----------------------------------------------------
  const bw = W * 0.62, bh = 132;
  const bx = (W - bw) / 2, by = H / 2 - bh / 2 - 16;
  const r = 6;

  const plate = (ox, oy, w, h, rad) => {
    x.beginPath();
    x.moveTo(ox + rad, oy);
    x.arcTo(ox + w, oy, ox + w, oy + h, rad);
    x.arcTo(ox + w, oy + h, ox, oy + h, rad);
    x.arcTo(ox, oy + h, ox, oy, rad);
    x.arcTo(ox, oy, ox + w, oy, rad);
    x.closePath();
  };

  plate(bx, by, bw, bh, r);
  x.fillStyle = 'rgba(59,47,34,.07)';         // faint ink wash inside the frame
  x.fill();
  x.strokeStyle = 'rgba(59,47,34,.85)';
  x.lineWidth = 3;
  x.stroke();

  // a second hairline inset, like a printed rule
  plate(bx + 9, by + 9, bw - 18, bh - 18, r - 2);
  x.strokeStyle = 'rgba(59,47,34,.32)';
  x.lineWidth = 1.5;
  x.stroke();

  // ---- label ---------------------------------------------------------------
  x.fillStyle = '#33291d';
  x.font = '400 62px "Instrument Serif", Georgia, "Times New Roman", serif';
  x.letterSpacing = '2px';
  x.fillText(label.text, W / 2, by + bh / 2 + 3);

  // ---- caption below the plate --------------------------------------------
  x.font = '400 30px Calibri, Carlito, "Segoe UI", system-ui, sans-serif';
  x.letterSpacing = '5px';
  x.fillStyle = 'rgba(51,41,29,.66)';
  x.fillText(label.sub.toUpperCase(), W / 2, by + bh + 58);
}

function pageTexture(label) {
  const c = document.createElement('canvas');
  c.width = 700; c.height = 980;
  drawPage(c, label);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;

  // The serif is a webfont; if it has not arrived yet the first draw silently
  // falls back to Georgia. Redraw once the real face is ready.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { drawPage(c, label); t.needsUpdate = true; });
  }
  return t;
}

/** Title drawn across the front cover. */
function coverTexture(title, numeral) {
  const W = 512, H = 700;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#00000000';
  x.clearRect(0, 0, W, H);

  x.strokeStyle = 'rgba(240,200,119,.55)';
  x.lineWidth = 4;
  x.strokeRect(38, 38, W - 76, H - 76);

  x.textAlign = 'center';
  x.fillStyle = '#f0c877';
  x.font = 'italic 46px Calibri, Carlito, "Segoe UI", system-ui, sans-serif';
  x.fillText(numeral, W / 2, 168);

  x.font = '600 52px Calibri, Carlito, "Segoe UI", system-ui, sans-serif';
  x.letterSpacing = '4px';
  const words = title.toUpperCase().split(' ');
  let y = H / 2 - (words.length - 1) * 34;
  for (const wd of words) { x.fillText(wd, W / 2, y); y += 68; }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function makeBook({ title, numeral, colour = 0x6d2f34 }) {
  const group = new THREE.Group();

  // The pages are unlit and untone-mapped on purpose. Lit by the scene they were
  // catching the chandelier spot and the shelf fills at point-blank range, going
  // far over 1.0 and blooming into a white glare. Rendering them flat means the
  // page always looks like paper no matter what the room lighting is doing.
  const mkPage = (label) => {
    const m = new THREE.MeshBasicMaterial({ map: pageTexture(label) });
    m.toneMapped = false;
    return m;
  };
  // Plain paper. The guide opens over the book on its own, so printed buttons
  // were affordances for something that no longer needs asking.
  const rightPageMat = mkPage(null);
  const leftPageMat = mkPage(null);
  const pageMat = rightPageMat;
  // Muted toward leather: at full saturation the spine showing in the gutter
  // reads as a bright plastic band next to the paper.
  const coverCol = new THREE.Color(colour).multiplyScalar(0.55);
  const coverMat = new THREE.MeshStandardMaterial({ color: coverCol, roughness: 0.78, metalness: 0.02 });
  const titleMat = new THREE.MeshBasicMaterial({ map: coverTexture(title, numeral), transparent: true });

  // ---- right half: fixed -----------------------------------------------------
  const rightHalf = new THREE.Group();
  group.add(rightHalf);

  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, PAGE_H, 0.045), rightPageMat);
  rightPage.position.set(PAGE_W / 2, 0, 0);
  rightHalf.add(rightPage);

  const backCover = new THREE.Mesh(
    new THREE.BoxGeometry(PAGE_W + COVER_BLEED, PAGE_H + COVER_BLEED, 0.05), coverMat);
  backCover.position.set(PAGE_W / 2, 0, -0.05);
  rightHalf.add(backCover);

  // ---- left half: swings on the spine ---------------------------------------
  const leftHalf = new THREE.Group();
  group.add(leftHalf);

  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, PAGE_H, 0.045), leftPageMat);
  leftPage.position.set(-PAGE_W / 2, 0, 0);
  leftHalf.add(leftPage);

  const frontCover = new THREE.Mesh(
    new THREE.BoxGeometry(PAGE_W + COVER_BLEED, PAGE_H + COVER_BLEED, 0.05), coverMat);
  frontCover.position.set(-PAGE_W / 2, 0, -0.05);
  leftHalf.add(frontCover);

  // title sits on the outside face of the front cover
  const titlePlate = new THREE.Mesh(new THREE.PlaneGeometry(PAGE_W * 0.92, PAGE_H * 0.92), titleMat);
  titlePlate.position.set(-PAGE_W / 2, 0, -0.081);
  titlePlate.rotation.y = Math.PI;   // faces out when the book is shut
  leftHalf.add(titlePlate);

  // spine
  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, PAGE_H + COVER_BLEED, 0.16), coverMat);
  spine.position.set(0, 0, 0);
  group.add(spine);

  group.visible = false;

  return {
    group, leftHalf, rightHalf, titleMat, pageMat,
    leftPage, rightPage,   // raycast targets: the printed words are the buttons
    /**
     * 0 = shut (front cover lying on the back cover), 1 = open flat with a slight V.
     */
    setOpen(k) {
      const eased = k * k * (3 - 2 * k);
      leftHalf.rotation.y = THREE.MathUtils.lerp(Math.PI, 0.13, eased);
      rightHalf.rotation.y = THREE.MathUtils.lerp(0, -0.13, eased);
      titleMat.opacity = 1 - eased;          // title fades as the cover turns away
      titleMat.visible = eased < 0.96;
      spine.rotation.y = THREE.MathUtils.lerp(0, 0, eased);
    }
  };
}
