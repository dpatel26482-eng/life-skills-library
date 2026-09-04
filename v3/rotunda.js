// =============================================================================
//  THE ROTUNDA — the circular chamber the hall opens into.
//
//  Curved stone drum, a central island (bookshelf over a fireplace), an armchair
//  facing it, book stacks on the floor and a chandelier overhead. The camera
//  orbits the island rather than facing a flat wall.
// =============================================================================

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { pbr, enableAO, box, spineLabel, glowSprite } from './materials.js';

export const ROT_R = 16.5;      // drum radius
export const ROT_H = 14;        // drum height

const GOLD = 0xf0c877;

export function buildRotunda(centreZ) {
  const g = new THREE.Group();
  g.position.z = centreZ;

  // ---------------------------------------------------------------- the drum --
  const wallGeo = enableAO(new THREE.CylinderGeometry(ROT_R, ROT_R, ROT_H, 96, 6, true));
  const wall = new THREE.Mesh(
    wallGeo,
    pbr('rock_wall_07', { repeat: [12, 3], roughness: 1, metalness: 0.9, normalScale: 1.5, side: THREE.BackSide })
  );
  wall.position.y = ROT_H / 2;
  wall.receiveShadow = true;
  g.add(wall);

  // floor
  const floorGeo = enableAO(new THREE.CircleGeometry(ROT_R, 96));
  const floor = new THREE.Mesh(floorGeo, pbr('brown_planks_03', { repeat: [9, 9], roughness: 1, metalness: 0.85 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  g.add(floor);

  // a dark cap so we never see out of the top
  const cap = new THREE.Mesh(
    new THREE.CircleGeometry(ROT_R, 64),
    new THREE.MeshStandardMaterial({ color: 0x0b0a09, roughness: 1, side: THREE.BackSide })
  );
  cap.rotation.x = -Math.PI / 2;
  cap.position.y = ROT_H;
  g.add(cap);

  // rug under the island
  const rug = new THREE.Mesh(
    enableAO(new THREE.CircleGeometry(5.6, 64)),
    pbr('fabric_pattern_07', { repeat: [3, 3], color: 0x6b5847, roughness: 1, metalness: 0.4 })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.012;
  rug.receiveShadow = true;
  g.add(rug);

  // ------------------------------------------------------------- the island --
  const island = new THREE.Group();
  g.add(island);

  const woodMat = pbr('wood_table_001', { repeat: [2, 2], roughness: 1, metalness: 0.8 });
  const bookMat = pbr('book_pattern', { repeat: [1, 1], roughness: 1, metalness: 0.7 });

  // Central spine of the unit. The island is freestanding and dressed on BOTH
  // faces, so the camera can travel a full circle without ever facing a blank slab.
  const slab = new THREE.Mesh(box(5.4, 7.7, 0.6, 0.04), woodMat);
  slab.position.set(0, 3.85, -0.6);
  slab.castShadow = slab.receiveShadow = true;
  island.add(slab);

  // side returns wrap both faces, so it reads as one piece of furniture in the round
  for (const dx of [-2.7, 2.7]) {
    const side = new THREE.Mesh(box(0.36, 7.7, 3.4, 0.03), woodMat);
    side.position.set(dx, 3.85, -0.6);
    side.castShadow = true;
    island.add(side);
  }

  // shelf boards + the books standing on them
  const SHELF_Y = [2.6, 3.9, 5.2, 6.5, 7.6];
  const FACES = [{ z: 0.5, dir: 1 }, { z: -1.7, dir: -1 }];   // front and back
  for (const face of FACES) {
    for (const y of SHELF_Y) {
      const board = new THREE.Mesh(box(5.2, 0.13, 1.7, 0.02), woodMat);
      board.position.set(0, y, face.z);
      board.castShadow = board.receiveShadow = true;
      island.add(board);
    }
  }
  // the back face gets its own shelving down to the floor, in place of the hearth
  for (const y of [0.5, 1.3, 2.1]) {
    const board = new THREE.Mesh(box(5.2, 0.13, 1.7, 0.02), woodMat);
    board.position.set(0, y, -1.7);
    board.castShadow = true;
    island.add(board);
  }

  // Side faces: shallow shelving on the x-facing ends. Without these, the orbit
  // passes through two angles where the unit is just a tall blank slab.
  const SIDE_X = [-2.98, 2.98];
  for (const sx of SIDE_X) {
    for (const y of [1.0, 2.2, 3.4, 4.6, 5.8, 7.0]) {
      const board = new THREE.Mesh(box(0.62, 0.12, 2.9, 0.02), woodMat);
      board.position.set(sx, y, -0.6);
      board.castShadow = true;
      island.add(board);
    }
  }

  // filler spines: instanced, textured, one draw call
  const spineGeo = box(1, 1, 1, 0.055, 2);   // bevelled: books catch an edge highlight
  const spines = new THREE.InstancedMesh(spineGeo, bookMat, 26 * 44);
  {
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    let n = 0;
    const rows = [];
    for (const face of FACES) for (const y of SHELF_Y) rows.push({ y, z: face.z, axis: 'z' });
    for (const y of [0.5, 1.3, 2.1]) rows.push({ y, z: -1.7, axis: 'z' });
    for (const sx of SIDE_X) for (const y of [1.0, 2.2, 3.4, 4.6, 5.8, 7.0]) rows.push({ y, x: sx, axis: 'x' });

    for (const row of rows) {
      const y = row.y;
      if (row.axis === 'x') {
        // books run along z on the side faces, rotated a quarter turn
        let z = -1.9;
        while (z < 0.7) {
          const w = 0.13 + Math.random() * 0.15;
          const h = 0.55 + Math.random() * 0.4;
          m.makeScale(0.52, h, w);
          m.setPosition(row.x, y + 0.06 + h / 2, z + w / 2);
          spines.setMatrixAt(n, m);
          c.setHSL(0.07 + Math.random() * 0.06, 0.22 + Math.random() * 0.2, 0.16 + Math.random() * 0.2);
          spines.setColorAt(n, c);
          n++;
          z += w + 0.035;
        }
        continue;
      }
      let x = -2.4;
      while (x < 2.3) {
        const w = 0.13 + Math.random() * 0.15;
        const h = 0.6 + Math.random() * 0.45;
        m.makeScale(w, h, 0.52);
        m.setPosition(x + w / 2, y + 0.065 + h / 2, row.z);
        spines.setMatrixAt(n, m);
        c.setHSL(0.07 + Math.random() * 0.06, 0.22 + Math.random() * 0.2, 0.16 + Math.random() * 0.2);
        spines.setColorAt(n, c);
        n++;
        x += w + 0.035;
      }
    }
    spines.count = n;
    spines.instanceMatrix.needsUpdate = true;
    if (spines.instanceColor) spines.instanceColor.needsUpdate = true;
  }
  spines.castShadow = true;
  island.add(spines);

  // ------------------------------------------------------------- fireplace --
  const stoneMat = pbr('rock_wall_07', { repeat: [2, 1], roughness: 1, metalness: 0.9 });
  const mantel = new THREE.Mesh(box(4.2, 0.34, 1.5, 0.05), stoneMat);
  mantel.position.set(0, 2.35, 0.62);
  mantel.castShadow = true;
  island.add(mantel);

  for (const dx of [-1.7, 1.7]) {
    const jamb = new THREE.Mesh(box(0.8, 2.35, 1.4, 0.05), stoneMat);
    jamb.position.set(dx, 1.17, 0.62);
    jamb.castShadow = true;
    island.add(jamb);
  }
  const lintel = new THREE.Mesh(box(2.7, 0.5, 1.4, 0.05), stoneMat);
  lintel.position.set(0, 1.93, 0.62);
  island.add(lintel);

  // the fire itself — an emissive slab plus a flickering light
  const fireBack = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.3),
    new THREE.MeshStandardMaterial({ color: 0x120b07, roughness: 1 })
  );
  fireBack.position.set(0, 1.1, 0.05);
  island.add(fireBack);

  const fire = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.85),
    new THREE.MeshBasicMaterial({
      color: 0xff9a45, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
  );
  fire.position.set(0, 0.5, 0.35);   // recessed into the hearth, not on the face
  island.add(fire);

  const fireLight = new THREE.PointLight(0xff9a45, 30, 17, 2);
  fireLight.position.set(0, 1.0, 1.6);
  island.add(fireLight);              // no shadow: a point shadow costs 6 renders

  // ------------------------------------------------------- the three books --
  // Two on the front face, one on the back — so completing the orbit is the point.
  const FEATURED = [
    { id: 'budgeting', title: 'Budgeting', numeral: 'I', colour: 0x3f7d63, y: 5.2, x: -1.5, z: 0.5, dir: 1 },
    { id: 'tax', title: 'Tax', numeral: 'II', colour: 0x9c3f47, y: 3.9, x: 0.85, z: 0.5, dir: 1 },
    { id: 'super', title: 'Superannuation', numeral: 'III', colour: 0x3f5da8, y: 5.2, x: 0.9, z: -1.7, dir: -1 }
  ];

  const pickable = [];
  for (const spec of FEATURED) {
    const mat = new THREE.MeshStandardMaterial({
      color: spec.colour,
      map: bookMat.map,
      normalMap: bookMat.normalMap,
      roughness: 0.62,
      metalness: 0.02,
      emissive: new THREE.Color(GOLD),
      emissiveIntensity: 0.16
    });
    // a touch proud of the row, as if half-pulled already
    const mesh = new THREE.Mesh(box(0.34, 1.12, 0.62, 0.03, 2), mat);
    const y = spec.y + 0.065 + 0.56;
    mesh.position.set(spec.x, y, spec.z + spec.dir * 0.07);
    mesh.castShadow = true;
    mesh.userData = { ...spec, home: mesh.position.clone() };
    island.add(mesh);
    pickable.push(mesh);

    // topic text running up the spine, on a thin plane just proud of the face
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 1.06),
      new THREE.MeshBasicMaterial({
        map: spineLabel(spec.title), transparent: true, depthWrite: false
      })
    );
    label.position.set(spec.x, y, spec.z + spec.dir * 0.386);
    label.userData.ignoreRay = true;
    if (spec.dir < 0) label.rotation.y = Math.PI;
    island.add(label);
    mesh.userData.label = label;

    // outer glow, so a lit book reads from across the room
    const glow = glowSprite('#f0c877', 2.1);
    glow.position.set(spec.x, y, spec.z + spec.dir * 0.5);
    island.add(glow);
    mesh.userData.glow = glow;

    const halo = new THREE.PointLight(GOLD, 3.0, 3.8, 2);
    halo.position.set(spec.x, y, spec.z + spec.dir * 1.1);
    island.add(halo);
  }

  // --------------------------------------------------------- book stacks --
  const stackGeo = box(1, 1, 1, 0.06, 2);
  const stacks = new THREE.InstancedMesh(stackGeo, bookMat, 200);
  {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const c = new THREE.Color();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    let n = 0;
    for (let s = 0; s < 22 && n < 200; s++) {
      // ring them around the island, clear of the chair
      const a = (s / 22) * Math.PI * 2 + Math.random() * 0.2;
      const r = 5.2 + Math.random() * 7.4;
      const bx = Math.cos(a) * r, bz = Math.sin(a) * r;
      const tall = 2 + Math.floor(Math.random() * 5);
      let y = 0;
      for (let b = 0; b < tall && n < 200; b++) {
        const w = 0.85 + Math.random() * 0.5, h = 0.13 + Math.random() * 0.08, d = 0.62 + Math.random() * 0.3;
        scl.set(w, h, d);
        pos.set(bx + (Math.random() - 0.5) * 0.16, y + h / 2, bz + (Math.random() - 0.5) * 0.16);
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), a + (Math.random() - 0.5) * 0.5);
        m.compose(pos, q, scl);
        stacks.setMatrixAt(n, m);
        c.setHSL(0.07 + Math.random() * 0.05, 0.2 + Math.random() * 0.2, 0.14 + Math.random() * 0.18);
        stacks.setColorAt(n, c);
        n++;
        y += h + 0.006;
      }
    }
    stacks.count = n;
    stacks.instanceMatrix.needsUpdate = true;
    if (stacks.instanceColor) stacks.instanceColor.needsUpdate = true;
  }
  stacks.castShadow = stacks.receiveShadow = true;
  g.add(stacks);

  // ------------------------------------------------------------ ambient --
  // Warm bounce on each side of the island so both faces of the shelving read.
  // These are unshadowed on purpose: they fill the darks without adding more
  // hard shadow edges, which keeps the room readable but still moody.
  for (const dz of [7.5, -7.5]) {
    const bounce = new THREE.PointLight(0xffc98a, 13, 20, 2);
    bounce.position.set(0, 6, dz);
    g.add(bounce);
  }
  // The island's side returns face neither bounce light, so without these they
  // read as flat black slabs against a lit wall.
  for (const dx of [-7.5, 7.5]) {
    const side = new THREE.PointLight(0xffc07a, 8, 16, 2);
    side.position.set(dx, 5.2, -0.6);
    g.add(side);
  }

  // Face-on fills at shelf height, one per face. A top-down spot doesn't work here:
  // every shelf board shadows the one below it, so only the top shelf lit up. These
  // sit out in front of each face instead, wash the spines evenly, and cast no
  // shadows — the bookcase reads while the rest of the drum stays dark.
  const faceFills = [];
  for (const dz of [5.5, -6.7]) {
    const faceFill = new THREE.PointLight(0xffcf9a, 20, 15, 2);
    faceFill.position.set(0, 4.6, dz);
    g.add(faceFill);
    faceFills.push(faceFill);
  }

  // ---------------------------------------------------------- wall torches --
  // Small sconces set into the drum wall. Deliberately low intensity with a short
  // reach: they pick out the brickwork beside them and leave the rest of the room
  // dark, rather than lighting the whole space.
  const torchFlames = [];
  const TORCH_COUNT = 6;
  const torchMat = new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0.9, metalness: 0.3 });
  for (let i = 0; i < TORCH_COUNT; i++) {
    const a = (i / TORCH_COUNT) * Math.PI * 2 + Math.PI / TORCH_COUNT;
    const ty = 5.6;
    const torch = new THREE.Group();
    torch.position.set(Math.cos(a) * (ROT_R - 0.35), ty, Math.sin(a) * (ROT_R - 0.35));
    torch.lookAt(0, ty, 0);                       // bracket points into the room

    const bracket = new THREE.Mesh(box(0.15, 0.15, 0.46, 0.03), torchMat);
    bracket.position.set(0, 0, 0.23);
    torch.add(bracket);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.58, 8), torchMat);
    shaft.position.set(0, 0.24, 0.44);
    shaft.rotation.x = 0.3;
    torch.add(shaft);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffb057, transparent: true, opacity: 0.95 })
    );
    flame.position.set(0, 0.56, 0.52);
    flame.scale.set(1, 1.5, 1);
    torch.add(flame);

    const halo = glowSprite('#ff9a45', 1.05);
    halo.position.copy(flame.position);
    halo.material.opacity = 0.28;
    torch.add(halo);

    const light = new THREE.PointLight(0xffa457, 6.5, 9, 2);
    light.position.copy(flame.position);
    torch.add(light);

    g.add(torch);
    torchFlames.push({ flame, light, halo, seed: Math.random() * 10, base: 6.5 });
  }

  return { group: g, island, pickable, fire, fireLight, faceFills, torchFlames };
}

/** Load the CC0 armchair and chandelier and place them in the drum. */
export async function loadProps(group, onLight) {
  const loader = new GLTFLoader();

  const [chairGltf, chandGltf] = await Promise.all([
    loader.loadAsync('assets/models/ArmChair_01/ArmChair_01_2k.gltf'),
    loader.loadAsync('assets/models/Chandelier_02/Chandelier_02_2k.gltf')
  ]);

  const chair = chairGltf.scene;
  chair.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  chair.scale.setScalar(2.6);
  chair.position.set(1.9, 0, 3.6);
  chair.rotation.y = -0.7;
  group.add(chair);

  const chandelier = chandGltf.scene;
  chandelier.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  chandelier.scale.setScalar(3.4);
  chandelier.position.set(0, ROT_H - 4.9, 0);   // low enough to sit in frame
  group.add(chandelier);

  // A SpotLight, not a PointLight: a spot shadow is one render, a point shadow is
  // six. This is the only shadow-caster left in the scene, and it is the one that
  // matters — it throws the bookcase's shadow across the floor.
  const candle = new THREE.SpotLight(0xffd9a0, 220, 34, Math.PI / 2.6, 0.9, 2);
  candle.position.set(0, ROT_H - 1.8, 0);   // clear of the island's top
  candle.target.position.set(0, 0, 0);
  candle.castShadow = true;
  candle.shadow.mapSize.set(1024, 1024);
  candle.shadow.bias = -0.0015;
  candle.shadow.camera.near = 1;
  candle.shadow.camera.far = 36;
  group.add(candle);
  group.add(candle.target);

  // warm halo around the fitting so the source itself reads from across the room
  const halo = glowSprite('#ffd9a0', 4.2);
  halo.position.set(0, ROT_H - 4.7, 0);     // sits on the fitting, not the light
  halo.material.opacity = 0.3;
  group.add(halo);

  onLight?.(candle);

  return { chair, chandelier, candle, halo };
}
