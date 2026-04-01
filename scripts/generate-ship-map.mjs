/**
 * Generate the ship TMX map using our custom ship tileset
 *
 * Ship tileset tile IDs (firstgid=1, so add 1 to tileset index):
 *  1=deep water, 2=water wave, 3=wood plank, 4=dark plank,
 *  5=hull wall, 6=mast, 7=rope, 8=rail,
 *  9=bow, 10=stern, 11=stairs, 12=cannon,
 * 13=crate, 14=barrel, 15=sail, 16=sail tan,
 * 17=hull left, 18=hull right, 19=hull top, 20=hull bottom,
 * 21=hull TL, 22=hull TR, 23=hull BL, 24=hull BR,
 * 25=deck light, 26=deck dark, 27=hatch, 28=wheel,
 * 29=lantern, 30=anchor, 31=flag, 32=below deck floor
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

// Tile mapping for ship — only use water, wood, wall, and a few object tiles
// Tileset: 0=grass 1=grass2 2=dirt/plank 3=path/deck 4=water 5=shallow 6=sand 7=dark floor
//          8=pine 9=oak 10=wall-v 11=wall-h 12=gate 13=house 14=store 15=tower
//          16=fire 17=logs 18=hay 19=mud 20=crate 21=barrel 22=construct 23=cannon
//          24=flowers 25=bush 26=sign 27=wheel 28=forest 29=riverbank 30=corner 31=dock
const _ = 0
const DW = 5       // deep water/ocean
const WW = 6       // waves/shallow
const WP = 3       // wood plank deck (path tile - warm brown planks)
const DP = 3       // dark deck (same wood planks)
const HW = 11      // hull wall (wall-h - dark planks with bolts)
const MA = 11      // mast (reuse wall - tall dark structure)
const RO = 3       // rope on deck (same as deck)
const RA = 11      // rail (wall)
const BW = 30      // bow (corner wall)
const ST = 30      // stern (corner wall)
const SR = 3       // stairs (walkable deck)
const CN = 24      // cannon (now with wood background)
const CR = 3       // crate position (deck - crate is an NPC event)
const BR = 3       // barrel position (deck - barrel is an NPC event)
const SL = 3       // sail area (just deck)
const HL = 11      // hull left
const HR = 11      // hull right
const HT = 11      // hull top
const HB = 11      // hull bottom
const TL = 30      // corner top-left
const TR = 30      // corner top-right
const BL = 30      // corner bottom-left
const BR2 = 30     // corner bottom-right
const DL = 3       // deck light (wood planks)
const DD = 3       // deck dark (same planks)
const HA = 12      // hatch (gate - opening)
const WH = 28      // wheel (now with wood background)
const LN = 17      // lantern (now with wood background)
const AN = 27      // anchor (now with wood background)
const FL = 16      // flag (tower tile with English flag)
const BF = 8       // below deck floor (TMX 8 = tileset id 7 = dark floor)

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

// Map is 24 wide x 28 tall
// Ship is oriented vertically: bow at top, stern at bottom
// Upper deck: rows 2-14, Below deck: rows 16-26
const W = 24
const H = 28

// Layer 1: Water (base layer - all water)
const water = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    // Mix deep water and wave water for visual interest
    if ((x + y) % 3 === 0) return WW
    return DW
  })
)

// Layer 2: Ship structure
const ship = Array.from({ length: H }, () => Array(W).fill(_))

// === UPPER DECK (rows 2-14) ===
// The ship is roughly columns 6-17 (12 tiles wide)

// Row 2: Bow - pointed front
//         . . . . . . . . .TL HT HT BW HT HT TR . . . . . . . .
ship[2] = [_,_,_,_,_,_,_,_,_,TL,HT,HT,BW,HT,HT,TR,_,_,_,_,_,_,_,_]

// Row 3: Narrowing bow
ship[3] = [_,_,_,_,_,_,_,_,HL,WP,WP,WP,FL,WP,WP,WP,HR,_,_,_,_,_,_,_]

// Row 4: Front deck
ship[4] = [_,_,_,_,_,_,_,HL,WP,WP,AN,WP,WP,WP,WP,WP,WP,HR,_,_,_,_,_,_]

// Row 5: Deck widens
ship[5] = [_,_,_,_,_,_,HL,WP,WP,WP,WP,WP,WP,WP,WP,WP,WP,WP,HR,_,_,_,_,_]

// Row 6: Full width deck with cannon
ship[6] = [_,_,_,_,_,HL,RA,WP,WP,CN,WP,WP,MA,WP,WP,CN,WP,WP,RA,HR,_,_,_,_]

// Row 7: Deck with sail
ship[7] = [_,_,_,_,_,HL,RA,WP,WP,WP,WP,RO,MA,RO,WP,WP,WP,WP,RA,HR,_,_,_,_]

// Row 8: Main deck
ship[8] = [_,_,_,_,_,HL,RA,WP,WP,WP,WP,WP,MA,WP,WP,WP,WP,WP,RA,HR,_,_,_,_]

// Row 9: Deck with crates/barrels
ship[9] = [_,_,_,_,_,HL,RA,WP,CR,WP,WP,WP,WP,WP,WP,CR,WP,WP,RA,HR,_,_,_,_]

// Row 10: Mid deck
ship[10]= [_,_,_,_,_,HL,RA,WP,WP,WP,WP,WP,WP,WP,WP,WP,WP,WP,RA,HR,_,_,_,_]

// Row 11: Deck with second mast
ship[11]= [_,_,_,_,_,HL,RA,WP,WP,CN,WP,RO,MA,RO,WP,CN,WP,WP,RA,HR,_,_,_,_]

// Row 12: Wheel area / stern deck
ship[12]= [_,_,_,_,_,HL,RA,WP,WP,WP,WP,WP,MA,WP,WP,WP,WP,WP,RA,HR,_,_,_,_]

// Row 13: Stern with wheel and lanterns
ship[13]= [_,_,_,_,_,_,HL,WP,LN,WP,WP,WP,WH,WP,WP,WP,LN,WP,HR,_,_,_,_,_]

// Row 14: Stern closing + stairs down
ship[14]= [_,_,_,_,_,_,_,BL,HB,HB,HB,SR,SR,HB,HB,HB,BR2,_,_,_,_,_,_,_]

// Row 15: Stairway connecting upper and lower decks
ship[15]= [_,_,_,_,_,_,_,HL,HW,HW,HW,DP,DP,HW,HW,HW,HR,_,_,_,_,_,_,_]

// === BELOW DECK (rows 16-26) ===

// Row 16: Below deck top wall with opening for stairs
ship[16]= [_,_,_,_,_,_,_,HL,HW,HW,HW,DP,DP,HW,HW,HW,HR,_,_,_,_,_,_,_]

// Row 17: Below deck
ship[17]= [_,_,_,_,_,_,_,HL,BF,BF,BF,BF,BF,BF,BF,BF,HR,_,_,_,_,_,_,_]

// Row 18: Below deck with supplies
ship[18]= [_,_,_,_,_,_,_,HL,BF,CR,BF,BF,BF,BF,CR,BF,HR,_,_,_,_,_,_,_]

// Row 19: Below deck
ship[19]= [_,_,_,_,_,_,_,HL,BF,BF,BF,BF,BF,BF,BF,BF,HR,_,_,_,_,_,_,_]

// Row 20: Below deck with hammocks area
ship[20]= [_,_,_,_,_,_,_,HL,BF,BF,DP,DP,BF,DP,DP,BF,HR,_,_,_,_,_,_,_]

// Row 21: Below deck
ship[21]= [_,_,_,_,_,_,_,HL,BF,BF,DP,DP,BF,DP,DP,BF,HR,_,_,_,_,_,_,_]

// Row 22: Below deck
ship[22]= [_,_,_,_,_,_,_,HL,BF,BF,BF,BF,BF,BF,BF,BF,HR,_,_,_,_,_,_,_]

// Row 23: Below deck with barrels
ship[23]= [_,_,_,_,_,_,_,HL,BF,BR,BF,BF,BF,BF,BR,BF,HR,_,_,_,_,_,_,_]

// Row 24: Below deck
ship[24]= [_,_,_,_,_,_,_,HL,BF,BF,BF,BF,BF,BF,BF,BF,HR,_,_,_,_,_,_,_]

// Row 25: Below deck
ship[25]= [_,_,_,_,_,_,_,HL,BF,BF,BF,LN,BF,LN,BF,BF,HR,_,_,_,_,_,_,_]

// Row 26: Below deck bottom wall
ship[26]= [_,_,_,_,_,_,_,BL,HB,HB,HB,HB,HB,HB,HB,HB,BR2,_,_,_,_,_,_,_]

// Row 27: Water
ship[27]= [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]

const objects = [
  // Player start (upper deck, mid-ship)
  { id: 1, name: 'start', class: 'start', x: 12 * 32, y: 9 * 32 },
  // Captain Smith (upper deck, near bow)
  { id: 2, name: 'captain-smith', x: 10 * 32, y: 5 * 32 },
  // Reverend Hunt (upper deck, near stern)
  { id: 3, name: 'reverend-hunt', x: 14 * 32, y: 12 * 32 },
  // Supply crates (hidden in tricky spots — all on walkable WP/BF tiles)
  { id: 4, name: 'supply-crate-1', x: 9 * 32, y: 4 * 32 },    // narrow bow area, easy to miss
  { id: 5, name: 'supply-crate-2', x: 17 * 32, y: 12 * 32 },   // stern corner near wheel
  { id: 6, name: 'supply-crate-3', x: 9 * 32, y: 24 * 32 },    // below deck, must find stairs
  // Richard Mutton (below deck)
  { id: 7, name: 'richard-mutton', x: 12 * 32, y: 20 * 32 },
  // More ship crew (upper deck)
  { id: 8, name: 'captain-newport', x: 12 * 32, y: 3 * 32 },    // at the bow, commanding
  { id: 9, name: 'edward-wingfield', x: 16 * 32, y: 6 * 32 },   // near mast
  { id: 10, name: 'george-percy', x: 8 * 32, y: 10 * 32 },      // mid-deck
  // Barrels (storm obstacles — spread across upper deck)
  { id: 11, name: 'barrel-1', x: 7 * 32, y: 6 * 32 },
  { id: 12, name: 'barrel-2', x: 15 * 32, y: 7 * 32 },
  { id: 13, name: 'barrel-3', x: 10 * 32, y: 10 * 32 },
  { id: 14, name: 'barrel-4', x: 16 * 32, y: 10 * 32 },
  { id: 15, name: 'barrel-5', x: 13 * 32, y: 6 * 32 },
  { id: 16, name: 'barrel-6', x: 9 * 32, y: 12 * 32 },
  // James (below deck)
  { id: 17, name: 'james', x: 10 * 32, y: 22 * 32 },
  // Animals below deck (ships carried livestock to Virginia)
  { id: 18, name: 'chicken', x: 14 * 32, y: 24 * 32 },
  { id: 19, name: 'pig', x: 9 * 32, y: 23 * 32 },
]

const objectXml = objects.map(obj =>
  `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
).join('\n')

const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="4" nextobjectid="${Math.max(...objects.map(o => o.id)) + 1}">
 <tileset firstgid="1" source="ship-tiles.tsx"/>
 <layer id="1" name="Water" width="${W}" height="${H}">
  <data encoding="base64">
   ${encodeTiles(water)}
  </data>
 </layer>
 <layer id="2" name="Ship" width="${W}" height="${H}">
  <data encoding="base64">
   ${encodeTiles(ship)}
  </data>
 </layer>
 <objectgroup id="3" name="Events">
${objectXml}
 </objectgroup>
</map>
`

writeFileSync(join(mapsDir, 'ship.tmx'), tmx)
console.log('Generated ship.tmx with custom tileset')
