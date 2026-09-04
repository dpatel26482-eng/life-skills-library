# Asset credits

All 3D assets and textures in `v3/assets/` are from [Poly Haven](https://polyhaven.com)
and are **CC0 (public domain)**. No attribution is legally required — this file exists so
we know what's in the build and where it came from.

## Models
| Asset | Used for |
|---|---|
| `ArmChair_01` | the armchair facing the island |
| `Chandelier_02` | the chandelier above the rotunda |

## Textures (2K, diffuse + normal + ARM)
| Asset | Used for |
|---|---|
| `rock_wall_07` | rotunda drum wall, fireplace stonework, hall pillars |
| `brown_planks_03` | rotunda floor, hall floor |
| `wood_table_001` | shelving, island carcass, hall shelf boards |
| `book_pattern` | every book spine (hall, island, floor stacks) |
| `fabric_pattern_07` | the rug |
| `brown_leather` | spare — not currently bound |

## HDRI
| Asset | Used for |
|---|---|
| `ballroom` (2K) | image-based lighting via `PMREMGenerator` |

**If we ever add CC-BY assets** (e.g. Sketchfab photogrammetry scans), they *do* require
visible credit — add a credits line to the page naming each author and licence before shipping.

## Note on the ARM convention
Poly Haven packs ambient occlusion / roughness / metalness into one image's R / G / B
channels. Three.js reads `aoMap` from R, `roughnessMap` from G and `metalnessMap` from B,
so `materials.js` binds the same texture to all three slots. `aoMap` also samples the
*second* UV set, which is why `enableAO()` copies `uv` into `uv1` on every primitive —
without it, ambient occlusion silently does nothing.
