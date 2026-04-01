/**
 * Generate the Wilderness TMX map using custom tileset
 * Tile IDs (firstgid=1):
 *  1=grass, 2=tall grass, 3=dirt trail, 4=sand, 5=water, 6=shallow, 7=rocks, 8=cliff
 *  9=pine, 10=oak, 11=dead tree, 12=bush, 13=mushroom, 14=berry bush, 15=fallen log, 16=stump
 * 17=target, 18=sword rack, 19=musket rack, 20=bow rack, 21=rabbit, 22=deer, 23=crab, 24=mussel
 * 25=dense forest, 26=fern, 27=campsite, 28=fish, 29=seaweed, 30=driftwood, 31=training dummy, 32=footprints
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

const _ = 0, GR = 1, TG = 2, DT = 3, SA = 4, WA = 5, SW = 6, RK = 7, CL = 8
const PN = 9, OK = 10, DT2 = 11, BU = 12, MR = 13, BB = 14, FL = 15, ST = 16
const TG2 = 17, SR = 18, MK = 19, BW = 20
const DF = 25, FE = 26, CS = 27

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
    // Shore (right 3 cols)
    if (x >= W - 3) return SA
    if (x === W - 4) return (y % 2 === 0) ? SA : GR
    // Training clearing (bottom-center)
    if (y >= 16 && y <= 22 && x >= 8 && x <= 17) return DT
    // Trail from west to clearing
    if (y === 12 && x < 10) return DT
    if (x === 9 && y >= 12 && y <= 16) return DT
    // Grass variety
    if ((x + y) % 4 === 0) return TG
    return GR
  })
)

// Layer 2: Features
const features = Array.from({ length: H }, () => Array(W).fill(_))

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Dense forest border (top, bottom, left=2 cols)
    if (y === 0 || y === H - 1) features[y][x] = DF
    if (x < 2 && !(y >= 11 && y <= 13)) features[y][x] = DF // gap for Jamestown exit
    // Water (rightmost 2 cols)
    if (x >= W - 2) features[y][x] = (x + y) % 2 === 0 ? WA : SW
    // Scattered forest (left half)
    if (x >= 2 && x <= 7 && y >= 2 && y <= 22) {
      if ((x * 7 + y * 3) % 5 === 0) features[y][x] = (x + y) % 2 === 0 ? PN : OK
      else if ((x * 3 + y * 7) % 9 === 0) features[y][x] = BU
    }
    // Ferns and mushrooms
    if (x >= 3 && x <= 6 && y >= 5 && y <= 15 && (x * y) % 11 === 0) features[y][x] = FE
  }
}

// Training area decorations
features[17][10] = SR   // sword rack
features[17][13] = MK   // musket rack
features[17][16] = BW   // bow rack
features[19][13] = ST   // training dummy (stump as placeholder)

// Campsite
features[18][9] = CS

const objects = [
  // Entry from Jamestown (west edge)
  { id: 1, name: 'from-jamestown', class: 'start', x: 1 * 32, y: 12 * 32 },

  // Hunter NPC (training clearing)
  { id: 2, name: 'hunter', x: 12 * 32, y: 18 * 32 },

  // Shellfish along shore
  { id: 3, name: 'mussel-1', x: 22 * 32, y: 4 * 32 },
  { id: 4, name: 'mussel-2', x: 22 * 32, y: 8 * 32 },
  { id: 5, name: 'mussel-3', x: 22 * 32, y: 12 * 32 },
  { id: 6, name: 'mussel-4', x: 22 * 32, y: 16 * 32 },
  { id: 7, name: 'mussel-5', x: 22 * 32, y: 20 * 32 },
  { id: 8, name: 'crab-1', x: 21 * 32, y: 6 * 32 },
  { id: 9, name: 'crab-2', x: 21 * 32, y: 10 * 32 },
  { id: 10, name: 'crab-3', x: 21 * 32, y: 14 * 32 },
  { id: 11, name: 'crab-4', x: 21 * 32, y: 18 * 32 },
  { id: 12, name: 'crab-5', x: 21 * 32, y: 22 * 32 },

  // Rabbits in forest
  { id: 13, name: 'rabbit-1', x: 5 * 32, y: 5 * 32 },
  { id: 14, name: 'rabbit-2', x: 4 * 32, y: 10 * 32 },
  { id: 15, name: 'rabbit-3', x: 6 * 32, y: 16 * 32 },

  // Deer (deeper in forest)
  { id: 16, name: 'deer-1', x: 3 * 32, y: 8 * 32 },

  // Training targets
  { id: 17, name: 'target-1', x: 11 * 32, y: 20 * 32 },
  { id: 18, name: 'target-2', x: 14 * 32, y: 20 * 32 },

  // Return to Jamestown (west edge)
  { id: 19, name: 'to-jamestown', x: 0 * 32, y: 12 * 32 },
]

const objectXml = objects.map(obj =>
  `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
).join('\n')

const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${objects.length + 1}">
 <tileset firstgid="1" source="wilderness-tiles.tsx"/>
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

writeFileSync(join(mapsDir, 'wilderness.tmx'), tmx)
console.log('Generated wilderness.tmx with custom tileset')
