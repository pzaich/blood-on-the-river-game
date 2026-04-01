/**
 * Generate TMX map files for Blood on the River
 * Uses the existing pipo tilesets from the RPG-JS starter
 *
 * Tile IDs reference [Base]BaseChip_pipo.tsx (firstgid=1):
 *   1 = grass
 *   Wooden floor tiles start around row ~170 in the tileset
 *   Water tiles are in [A]Water_pipo.tsx (firstgid=1001)
 *
 * We'll use simple tile IDs:
 *   1 = base grass tile
 *   For the ship, we'll use wall/floor tiles from the base tileset
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapsDir = join(__dirname, '..', 'main', 'worlds', 'maps')

// Helper: encode a 2D array of tile IDs to base64 (little-endian uint32)
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

// Helper: create a grid filled with a single tile
function fillGrid(width, height, tileId) {
  return Array.from({ length: height }, () => Array(width).fill(tileId))
}

// Helper: generate TMX XML
function generateTMX({ width, height, layers, objects }) {
  const tilesets = `
 <tileset firstgid="1" source="[Base]BaseChip_pipo.tsx"/>
 <tileset firstgid="1001" source="[A]Water_pipo.tsx"/>
 <tileset firstgid="4073" source="[A]Dirt_pipo.tsx"/>
 <tileset firstgid="4409" source="[A]Flower_pipo.tsx"/>`

  const layerXml = layers.map((layer, i) => `
 <layer id="${i + 1}" name="${layer.name}" width="${width}" height="${height}">
  <data encoding="base64">
   ${encodeTiles(layer.grid)}
  </data>
 </layer>`).join('')

  const objectXml = objects.map(obj => {
    if (obj.type === 'point') {
      return `  <object id="${obj.id}" name="${obj.name}"${obj.class ? ` class="${obj.class}"` : ''} x="${obj.x}" y="${obj.y}">
   <point/>
  </object>`
    }
    return ''
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="${width}" height="${height}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="${layers.length + 2}" nextobjectid="${objects.length + 1}">
${tilesets}
${layerXml}
 <objectgroup id="${layers.length + 1}" name="Object Layer 1">
${objectXml}
 </objectgroup>
</map>
`
}

// ============================================================
// SHIP MAP (Quest 1) - 20x20
// Layout: Water border, ship hull in center
// Upper deck (top half), below deck (bottom half)
// ============================================================
function generateShipMap() {
  const W = 20, H = 20

  // Tile IDs from [Base]BaseChip_pipo:
  // 1 = grass (we'll use as base/empty)
  // Looking at the tileset, approximate IDs:
  // Water: use tileset [A]Water_pipo firstgid=1001
  // Wood floor: tile ~41 in base (brown floor)
  // Wall: tile ~169 in base

  const EMPTY = 0
  const GRASS = 1
  const WATER = 1001  // first water tile
  const WOOD = 41     // wooden floor approximation
  const WALL = 169    // wall tile approximation
  const PLANK = 49    // plank/deck tile

  // Layer 1: Base - all water
  const base = fillGrid(W, H, GRASS)

  // Layer 2: Ship structure
  const ship = fillGrid(W, H, EMPTY)

  // Draw water around the edges
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Water border (3 tiles wide on each side)
      if (x < 3 || x >= W - 3 || y < 1 || y >= H - 1) {
        ship[y][x] = WATER
      }
      // Ship hull walls
      else if (x === 3 || x === W - 4) {
        ship[y][x] = WALL
      }
      // Ship bow (top)
      else if (y === 1 && x > 3 && x < W - 4) {
        ship[y][x] = WALL
      }
      // Ship stern (bottom)
      else if (y === H - 2 && x > 3 && x < W - 4) {
        ship[y][x] = WALL
      }
      // Deck divider (middle of ship)
      else if (y === 10 && x > 3 && x < W - 4) {
        ship[y][x] = WALL
      }
      // Upper deck floor
      else if (y > 1 && y < 10 && x > 3 && x < W - 4) {
        ship[y][x] = PLANK
      }
      // Below deck floor
      else if (y > 10 && y < H - 2 && x > 3 && x < W - 4) {
        ship[y][x] = WOOD
      }
    }
  }

  // Opening in deck divider (stairs)
  ship[10][9] = PLANK
  ship[10][10] = PLANK

  const objects = [
    // Player start position (upper deck)
    { id: 1, name: 'start', class: 'start', x: 288, y: 128, type: 'point' },
    // Captain Smith (upper deck, near bow)
    { id: 2, name: 'captain-smith', x: 192, y: 96, type: 'point' },
    // Supply crates (scattered on upper deck)
    { id: 3, name: 'supply-crate-1', x: 160, y: 192, type: 'point' },
    { id: 4, name: 'supply-crate-2', x: 352, y: 160, type: 'point' },
    { id: 5, name: 'supply-crate-3', x: 448, y: 224, type: 'point' },
    // Reverend Hunt (upper deck)
    { id: 6, name: 'reverend-hunt', x: 384, y: 96, type: 'point' },
    // Richard Mutton (below deck)
    { id: 7, name: 'richard-mutton', x: 256, y: 416, type: 'point' },
    // Storm obstacles (barrels on upper deck - used in Quest 1c)
    { id: 8, name: 'barrel-1', x: 224, y: 192, type: 'point' },
    { id: 9, name: 'barrel-2', x: 320, y: 256, type: 'point' },
  ]

  const tmx = generateTMX({
    width: W,
    height: H,
    layers: [
      { name: 'Ground', grid: base },
      { name: 'Ship', grid: ship },
    ],
    objects,
  })

  writeFileSync(join(mapsDir, 'ship.tmx'), tmx)
  console.log('Generated ship.tmx')
}

// ============================================================
// JAMESTOWN MAP (Quest 2 & 5) - 30x25
// Layout: Forest edge (top/right), riverbank (bottom), clearing (center)
// ============================================================
function generateJamestownMap() {
  const W = 30, H = 25
  const EMPTY = 0
  const GRASS = 1
  const WATER = 1001
  const WALL = 169
  const DIRT = 4073  // dirt tile from dirt tileset
  const TREE = 1399  // tree-ish tile

  // Layer 1: All grass
  const base = fillGrid(W, H, GRASS)

  // Layer 2: Features
  const features = fillGrid(W, H, EMPTY)

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Forest edge (top 3 rows)
      if (y < 3 && !(x >= 13 && x <= 16)) {
        features[y][x] = TREE
      }
      // Forest edge (right 3 columns, with gap for exit to wilderness)
      if (x >= W - 3 && !(y >= 10 && y <= 13)) {
        features[y][x] = TREE
      }
      // Riverbank (bottom 2 rows)
      if (y >= H - 2) {
        features[y][x] = WATER
      }
      // Left edge trees
      if (x < 2) {
        features[y][x] = TREE
      }
    }
  }

  const objects = [
    // Player start / arrival from ship
    { id: 1, name: 'start', class: 'start', x: 480, y: 384, type: 'point' },
    // Exit to wilderness (east edge)
    { id: 2, name: 'to-wilderness', x: 928, y: 368, type: 'point' },
    // Exit to Powhatan village (north edge gap)
    { id: 3, name: 'to-powhatan', x: 464, y: 32, type: 'point' },
    // Carpenter NPC
    { id: 4, name: 'carpenter', x: 320, y: 320, type: 'point' },
    // Captain Smith
    { id: 5, name: 'captain-smith-jt', x: 416, y: 288, type: 'point' },
    // Construction sites (4 wall segments)
    { id: 6, name: 'construction-1', x: 256, y: 192, type: 'point' },
    { id: 7, name: 'construction-2', x: 576, y: 192, type: 'point' },
    { id: 8, name: 'construction-3', x: 256, y: 480, type: 'point' },
    { id: 9, name: 'construction-4', x: 576, y: 480, type: 'point' },
    // Storehouse site
    { id: 10, name: 'storehouse-site', x: 416, y: 416, type: 'point' },
    // Lookout tower site (south edge)
    { id: 11, name: 'lookout-site', x: 416, y: 576, type: 'point' },
    // Choppable trees (at forest edge)
    { id: 12, name: 'tree-1', x: 128, y: 128, type: 'point' },
    { id: 13, name: 'tree-2', x: 192, y: 128, type: 'point' },
    { id: 14, name: 'tree-3', x: 256, y: 96, type: 'point' },
    // Hay piles (near riverbank)
    { id: 15, name: 'hay-1', x: 192, y: 640, type: 'point' },
    { id: 16, name: 'hay-2', x: 320, y: 672, type: 'point' },
    // Mud piles (near riverbank)
    { id: 17, name: 'mud-1', x: 544, y: 640, type: 'point' },
    { id: 18, name: 'mud-2', x: 640, y: 672, type: 'point' },
  ]

  const tmx = generateTMX({
    width: W,
    height: H,
    layers: [
      { name: 'Ground', grid: base },
      { name: 'Features', grid: features },
    ],
    objects,
  })

  writeFileSync(join(mapsDir, 'jamestown.tmx'), tmx)
  console.log('Generated jamestown.tmx')
}

// ============================================================
// WILDERNESS MAP (Quest 3) - 25x25
// Layout: Forest (left), shore (right), training clearing (center-bottom)
// ============================================================
function generateWildernessMap() {
  const W = 25, H = 25
  const EMPTY = 0
  const GRASS = 1
  const WATER = 1001
  const TREE = 1399
  const SAND = 4073  // dirt/sand

  const base = fillGrid(W, H, GRASS)
  const features = fillGrid(W, H, EMPTY)

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Dense forest (left third)
      if (x < 8 && !(y >= 11 && y <= 13 && x >= 6)) {
        features[y][x] = TREE
      }
      // Shore/water (right edge)
      if (x >= W - 2) {
        features[y][x] = WATER
      }
      // Sandy beach
      if (x === W - 3) {
        features[y][x] = SAND
      }
      // Top/bottom borders
      if (y === 0 || y === H - 1) {
        features[y][x] = TREE
      }
    }
  }

  // Training clearing (center-bottom, clear area)
  for (let y = 16; y < 22; y++) {
    for (let x = 9; x < 17; x++) {
      features[y][x] = EMPTY
    }
  }

  const objects = [
    // Entry from Jamestown (west edge)
    { id: 1, name: 'from-jamestown', class: 'start', x: 224, y: 384, type: 'point' },
    // Hunter NPC (training clearing)
    { id: 2, name: 'hunter', x: 416, y: 544, type: 'point' },
    // Captain Smith (training clearing)
    { id: 3, name: 'captain-smith-wild', x: 352, y: 576, type: 'point' },
    // Shellfish along shore
    { id: 4, name: 'mussel-1', x: 704, y: 160, type: 'point' },
    { id: 5, name: 'mussel-2', x: 704, y: 288, type: 'point' },
    { id: 6, name: 'crab-1', x: 704, y: 416, type: 'point' },
    { id: 7, name: 'crab-2', x: 704, y: 544, type: 'point' },
    // Rabbits in forest edge
    { id: 8, name: 'rabbit-1', x: 288, y: 192, type: 'point' },
    { id: 9, name: 'rabbit-2', x: 320, y: 320, type: 'point' },
    { id: 10, name: 'rabbit-3', x: 256, y: 448, type: 'point' },
    // Deer (deeper in forest clearing)
    { id: 11, name: 'deer', x: 288, y: 256, type: 'point' },
    // Training targets
    { id: 12, name: 'target-1', x: 480, y: 544, type: 'point' },
    { id: 13, name: 'target-2', x: 480, y: 608, type: 'point' },
  ]

  const tmx = generateTMX({
    width: W,
    height: H,
    layers: [
      { name: 'Ground', grid: base },
      { name: 'Features', grid: features },
    ],
    objects,
  })

  writeFileSync(join(mapsDir, 'wilderness.tmx'), tmx)
  console.log('Generated wilderness.tmx')
}

// ============================================================
// POWHATAN VILLAGE MAP (Quest 4) - 25x25
// Layout: Village center, archery range (east), ball field (south)
// ============================================================
function generatePowhatanMap() {
  const W = 25, H = 25
  const EMPTY = 0
  const GRASS = 1
  const TREE = 1399
  const DIRT = 4073

  const base = fillGrid(W, H, GRASS)
  const features = fillGrid(W, H, EMPTY)

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Forest border
      if (y === 0 || y === H - 1 || x === 0 || x === W - 1) {
        features[y][x] = TREE
      }
      // Village paths (dirt)
      if ((y === 8 && x > 3 && x < W - 4) || (x === 12 && y > 3 && y < H - 4)) {
        features[y][x] = DIRT
      }
    }
  }

  // Gap in south border for entry from Jamestown
  features[H - 1][11] = EMPTY
  features[H - 1][12] = EMPTY
  features[H - 1][13] = EMPTY

  const objects = [
    // Entry from Jamestown (south edge)
    { id: 1, name: 'from-jamestown', class: 'start', x: 384, y: 752, type: 'point' },
    // Namontack (village entrance)
    { id: 2, name: 'namontack', x: 384, y: 640, type: 'point' },
    // Chief Powhatan (center of village)
    { id: 3, name: 'chief-powhatan', x: 384, y: 256, type: 'point' },
    // Village Elder (near longhouses)
    { id: 4, name: 'village-elder', x: 192, y: 192, type: 'point' },
    // Archery targets (east side)
    { id: 5, name: 'archery-target-1', x: 640, y: 160, type: 'point' },
    { id: 6, name: 'archery-target-2', x: 640, y: 224, type: 'point' },
    { id: 7, name: 'archery-target-3', x: 640, y: 288, type: 'point' },
    { id: 8, name: 'archery-target-4', x: 640, y: 352, type: 'point' },
    { id: 9, name: 'archery-target-5', x: 640, y: 416, type: 'point' },
    // Ball field goals (south area)
    { id: 10, name: 'ball-goal-1', x: 192, y: 576, type: 'point' },
    { id: 11, name: 'ball-goal-2', x: 576, y: 576, type: 'point' },
    // Feast area
    { id: 12, name: 'feast-fire', x: 384, y: 320, type: 'point' },
  ]

  const tmx = generateTMX({
    width: W,
    height: H,
    layers: [
      { name: 'Ground', grid: base },
      { name: 'Features', grid: features },
    ],
    objects,
  })

  writeFileSync(join(mapsDir, 'powhatan-village.tmx'), tmx)
  console.log('Generated powhatan-village.tmx')
}

// Generate all maps
generateShipMap()
generateJamestownMap()
generateWildernessMap()
generatePowhatanMap()
console.log('All maps generated!')
