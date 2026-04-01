# Blood on the River

A top-down RPG game based on the book *Blood on the River: James Town 1607* by Elisa Carbone. Play as **Samuel Collier**, a young orphan from London who sails to Virginia in 1607 and helps found Jamestown.

Built with [RPG-JS v4](https://rpgjs.dev). Designed for children.

## Play

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Quests

| Quest | Map | Summary |
|-------|-----|---------|
| 1. The Voyage | Ship | Meet Captain Smith, collect supplies, survive a storm, befriend Richard |
| 2. Building James Fort | Jamestown | Chop trees, gather hay/mud, build palisade walls, storehouse, lookout |
| 3. The Hunt | Wilderness | Sword & musket training, gather shellfish, hunt rabbits, hunt the deer |
| 4. Joining the Powhatan | Village | Archery, craft a pouch, ball game, ceremony, feast |
| 5. Two Worlds United | Jamestown | Trade with Powhatan, defend fort, mediate a dispute, Samuel's choice |

## Project Structure

```
main/
  player.ts          # Player hooks, quest init, debug exposure
  events/            # One file per NPC/interactable (auto-discovered)
  spritesheets/      # Character sprite PNGs + config
  worlds/
    myworld.world    # Tiled world file
    maps/            # TMX maps + tileset PNGs/TSX files
scripts/             # Map and event generators
rpg.toml             # RPG-JS config
```

## Maps

```
ship --> jamestown <--> wilderness
              ^
              |
       powhatan-village
```

## Development

**Debug panel:** Click `DEBUG` (top-right) in the browser to toggle quest states, jump to any point in the story, teleport between maps, and copy live variables.

**Regenerate maps:**
```bash
node scripts/generate-ship-map.mjs
node scripts/generate-jamestown-map.mjs
node scripts/generate-wilderness-map.mjs
node scripts/generate-powhatan-map.mjs
```

**Regenerate tilesets:**
```bash
bash scripts/generate-ship-tileset.sh
bash scripts/generate-jamestown-tileset.sh
bash scripts/generate-wilderness-tileset.sh
bash scripts/generate-powhatan-tileset.sh
```

**Regenerate event files:**
```bash
node scripts/generate-q2-events.mjs
node scripts/generate-q3-events.mjs
node scripts/generate-q4-events.mjs
node scripts/generate-q5-events.mjs
```

**Build for production:**
```bash
npm run build   # outputs to dist/
```

**Deploy:** Vercel auto-detects the build. Output directory is `dist`.

## Credits

- Game framework: [RPG-JS](https://rpgjs.dev) (MIT)
- Starter kit sprites: [Pipoya](https://pipoya.itch.io)
- Starter kit sounds: [Davidvitas](https://www.davidvitas.com/portfolio/2016/5/12/rpg-music-pack) (CC BY 4.0)
- Starter kit icons: [game-icons.net](https://game-icons.net)
- Custom tilesets and sprites generated with ImageMagick
