# Getting v3 to reference calibre

The code is done and the seams are in place. What separates this from cursed.epic.net
is **geometry** — theirs is scanned/modelled, ours is procedural boxes. Drop real assets
in and the same scene code renders them.

## 1. Grab a library interior (biggest single upgrade)

Put `.glb` files in `v3/assets/`.

**Sketchfab** — filter to *Downloadable* + license *CC0* or *CC-BY*. Search terms that work:
- `library interior photogrammetry`
- `old library scan`
- `bookshelf scan`
- `abandoned library 3d scan`

**Poly Haven** (all CC0, no attribution needed): https://polyhaven.com/models — plus their
HDRIs and textures, below.

**Quaternius / Kenney** — CC0, stylised rather than photoreal; good if we go stylised.

> **Licence note:** CC-BY requires visible attribution. Keep the author + link for anything
> CC-BY and we'll add a credits line. CC0 needs nothing. Don't use anything marked
> "Editorial use only" or non-commercial if this ships publicly.

Then, in the browser console (or I'll wire it in permanently):

```js
__world.loadGLB('assets/library.glb', { replace: 'hall', scale: 1, y: 0 })
```

`replace` takes `'hall'` or `'shelf'`. Camera path, scroll, raycast picking and the
post-processing stack all keep working — only the meshes change.

## 2. HDRI lighting (cheap, big realism win)

Poly Haven → HDRIs → anything warm and interior-ish, 2K is plenty.
Save as `v3/assets/env.hdr`. This replaces guessed point lights with real
image-based lighting and is usually the difference between "CG" and "photographed".

## 3. Tooling I can't install myself

These need your password, so run them yourself:

```bash
brew install ffmpeg
```

Unlocks the era-residence technique properly: turning footage or a render into an
optimised frame sequence for canvas scrubbing. Also lets me read video you send me
directly instead of compiling a Swift frame extractor.

```bash
brew install --cask blender
```

Lets me script Blender headlessly (Python) to model a hall and render a camera-path
fly-through to a frame sequence — the legitimate route to the era-residence hero
without buying stock footage.

## 4. Higgsfield

Currently free-plan: **video generation is blocked entirely**, and 3D meshes cost 20
credits against a balance of 4. A basic plan unlocks video. Note `image_to_3d` produces
*single objects* — good for a hero book or lamp, not a walkable room.

## What would help most now (in order)

The scene already has PBR textures, HDRI lighting and bevelled edges. What's left is
**geometry density and real furniture** — the remaining "blocky" read comes from the
island and shelving still being boxes.

1. **Photogrammetry-scanned shelving / library interiors.** This is the single remaining
   step-change. Sketchfab, filtered to *Downloadable* + CC-BY, search:
   `library interior scan`, `bookshelf photogrammetry`, `old bookcase scan`,
   `antique furniture scan`. CC-BY needs a visible credit line — send the author name
   and link with each file. Drop `.glb` files in `v3/assets/models/`.
2. **More CC0 props for density.** The reference is *cluttered* — that's a lot of why it
   reads as real. Poly Haven has (all CC0, I can fetch these myself on request):
   `Shelf_01`, `Lantern_01`, `Ottoman_01`, `Sofa_01`, `WoodenChair_01`, `Rockingchair_01`,
   plus candle/book/frame props.
3. **A darker, warmer interior HDRI.** `ballroom` is doing the job but is fairly neutral.
   Something firelit would seat the room better.
4. **Reference stills of the exact look you want** — screenshots are enough. Lighting
   balance is the most subjective part and I'm currently guessing at your target.

Nothing here needs a purchase. Items 1–3 are free; I can fetch anything on Poly Haven
directly, and only Sketchfab CC-BY files need you to pick and send them.

## Current state without any of the above

- Procedural hall: ~13 bays, instanced books (one draw call for hundreds of spines)
- Scroll-driven camera on a Catmull-Rom spline, Lenis-smoothed
- Three raycast-pickable lit books → fly-out → existing flip reader
- Bloom + film grain + chromatic aberration + vignette
- Honest ceiling: strong indie WebGL. Lighting and grade carry it; the box geometry is the tell.
