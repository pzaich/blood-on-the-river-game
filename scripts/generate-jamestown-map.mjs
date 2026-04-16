/**
 * Generate the Jamestown TMX map using custom tileset
 *
 * Tile IDs (firstgid=1):
 *  1=grass, 2=grass2, 3=dirt, 4=dirt path, 5=water, 6=water wave, 7=sand, 8=mud
 *  9=tree trunk, 10=tree top, 11=log pile, 12=hay bale, 13=mud pile, 14=palisade, 15=construction, 16=stone
 * 17=house wall, 18=house roof, 19=door, 20=storehouse, 21=lookout base, 22=lookout top, 23=campfire, 24=flag pole
 * 25=forest dense, 26=bush, 27=flowers, 28=axe stump, 29=wood floor, 30=fence, 31=gate, 32=sign
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

const _ = 0
const GR = 1   // grass
const G2 = 2   // grass variant
const DI = 3   // dirt
const DP = 4   // dirt path
const WA = 5   // water
const WW = 6   // water wave
const SA = 7   // sand
const MU = 8   // mud
const TT = 9   // tree trunk
const TC = 10  // tree canopy
const LP = 11  // log pile
const HY = 12  // hay bale
const MP = 13  // mud pile
const PW = 14  // palisade wall
const CS = 15  // construction site
const ST = 16  // stone
const HW = 17  // house wall
const HR = 18  // house roof
const DR = 19  // door
const SH = 20  // storehouse
const LB = 21  // lookout base
const LT = 22  // lookout top
const CF = 23  // campfire
const FP = 24  // flag pole
const FD = 25  // forest dense
const BU = 26  // bush
const FL = 27  // flowers
const AX = 28  // axe stump
const WF = 29  // wood floor
const FE = 30  // fence
const GA = 31  // gate
const SI = 32  // sign

function encodeTiles(grid) {
  const height = grid.length
  const width = grid[0].length
  const buf = Buffer.alloc(width * height * 4)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      buf.writeUInt32LE(grid[y][x], (y * width + x) * 4)
    }
  }
  return buf.toString('base64')
}

// Map is 2x the original 30x25 for more open exploration space.
const W = 60, H = 50

// Layer 1: Ground (grass with dirt paths)
const ground = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    // Riverbank area (bottom 6 rows)
    if (y >= H - 6) return SA
    if (y >= H - 10 && (x + y) % 4 === 0) return SA
    // Central dirt area
    if (y >= 16 && y <= 32 && x >= 16 && x <= 42) return DI
    // Paths
    if (x === 30 && y >= 6 && y < H - 6) return DP   // N-S path
    if (y === 24 && x >= 6 && x < W - 6) return DP   // E-W path
    // Grass variety
    if ((x + y) % 5 === 0) return G2
    return GR
  })
)

// Layer 2: Features (trees, buildings, water, etc.)
const features = Array.from({ length: H }, () => Array(W).fill(_))

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Dense forest (top 4 rows, with gap at col 28-32 for Powhatan exit)
    if (y < 4 && !(x >= 28 && x <= 32)) {
      features[y][x] = (x + y) % 2 === 0 ? FD : TC
    }
    // Forest right edge (with gap at rows 22-26 for wilderness exit)
    if (x >= W - 4 && !(y >= 22 && y <= 26)) {
      features[y][x] = (x + y) % 2 === 0 ? FD : TC
    }
    // Left edge forest
    if (x < 4 && y < H - 6) {
      features[y][x] = (x + y) % 2 === 0 ? FD : TC
    }
    // Water (bottom 4 rows)
    if (y >= H - 4) {
      features[y][x] = (x + y) % 3 === 0 ? WW : WA
    }
    // Sandy riverbank transition
    if (y === H - 6 && x > 4 && x < W - 4) {
      if (x % 4 === 0) features[y][x] = BU
    }
  }
}

// Scattered trees in the clearing (positions 2x original)
const treePairs = [[8, 8], [12, 12], [6, 16], [10, 30], [14, 6], [44, 8], [48, 12], [46, 16]]
treePairs.forEach(([x, y]) => { if (!features[y][x]) features[y][x] = TT })

// Bushes and flowers
const bushes = [[16, 12], [40, 10], [20, 36], [44, 34]]
bushes.forEach(([x, y]) => { if (!features[y][x]) features[y][x] = BU })
const flowers = [[24, 14], [36, 18], [12, 28]]
flowers.forEach(([x, y]) => { if (!features[y][x]) features[y][x] = FL })

// Campfire in center
features[20][28] = CF

// Sign at entrance
features[6][30] = SI

const objects = [
  // Player start (center of clearing)
  { id: 1, name: 'start', class: 'start', x: 30 * 32, y: 20 * 32 },

  // Map exits
  { id: 2, name: 'to-wilderness', x: 56 * 32, y: 24 * 32 },       // east edge gap
  { id: 3, name: 'to-powhatan', x: 30 * 32, y: 1 * 32 },           // north edge gap

  // NPCs
  { id: 4, name: 'carpenter', x: 24 * 32, y: 20 * 32 },
  { id: 5, name: 'captain-smith-jt', x: 32 * 32, y: 16 * 32 },

  // Choppable trees (along forest edge, walkable tiles nearby)
  { id: 10, name: 'tree-1', x: 6 * 32, y: 8 * 32 },
  { id: 11, name: 'tree-2', x: 10 * 32, y: 6 * 32 },
  { id: 12, name: 'tree-3', x: 14 * 32, y: 6 * 32 },
  { id: 13, name: 'tree-4', x: 6 * 32, y: 12 * 32 },
  { id: 14, name: 'tree-5', x: 6 * 32, y: 18 * 32 },
  { id: 15, name: 'tree-6', x: 48 * 32, y: 8 * 32 },
  { id: 16, name: 'tree-7', x: 46 * 32, y: 12 * 32 },
  { id: 17, name: 'tree-8', x: 48 * 32, y: 16 * 32 },
  { id: 18, name: 'tree-9', x: 10 * 32, y: 32 * 32 },
  { id: 19, name: 'tree-10', x: 44 * 32, y: 32 * 32 },

  // Hay bales (near riverbank)
  { id: 20, name: 'hay-1', x: 12 * 32, y: 40 * 32 },
  { id: 21, name: 'hay-2', x: 16 * 32, y: 42 * 32 },
  { id: 22, name: 'hay-3', x: 20 * 32, y: 40 * 32 },
  { id: 23, name: 'hay-4', x: 36 * 32, y: 40 * 32 },
  { id: 24, name: 'hay-5', x: 40 * 32, y: 42 * 32 },

  // Mud piles (near riverbank)
  { id: 25, name: 'mud-1', x: 24 * 32, y: 42 * 32 },
  { id: 26, name: 'mud-2', x: 28 * 32, y: 40 * 32 },
  { id: 27, name: 'mud-3', x: 44 * 32, y: 40 * 32 },
  { id: 28, name: 'mud-4', x: 48 * 32, y: 42 * 32 },
  { id: 29, name: 'mud-5', x: 32 * 32, y: 42 * 32 },

  // Construction sites (4 palisade wall segments)
  { id: 30, name: 'construction-1', x: 16 * 32, y: 16 * 32 },    // west wall
  { id: 31, name: 'construction-2', x: 42 * 32, y: 16 * 32 },    // east wall
  { id: 32, name: 'construction-3', x: 16 * 32, y: 32 * 32 },    // SW wall
  { id: 33, name: 'construction-4', x: 42 * 32, y: 32 * 32 },    // SE wall

  // Storehouse site
  { id: 34, name: 'storehouse-site', x: 36 * 32, y: 28 * 32 },

  // Lookout tower site (south, near river)
  { id: 35, name: 'lookout-site', x: 30 * 32, y: 38 * 32 },

  // Quest 5 NPCs
  { id: 36, name: 'namontack-jt', x: 28 * 32, y: 6 * 32 },      // Namontack at north gate
  { id: 37, name: 'settler', x: 20 * 32, y: 24 * 32 },           // Settler in clearing
  { id: 38, name: 'lookout-defend', x: 30 * 32, y: 36 * 32 },    // Lookout defense point
]

const objectXml = objects.map(obj =>
  `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
).join('\n')

const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${Math.max(...objects.map(o => o.id)) + 1}">
 <tileset firstgid="1" source="jamestown-tiles.tsx"/>
 <layer id="1" name="Ground" width="${W}" height="${H}">
  <data encoding="base64">
   ${encodeTiles(ground)}
  </data>
 </layer>
 <layer id="2" name="Features" width="${W}" height="${H}">
  <data encoding="base64">
   ${encodeTiles(features)}
  </data>
 </layer>
 <objectgroup id="3" name="Events">
${objectXml}
 </objectgroup>
</map>
`

writeFileSync(join(mapsDir, 'jamestown.tmx'), tmx)
console.log(`Generated jamestown.tmx (${W}x${H}) with custom tileset`)
