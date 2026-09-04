# Learning Common Life Skill Guide

A 3D scroll-driven guide to budgeting, tax and superannuation. Walk down a library
hall, arrive in a circular reading room, orbit the bookcase and pull a book off the
shelf to read it.

**Live:** https://deploy-henna-six-81.vercel.app

## What it is

A **static site** — plain HTML, CSS and JavaScript. No framework, no bundler, no
build step, and it does not run on Node. Any static host can serve it.

The 3D is [Three.js](https://threejs.org) with native ES modules loaded through an
importmap; smooth scrolling is [Lenis](https://lenis.darkroom.engineering). Both are
vendored into `v3/vendor/`, so nothing is fetched at build time.

## Deploying

`v3/` **is** the site. Point the host at that folder — no build command.

On Vercel, set **Root Directory** to `v3` and leave the build settings empty
(Framework Preset: Other, no build command, output directory `.`).

## Layout

| Path | What |
|---|---|
| `v3/index.html` | the page |
| `v3/world.js` | scene, camera, scroll, picking, post-processing |
| `v3/rotunda.js` | the circular reading room and its contents |
| `v3/book.js` | the book that flies off the shelf and opens |
| `v3/materials.js` | PBR material helpers, bevelled boxes, canvas textures |
| `v3/reader.js` | the paginated guide reader |
| `v3/books-data.js` | guide content for all three topics |
| `v3/assets/` | models, textures and HDRI (CC0 — see `v3/CREDITS.md`) |
| `v3/vendor/` | Three.js and Lenis |

`index.html` and `script.js` at the top level are an **earlier CSS-only version**,
kept as a fallback. `_v1-*` and `_v2-*` are older snapshots.

## Running locally

```bash
cd v3 && python3 -m http.server 4322
```

Then open http://localhost:4322. It must be served over HTTP — opening
`index.html` from the filesystem will not work, because ES modules and the
importmap require a real origin.

## Notes

- `node_modules/` is only used to refresh `v3/vendor/`; it is not needed to run or
  deploy the site.
- Assets are ~50 MB, mostly textures and the HDRI. Fine on broadband, slow on
  mobile data — worth compressing before putting a custom domain in front of it.
- Debug hooks are exposed on `window.__world` (`stats()`, `bench()`, `exposure()`,
  `shelfLight()`, `focusBook()`, `jumpTo()`).
