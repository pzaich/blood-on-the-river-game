/**
 * Generate Jamestown map — triangular fort on James River
 *
 * Shared tileset (ship-tiles.tsx) tile IDs (firstgid=1):
 * Row 0: 1=grass, 2=grass2, 3=dirt, 4=path, 5=river, 6=shallow, 7=sand, 8=mud
 * Row 1: 9=pine, 10=oak, 11=palisade-v, 12=palisade-h, 13=gate, 14=house, 15=storehouse, 16=watchtower
 * Row 2: 17=campfire, 18=log pile, 19=hay, 20=mud pile, 21=crate, 22=barrel, 23=construction, 24=cannon
 * Row 3: 25=flowers, 26=bush, 27=sign, 28=well, 29=dense forest, 30=river edge, 31=corner wall, 32=dock
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

function encodeTiles(grid) {
  const h = grid.length, w = grid[0].length
  const buf = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++)
    buf.writeUInt32LE(grid[y][x], (y * w + x) * 4)
  return buf.toString('base64')
}

const _ = 0
const GR = 1, G2 = 2, DI = 3, PA = 4, RV = 5, SW = 6, SA = 7, MU = 8
const PN = 9, OK = 10, PV = 11, PH = 12, GA = 13, HO = 14, SH = 15, WT = 16
const CF = 17, LP = 18, HY = 19, MP = 20, CR = 21, BR = 22, CS = 23, CN = 24
const FL = 25, BU = 26, SI = 27, WL = 28, DF = 29, RE = 30, CW = 31, DK = 32

const W = 25, H = 20

// Layer 1: Ground — grass with river along bottom, paths inside fort
const ground = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    // James River (bottom 3 rows)
    if (y >= H - 3) return RV
    if (y === H - 4) return RE  // river edge/beach
    // Inside fort area paths
    if (y >= 4 && y <= 14 && x === 12) return PA // N-S central path
    if (y === 9 && x >= 5 && x <= 19) return PA  // E-W path
    // Dirt around buildings
    if (y >= 6 && y <= 12 && x >= 7 && x <= 17) return DI
    // Grass variety
    if ((x + y) % 5 === 0) return G2
    return GR
  })
)

// Layer 2: Features — fort walls, trees, buildings
const features = Array.from({ length: H }, () => Array(W).fill(_))

// Dense forest (top 2 rows with gap at col 12 for Powhatan exit)
for (let x = 0; x < W; x++) {
  if (!(x >= 11 && x <= 13)) {
    features[0][x] = DF
    features[1][x] = (x % 2 === 0) ? PN : OK
  }
}

// Forest on left and right edges
for (let y = 2; y < H - 4; y++) {
  if (y < 4 || y > 14) {
    if (y < H - 4) features[y][0] = DF
    if (y < H - 4) features[y][W-1] = DF
  }
}

// === TRIANGULAR PALISADE FORT ===
// The real James Fort was roughly triangular, point facing the river
// Top wall (north) — horizontal palisade from col 4 to col 20, row 3
for (let x = 4; x <= 20; x++) features[3][x] = PH
features[3][4] = CW  // corner
features[3][20] = CW  // corner

// Left wall (west) — diagonal from (4,3) to (12,15)
for (let y = 4; y <= 14; y++) {
  const x = 4 + Math.round((y - 4) * 8 / 10)
  if (x >= 0 && x < W) features[y][x] = PV
}

// Right wall (east) — diagonal from (20,3) to (12,15)
for (let y = 4; y <= 14; y++) {
  const x = 20 - Math.round((y - 4) * 8 / 10)
  if (x >= 0 && x < W) features[y][x] = PV
}

// South point of triangle
features[15][12] = CW

// Gate on north wall
features[3][12] = GA

// === BUILDINGS INSIDE FORT ===
// Church (center-north)
features[5][11] = HO
features[5][13] = HO

// Storehouse (left side)
features[7][8] = SH

// Houses (scattered)
features[8][15] = HO
features[10][9] = HO
features[11][14] = HO

// Watchtower (near south point)
features[13][12] = WT

// Campfire (center)
features[10][14] = CF  // campfire offset from player start

// Well
features[7][12] = WL

// Cannon at south point
features[14][11] = CN
features[14][13] = CN

// Dock on river
features[H-4][12] = DK

// Scattered bushes and flowers outside fort
features[2][2] = BU; features[2][22] = BU
features[2][8] = FL; features[2][16] = FL
features[H-4][4] = BU; features[H-4][20] = BU

// Sign at gate
features[2][12] = SI

const objects = [
  // Player start (inside fort center)
  { id: 1, name: 'start', class: 'start', x: 12 * 32, y: 9 * 32 },

  // Map exits
  { id: 2, name: 'to-wilderness', x: 24 * 32, y: 9 * 32 },
  { id: 3, name: 'to-powhatan', x: 12 * 32, y: 0 * 32 },

  // NPCs
  { id: 4, name: 'captain-smith-jt', x: 11 * 32, y: 6 * 32 },
  { id: 5, name: 'carpenter', x: 9 * 32, y: 8 * 32 },

  // Trees (along forest edge, outside fort)
  { id: 10, name: 'tree-1', x: 2 * 32, y: 3 * 32 },
  { id: 11, name: 'tree-2', x: 3 * 32, y: 5 * 32 },
  { id: 12, name: 'tree-3', x: 2 * 32, y: 7 * 32 },
  { id: 13, name: 'tree-4', x: 22 * 32, y: 3 * 32 },
  { id: 14, name: 'tree-5', x: 22 * 32, y: 5 * 32 },
  { id: 15, name: 'tree-6', x: 22 * 32, y: 7 * 32 },
  { id: 16, name: 'tree-7', x: 2 * 32, y: 10 * 32 },
  { id: 17, name: 'tree-8', x: 22 * 32, y: 10 * 32 },
  { id: 18, name: 'tree-9', x: 3 * 32, y: 12 * 32 },
  { id: 19, name: 'tree-10', x: 21 * 32, y: 12 * 32 },

  // Hay bales (near river beach)
  { id: 20, name: 'hay-1', x: 6 * 32, y: 15 * 32 },
  { id: 21, name: 'hay-2', x: 8 * 32, y: 15 * 32 },
  { id: 22, name: 'hay-3', x: 10 * 32, y: 15 * 32 },
  { id: 23, name: 'hay-4', x: 14 * 32, y: 15 * 32 },
  { id: 24, name: 'hay-5', x: 16 * 32, y: 15 * 32 },

  // Mud piles (river edge)
  { id: 25, name: 'mud-1', x: 4 * 32, y: 16 * 32 },
  { id: 26, name: 'mud-2', x: 7 * 32, y: 16 * 32 },
  { id: 27, name: 'mud-3', x: 15 * 32, y: 16 * 32 },
  { id: 28, name: 'mud-4', x: 18 * 32, y: 16 * 32 },
  { id: 29, name: 'mud-5', x: 20 * 32, y: 16 * 32 },

  // Construction sites (on fort walls)
  { id: 30, name: 'construction-1', x: 7 * 32, y: 5 * 32 },
  { id: 31, name: 'construction-2', x: 17 * 32, y: 5 * 32 },
  { id: 32, name: 'construction-3', x: 6 * 32, y: 11 * 32 },
  { id: 33, name: 'construction-4', x: 18 * 32, y: 11 * 32 },

  // Storehouse and lookout sites
  { id: 34, name: 'storehouse-site', x: 15 * 32, y: 7 * 32 },
  { id: 35, name: 'lookout-site', x: 12 * 32, y: 14 * 32 },

  // House sites (4 houses to build in quest 2f)
  { id: 36, name: 'house-site-1', x: 10 * 32, y: 7 * 32 },
  { id: 37, name: 'house-site-2', x: 14 * 32, y: 7 * 32 },
  { id: 38, name: 'house-site-3', x: 10 * 32, y: 11 * 32 },
  { id: 39, name: 'house-site-4', x: 14 * 32, y: 11 * 32 },

  // Quest 5 NPCs
  { id: 40, name: 'namontack-jt', x: 12 * 32, y: 2 * 32 },
  { id: 41, name: 'settler', x: 10 * 32, y: 10 * 32 },
  { id: 42, name: 'lookout-defend', x: 12 * 32, y: 13 * 32 },
]

const maxId = Math.max(...objects.map(o => o.id))

const objectXml = objects.map(obj =>
  `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
).join('\n')

const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${maxId + 1}">
 <tileset firstgid="1" source="ship-tiles.tsx"/>
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

// Also regenerate wilderness and powhatan with same tileset
function makeMap(name, w, h, groundFn, featuresFn, objList) {
  const g = Array.from({ length: h }, (_, y) => Array.from({ length: w }, (_, x) => groundFn(x, y)))
  const f = Array.from({ length: h }, (_, y) => Array.from({ length: w }, (_, x) => featuresFn(x, y)))
  const mid = Math.max(...objList.map(o => o.id))
  const oxml = objList.map(obj =>
    `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">\n   <point/>\n  </object>`
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${w}" height="${h}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${mid + 1}">
 <tileset firstgid="1" source="ship-tiles.tsx"/>
 <layer id="1" name="Ground" width="${w}" height="${h}">
  <data encoding="base64">
   ${encodeTiles(g)}
  </data>
 </layer>
 <layer id="2" name="Features" width="${w}" height="${h}">
  <data encoding="base64">
   ${encodeTiles(f)}
  </data>
 </layer>
 <objectgroup id="3" name="Events">
${oxml}
 </objectgroup>
</map>
`
}

// Wilderness: forest left, beach/water right, clearing bottom-center
const wildTmx = makeMap('wilderness', 20, 20,
  (x, y) => {
    if (x >= 17) return SA
    if (x === 16) return SA
    if (y >= 12 && y <= 17 && x >= 7 && x <= 14) return DI
    if ((x + y) % 4 === 0) return G2
    return GR
  },
  (x, y) => {
    if (y === 0 || y === 19) return DF
    if (x <= 1 && !(y >= 9 && y <= 11)) return DF
    if (x >= 18) return (x + y) % 2 === 0 ? RV : SW
    if (x >= 2 && x <= 5 && y >= 2 && y <= 17 && (x * 7 + y * 3) % 5 === 0) return (x + y) % 2 === 0 ? PN : OK
    return _
  },
  [
    { id: 1, name: 'from-jamestown', class: 'start', x: 2 * 32, y: 10 * 32 },
    { id: 2, name: 'hunter', x: 8 * 32, y: 10 * 32 },  // moved to clearing center
    { id: 3, name: 'mussel-1', x: 16 * 32, y: 3 * 32 },
    { id: 4, name: 'mussel-2', x: 16 * 32, y: 6 * 32 },
    { id: 5, name: 'mussel-3', x: 16 * 32, y: 9 * 32 },
    { id: 6, name: 'mussel-4', x: 16 * 32, y: 12 * 32 },
    { id: 7, name: 'mussel-5', x: 16 * 32, y: 15 * 32 },
    { id: 8, name: 'crab-1', x: 15 * 32, y: 4 * 32 },
    { id: 9, name: 'crab-2', x: 15 * 32, y: 7 * 32 },
    { id: 10, name: 'crab-3', x: 15 * 32, y: 10 * 32 },
    { id: 11, name: 'crab-4', x: 15 * 32, y: 13 * 32 },
    { id: 12, name: 'crab-5', x: 15 * 32, y: 16 * 32 },
    { id: 13, name: 'rabbit-1', x: 7 * 32, y: 4 * 32 },   // moved off trees
    { id: 14, name: 'rabbit-2', x: 6 * 32, y: 8 * 32 },   // moved off trees
    { id: 15, name: 'rabbit-3', x: 5 * 32, y: 14 * 32 },
    { id: 16, name: 'deer-1', x: 3 * 32, y: 6 * 32 },
    { id: 17, name: 'target-1', x: 8 * 32, y: 14 * 32 },
    { id: 18, name: 'target-2', x: 10 * 32, y: 14 * 32 },
    { id: 19, name: 'target-3', x: 12 * 32, y: 14 * 32 },
    { id: 20, name: 'target-4', x: 9 * 32, y: 16 * 32 },
    { id: 21, name: 'target-5', x: 11 * 32, y: 16 * 32 },
    { id: 22, name: 'target-6', x: 13 * 32, y: 16 * 32 },
    { id: 23, name: 'to-jamestown', x: 1 * 32, y: 10 * 32 },
    { id: 27, name: 'kanta-wild', x: 10 * 32, y: 10 * 32 },
    // Turkeys and bear
    { id: 28, name: 'turkey-1', x: 8 * 32, y: 6 * 32 },
    { id: 29, name: 'turkey-2', x: 6 * 32, y: 10 * 32 },
    { id: 30, name: 'bear-1', x: 4 * 32, y: 3 * 32 },
    // Corn crops
    { id: 31, name: 'corn-1', x: 9 * 32, y: 4 * 32 },
    { id: 32, name: 'corn-2', x: 11 * 32, y: 6 * 32 },
    { id: 33, name: 'corn-3', x: 8 * 32, y: 12 * 32 },
    { id: 24, name: 'berry-1', x: 6 * 32, y: 5 * 32 },
    { id: 25, name: 'berry-2', x: 8 * 32, y: 8 * 32 },
    { id: 26, name: 'berry-3', x: 7 * 32, y: 12 * 32 },
  ]
)

// Powhatan village: forest border, village center, ball field south
const powTmx = makeMap('powhatan', 20, 20,
  (x, y) => {
    if (x === 10 && y >= 2 && y < 18) return PA
    if (y === 8 && x >= 3 && x < 17) return PA
    if (y >= 4 && y <= 7 && (x >= 3 && x <= 7 || x >= 13 && x <= 17)) return DI
    if (y >= 13 && y <= 17 && x >= 4 && x <= 16) return DI
    if ((x + y) % 5 === 0) return G2
    return GR
  },
  (x, y) => {
    if (y === 0 || x === 0 || x === 19) return DF
    if (y === 19 && !(x >= 9 && x <= 11)) return DF
    if (y === 5 && (x === 4 || x === 5)) return HO
    if (y === 5 && (x === 14 || x === 15)) return HO
    if (y === 9 && x === 10) return CF
    return _
  },
  [
    { id: 1, name: 'from-jamestown-pv', class: 'start', x: 10 * 32, y: 18 * 32 },
    { id: 2, name: 'namontack', x: 10 * 32, y: 15 * 32 },
    { id: 3, name: 'chief-powhatan', x: 10 * 32, y: 8 * 32 },
    { id: 4, name: 'village-elder', x: 5 * 32, y: 6 * 32 },
    { id: 5, name: 'archery-1', x: 16 * 32, y: 3 * 32 },
    { id: 6, name: 'archery-2', x: 16 * 32, y: 4 * 32 },
    { id: 7, name: 'archery-3', x: 16 * 32, y: 5 * 32 },
    { id: 8, name: 'archery-4', x: 16 * 32, y: 6 * 32 },
    { id: 9, name: 'archery-5', x: 16 * 32, y: 7 * 32 },
    { id: 10, name: 'ball-goal-1', x: 5 * 32, y: 15 * 32 },
    { id: 11, name: 'ball-goal-2', x: 15 * 32, y: 15 * 32 },
    { id: 12, name: 'deer-hide', x: 14 * 32, y: 6 * 32 },
    { id: 13, name: 'sinew-pile', x: 5 * 32, y: 7 * 32 },
    { id: 14, name: 'feast-fire', x: 10 * 32, y: 10 * 32 },
    { id: 15, name: 'to-jamestown-pv', x: 10 * 32, y: 19 * 32 },
    { id: 16, name: 'kanta', x: 14 * 32, y: 8 * 32 },
  ]
)

writeFileSync(join(mapsDir, 'jamestown.tmx'), tmx)
writeFileSync(join(mapsDir, 'wilderness.tmx'), wildTmx)
writeFileSync(join(mapsDir, 'powhatan-village.tmx'), powTmx)
console.log('Generated all maps: jamestown (triangular fort), wilderness, powhatan-village')
