/**
 * Generate a minimal Jamestown map using the SHIP tileset (known to work)
 * to test if map transitions work at all.
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

// Simple 20x20 map using ship tileset
// Tile 3 = wood plank (walkable), tile 5 = water (collision)
const W = 20, H = 20
const WP = 3, WA = 5

const ground = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    if (x === 0 || x === W-1 || y === 0 || y === H-1) return WA
    return WP
  })
)

const features = Array.from({ length: H }, () => Array(W).fill(0))

const objects = [
  { id: 1, name: 'start', class: 'start', x: 10 * 32, y: 10 * 32 },
  { id: 2, name: 'captain-smith-jt', x: 8 * 32, y: 8 * 32 },
  { id: 3, name: 'carpenter', x: 12 * 32, y: 8 * 32 },
  { id: 4, name: 'to-wilderness', x: 18 * 32, y: 10 * 32 },
  { id: 5, name: 'to-powhatan', x: 10 * 32, y: 1 * 32 },
  { id: 6, name: 'namontack-jt', x: 10 * 32, y: 4 * 32 },
  { id: 7, name: 'settler', x: 6 * 32, y: 12 * 32 },
  { id: 8, name: 'lookout-defend', x: 14 * 32, y: 16 * 32 },
  { id: 9, name: 'tree-1', x: 3 * 32, y: 3 * 32 },
  { id: 10, name: 'tree-2', x: 5 * 32, y: 3 * 32 },
  { id: 11, name: 'tree-3', x: 7 * 32, y: 3 * 32 },
  { id: 12, name: 'tree-4', x: 3 * 32, y: 5 * 32 },
  { id: 13, name: 'tree-5', x: 3 * 32, y: 7 * 32 },
  { id: 14, name: 'tree-6', x: 16 * 32, y: 3 * 32 },
  { id: 15, name: 'tree-7', x: 16 * 32, y: 5 * 32 },
  { id: 16, name: 'tree-8', x: 16 * 32, y: 7 * 32 },
  { id: 17, name: 'tree-9', x: 3 * 32, y: 14 * 32 },
  { id: 18, name: 'tree-10', x: 16 * 32, y: 14 * 32 },
  { id: 19, name: 'hay-1', x: 4 * 32, y: 16 * 32 },
  { id: 20, name: 'hay-2', x: 6 * 32, y: 16 * 32 },
  { id: 21, name: 'hay-3', x: 8 * 32, y: 16 * 32 },
  { id: 22, name: 'hay-4', x: 10 * 32, y: 16 * 32 },
  { id: 23, name: 'hay-5', x: 12 * 32, y: 16 * 32 },
  { id: 24, name: 'mud-1', x: 4 * 32, y: 17 * 32 },
  { id: 25, name: 'mud-2', x: 6 * 32, y: 17 * 32 },
  { id: 26, name: 'mud-3', x: 8 * 32, y: 17 * 32 },
  { id: 27, name: 'mud-4', x: 10 * 32, y: 17 * 32 },
  { id: 28, name: 'mud-5', x: 12 * 32, y: 17 * 32 },
  { id: 29, name: 'construction-1', x: 5 * 32, y: 6 * 32 },
  { id: 30, name: 'construction-2', x: 14 * 32, y: 6 * 32 },
  { id: 31, name: 'construction-3', x: 5 * 32, y: 14 * 32 },
  { id: 32, name: 'construction-4', x: 14 * 32, y: 14 * 32 },
  { id: 33, name: 'storehouse-site', x: 12 * 32, y: 12 * 32 },
  { id: 34, name: 'lookout-site', x: 10 * 32, y: 18 * 32 },
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

// Also generate minimal wilderness and powhatan using ship tileset
function makeMinimalMap(name, objList) {
  const g = Array.from({ length: 15 }, (_, y) =>
    Array.from({ length: 15 }, (_, x) => {
      if (x === 0 || x === 14 || y === 0 || y === 14) return WA
      return WP
    })
  )
  const f = Array.from({ length: 15 }, () => Array(15).fill(0))
  const mid = Math.max(...objList.map(o => o.id))
  const oxml = objList.map(obj =>
    `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="15" height="15" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${mid + 1}">
 <tileset firstgid="1" source="ship-tiles.tsx"/>
 <layer id="1" name="Ground" width="15" height="15">
  <data encoding="base64">
   ${encodeTiles(g)}
  </data>
 </layer>
 <layer id="2" name="Features" width="15" height="15">
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

const wildernessObjs = [
  { id: 1, name: 'from-jamestown', class: 'start', x: 2 * 32, y: 7 * 32 },
  { id: 2, name: 'hunter', x: 7 * 32, y: 7 * 32 },
  { id: 3, name: 'mussel-1', x: 12 * 32, y: 3 * 32 },
  { id: 4, name: 'mussel-2', x: 12 * 32, y: 5 * 32 },
  { id: 5, name: 'mussel-3', x: 12 * 32, y: 7 * 32 },
  { id: 6, name: 'mussel-4', x: 12 * 32, y: 9 * 32 },
  { id: 7, name: 'mussel-5', x: 12 * 32, y: 11 * 32 },
  { id: 8, name: 'crab-1', x: 11 * 32, y: 4 * 32 },
  { id: 9, name: 'crab-2', x: 11 * 32, y: 6 * 32 },
  { id: 10, name: 'crab-3', x: 11 * 32, y: 8 * 32 },
  { id: 11, name: 'crab-4', x: 11 * 32, y: 10 * 32 },
  { id: 12, name: 'crab-5', x: 11 * 32, y: 12 * 32 },
  { id: 13, name: 'rabbit-1', x: 4 * 32, y: 3 * 32 },
  { id: 14, name: 'rabbit-2', x: 3 * 32, y: 6 * 32 },
  { id: 15, name: 'rabbit-3', x: 4 * 32, y: 10 * 32 },
  { id: 16, name: 'deer-1', x: 3 * 32, y: 4 * 32 },
  { id: 17, name: 'target-1', x: 8 * 32, y: 10 * 32 },
  { id: 18, name: 'target-2', x: 9 * 32, y: 10 * 32 },
  { id: 19, name: 'to-jamestown', x: 1 * 32, y: 7 * 32 },
]

const powhatanObjs = [
  { id: 1, name: 'from-jamestown-pv', class: 'start', x: 7 * 32, y: 13 * 32 },
  { id: 2, name: 'namontack', x: 7 * 32, y: 10 * 32 },
  { id: 3, name: 'chief-powhatan', x: 7 * 32, y: 5 * 32 },
  { id: 4, name: 'village-elder', x: 4 * 32, y: 4 * 32 },
  { id: 5, name: 'archery-1', x: 12 * 32, y: 3 * 32 },
  { id: 6, name: 'archery-2', x: 12 * 32, y: 4 * 32 },
  { id: 7, name: 'archery-3', x: 12 * 32, y: 5 * 32 },
  { id: 8, name: 'archery-4', x: 12 * 32, y: 6 * 32 },
  { id: 9, name: 'archery-5', x: 12 * 32, y: 7 * 32 },
  { id: 10, name: 'ball-goal-1', x: 3 * 32, y: 10 * 32 },
  { id: 11, name: 'ball-goal-2', x: 11 * 32, y: 10 * 32 },
  { id: 12, name: 'deer-hide', x: 10 * 32, y: 4 * 32 },
  { id: 13, name: 'sinew-pile', x: 4 * 32, y: 6 * 32 },
  { id: 14, name: 'feast-fire', x: 7 * 32, y: 7 * 32 },
  { id: 15, name: 'to-jamestown-pv', x: 7 * 32, y: 13 * 32 },
]

writeFileSync(join(mapsDir, 'jamestown.tmx'), tmx)
writeFileSync(join(mapsDir, 'wilderness.tmx'), makeMinimalMap('wilderness', wildernessObjs))
writeFileSync(join(mapsDir, 'powhatan-village.tmx'), makeMinimalMap('powhatan-village', powhatanObjs))

console.log('Generated all maps using ship tileset')
