/**
 * Generate the Powhatan Village TMX map
 * Tile IDs (firstgid=1):
 *  1=grass, 2=packed earth, 3=dirt path, 4=garden, 5=corn, 6=pond, 7=reed mat, 8=fire pit
 *  9=longhouse wall, 10=longhouse roof, 11=totem, 12=drying rack, 13=pottery, 14=hide frame, 15=basket, 16=canoe
 * 17=archery target, 18=goal post, 19=ball, 20=feather banner, 21=tree, 22=wildflower, 23=sitting log, 24=drum
 * 25=dense trees, 26=tall grass, 27=deer hide, 28=sinew, 29=feast table, 30=torch, 31=ceremonial post, 32=peace pipe
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

const _ = 0, GR = 1, PE = 2, DP = 3, GA = 4, CO = 5, PO = 6, RM = 7, FP = 8
const LW = 9, LR = 10, TM = 11, DR = 12, PT = 13, HF = 14, BK = 15, CN = 16
const AT = 17, GP = 18, BL = 19, FB = 20, TR = 21, WF = 22, SL = 23, DM = 24
const DT = 25, TG = 26, FT = 29, TC = 30, CP = 31

function encodeTiles(grid) {
  const h = grid.length, w = grid[0].length
  const buf = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++)
    buf.writeUInt32LE(grid[y][x], (y * w + x) * 4)
  return buf.toString('base64')
}

const W = 25, H = 25

// Layer 1: Ground
const ground = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    // Village center paths
    if (x === 12 && y >= 3 && y < H - 2) return DP
    if (y === 8 && x >= 3 && x < W - 3) return DP
    // Packed earth around longhouses
    if (y >= 4 && y <= 7 && x >= 4 && x <= 10) return PE
    if (y >= 4 && y <= 7 && x >= 14 && x <= 20) return PE
    // Archery range (right side)
    if (y >= 3 && y <= 10 && x >= 18 && x <= 22) return PE
    // Ball field (bottom center)
    if (y >= 15 && y <= 21 && x >= 5 && x <= 19) return PE
    // Reed mats at feast area
    if (y >= 10 && y <= 13 && x >= 9 && x <= 15) return RM
    return GR
  })
)

// Layer 2: Features
const features = Array.from({ length: H }, () => Array(W).fill(_))

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Forest border
    if (y === 0 || x === 0 || x === W - 1) features[y][x] = DT
    if (y === H - 1 && !(x >= 11 && x <= 13)) features[y][x] = DT
    // Scattered trees
    if (y === 1 && (x === 4 || x === 10 || x === 16 || x === 22)) features[y][x] = TR
  }
}

// Longhouses (left cluster)
features[4][5] = LR; features[4][6] = LR
features[5][5] = LW; features[5][6] = LW
features[6][5] = LW; features[6][6] = LW

// Longhouses (right cluster)
features[4][15] = LR; features[4][16] = LR
features[5][15] = LW; features[5][16] = LW
features[6][15] = LW; features[6][16] = LW

// Village decorations
features[3][12] = TM    // totem at center-north
features[7][8] = DR     // drying rack
features[7][18] = PT    // pottery
features[6][9] = BK     // basket
features[5][20] = HF    // hide on frame

// Gardens and corn
features[9][4] = GA; features[9][5] = CO
features[9][19] = GA; features[9][20] = CO

// Feast area (center)
features[11][11] = FP   // fire pit
features[11][13] = FP   // fire pit
features[12][10] = SL   // sitting log
features[12][14] = SL   // sitting log

// Archery range (right side)
// targets placed as objects

// Ball field
features[15][5] = GP    // goal post left
features[15][19] = GP   // goal post right
features[21][5] = GP    // goal post left
features[21][19] = GP   // goal post right

// Torches along paths
features[2][12] = TC; features[14][12] = TC
features[8][3] = TC; features[8][21] = TC

// Wildflowers
features[13][3] = WF; features[2][20] = WF; features[22][3] = WF

// Drums near feast
features[10][9] = DM; features[10][15] = DM

const objects = [
  // Entry from Jamestown (south edge)
  { id: 1, name: 'from-jamestown-pv', class: 'start', x: 12 * 32, y: 23 * 32 },

  // NPCs
  { id: 2, name: 'namontack', x: 12 * 32, y: 20 * 32 },
  { id: 3, name: 'chief-powhatan', x: 12 * 32, y: 11 * 32 },
  { id: 4, name: 'village-elder', x: 8 * 32, y: 6 * 32 },

  // Archery targets (right side, 5 targets)
  { id: 5, name: 'archery-1', x: 21 * 32, y: 4 * 32 },
  { id: 6, name: 'archery-2', x: 21 * 32, y: 5 * 32 },
  { id: 7, name: 'archery-3', x: 21 * 32, y: 6 * 32 },
  { id: 8, name: 'archery-4', x: 21 * 32, y: 7 * 32 },
  { id: 9, name: 'archery-5', x: 21 * 32, y: 8 * 32 },

  // Ball field goals
  { id: 10, name: 'ball-goal-1', x: 5 * 32, y: 18 * 32 },
  { id: 11, name: 'ball-goal-2', x: 19 * 32, y: 18 * 32 },

  // Collectibles for pouch crafting
  { id: 12, name: 'deer-hide', x: 17 * 32, y: 6 * 32 },
  { id: 13, name: 'sinew-pile', x: 7 * 32, y: 9 * 32 },

  // Feast fire (interact to trigger feast)
  { id: 14, name: 'feast-fire', x: 12 * 32, y: 12 * 32 },

  // Return to Jamestown
  { id: 15, name: 'to-jamestown-pv', x: 12 * 32, y: 24 * 32 },
]

const objectXml = objects.map(obj =>
  `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
).join('\n')

const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${objects.length + 1}">
 <tileset firstgid="1" source="powhatan-tiles.tsx"/>
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

writeFileSync(join(mapsDir, 'powhatan-village.tmx'), tmx)
console.log('Generated powhatan-village.tmx')
