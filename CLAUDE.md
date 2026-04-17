# Blood on the River — RPG Game

## Project Overview
Top-down Pokemon-style RPG based on the book "Blood on the River: James Town 1607" by Elisa Carbone. Player is Samuel Collier, a young orphan who helps found Jamestown in 1607. Target audience: children.

## Tech Stack
- **Framework:** RPG-JS v4 (TypeScript, PixiJS 7, Vue.js 3)
- **Build:** Vite 4
- **Deploy:** Vercel (static RPG mode)
- **State:** LocalStorage for save/load
- **Maps:** Tiled Map Editor (TMX format)
- **Node:** v18+

## Key Commands
```bash
npm run dev          # Start dev server in RPG mode (http://localhost:3000)
npm run build        # Build static RPG: dist/standalone/
```

## Project Structure
RPG-JS v4 uses auto-discovery — files in `main/` are automatically loaded by convention.
```
main/
├── player.ts                 # Player init, quest state, onJoinMap hooks
├── events/                   # One file per NPC/interactable (auto-discovered)
│   ├── captain-smith.ts      # @EventData name must match TMX object name
│   ├── reverend-hunt.ts
│   ├── richard-mutton.ts
│   └── supply-crate-*.ts
├── spritesheets/
│   └── characters/
│       ├── characters.ts     # @Spritesheet config (RMSpritesheet preset)
│       ├── hero.png          # Player sprite (3 cols x 4 rows)
│       └── female.png        # NPC placeholder sprite
├── worlds/
│   ├── myworld.world         # Tiled world file (map list)
│   └── maps/                 # TMX maps + tileset PNGs/TSX files
│       ├── ship.tmx          # Quest 1 map
│       ├── jamestown.tmx     # Quest 2 & 5 map
│       ├── wilderness.tmx    # Quest 3 map
│       └── powhatan-village.tmx  # Quest 4 map
scripts/
└── generate-maps.mjs         # Node script to regenerate TMX maps
rpg.toml                      # Game config (start map, modules, hitbox)
```

## Architecture Decisions

### Quest State
- Quests are tracked via RPG-JS player variables (`player.setVariable` / `player.getVariable`)
- Variable naming: `quest_{num}_{subtask}` with values `not_started | active | complete`
- Collection counts: `quest_{num}_{item}` with numeric values (e.g., `quest_2_logs = 7`)
- `current_quest` variable tracks which main quest is active (1-5)
- NPCs check these variables to show context-appropriate dialogue

### Save System
- Save to LocalStorage key: `blood-on-the-river-save`
- Use `player.save()` → JSON → `localStorage.setItem()`
- Load on game start: `localStorage.getItem()` → `player.load()`

### Maps
- 4 maps total: `ship`, `jamestown`, `wilderness`, `powhatan-village`
- Generated via `scripts/generate-maps.mjs` using existing pipo tilesets
- TMX object names must match `@EventData({ name: '...' })` for auto-wiring
- Map transitions via `player.changeMap('mapname')`
- Tiled world file (`myworld.world`) lists which maps are active

### Sprites
- Using RPG Maker-compatible spritesheets with `RMSpritesheet(3, 4)` preset
- `hero.png` and `female.png` from starter kit used as placeholders
- Replace PNGs to update character art — no code changes needed

## Coding Conventions
- One file per event with `export default` (required by RPG-JS auto-discovery)
- Use `@EventData` decorator; name must match TMX object name
- Quest logic lives in NPC `onAction()` handlers
- Player variables for all state (`setVariable` / `getVariable`)

## Config Files
- `rpg.toml` — RPG-JS configuration (start map, player sprite, RPG mode)
- `vercel.json` — Build command and output directory

## Game Design Reference
See `PLAN.md` for full quest design, item database, map connections, and implementation phases.

## Pre-Commit Build Check
A Claude Code hook in `.claude/settings.json` automatically runs `npm run build` before every `git commit`. If the build fails, the commit is blocked. Fix all build errors before committing.

## Git & Commit Practices
- **Branch:** `main` is the default branch
- **When to commit:** After each meaningful, working milestone — not after every tiny edit, but don't let large amounts of work pile up uncommitted either. Good commit points:
  - After scaffolding or adding a new dependency
  - After completing a new map, NPC, or quest sub-task that works
  - After adding a new system (inventory, save/load, combat)
  - After fixing a bug
  - Before and after risky refactors
- **Commit messages:** Short imperative subject line describing the "what" (e.g., "Add Captain Smith NPC with Quest 1a dialogue"). Add a body line for the "why" if it's not obvious.
- **Don't commit:** Broken/half-working states, generated files in `dist/`, `node_modules/`, `.env` files
- **Commit granularity:** One logical change per commit. If you added a map AND an NPC that go together, that's one commit. If you added two unrelated NPCs, those can be two commits.

## RPG-JS Gotchas (learned the hard way)

### Single Tileset Requirement
- **ALL maps must reference the same tileset file** (e.g., `ship-tiles.tsx`). RPG-JS only loads the tileset from the start map. Any map referencing a different tileset will hang on loading forever.
- The shared tileset currently has 32 tiles — land tiles (grass, trees, walls, buildings) and ship tiles share the same set.

### TMX Object Placement
- **NEVER place objects at y=0 or x=0 or at the max edge of the map.** RPG-JS's `createShape` crashes with `Cannot read properties of undefined (reading 'y')` when objects are at pixel 0 or the last pixel. Always place objects at least 1 tile inward from all edges.
- `nextobjectid` in TMX must be GREATER than the highest object `id` used. If you have object id=38, nextobjectid must be ≥39.

### Event Hitboxes
- Large hitboxes (32x16) block player movement. Use 8x8 for all events so the player can walk through/past NPCs and items.
- Player hitbox is 10x10 (in `rpg.toml`) to fit through tight gaps.

### Event `onChanges` Hook
- **Do NOT use `onChanges` on events** — it fires every tick and causes game freezes. Use `setInterval` with `localStorage` flags instead for periodic behavior (barrel movement, target movement).

### Quest Variable Comparisons
- Use **loose equality** (`==` / `!=`) when comparing `current_quest`, not strict (`===` / `!==`). The debug panel may set values as strings while game code uses numbers.

### localStorage for Cross-Layer Communication
- Server-side event code and client-side HTML/JS can communicate via `localStorage`:
  - `storm-active` — triggers storm visual overlay + barrel movement
  - `training-active` — triggers training target movement
  - `archery-active` — triggers archery target movement in Powhatan quest
  - `game-sound` — triggers sound effects (collect, chop, hit, build, etc.)

### Sprites
- Sprites use `RMSpritesheet(3, 4)` preset: 3 columns x 4 rows, 32x32 per cell = 96x128 PNG
- **NEVER use hyphens + suffix in sprite IDs** (e.g., `crab-sprite`). RPG-JS fails to render sprites whose IDs contain `-sprite`, `-icon`, etc. Use simple names: `crab`, `mussel`, `wheat`, `mud`. This has caused invisible sprites multiple times.
- If a sprite doesn't render, try using a known-working sprite ID (`samuel`, `smith`, `hunt`, `richard`) to verify the event is placed correctly
- Register all sprites in `main/spritesheets/characters/characters.ts` with `@Spritesheet` decorator
- The `export default` class gets the `images` property auto-set by the compiler; additional sprites use named exports
- Run `/verify-sprites` to check all sprite registrations, event references, and PNG dimensions

### TMX Start Objects
- **Do NOT use `class="start"` on TMX objects** — it creates an interactive shape that interferes with Space/Enter input and can teleport the player unexpectedly. Use `name="start"` without a class attribute, or better yet, pass explicit coordinates to `changeMap()` calls instead of relying on start objects.

## Important Notes
- This is an educational game for children — keep content age-appropriate
- The Powhatan quest line (Quest 4) should be culturally respectful — Samuel is an invited guest learning, not conquering
- All sprites are placeholders — design code so assets can be swapped by changing PNGs without code changes
- RPG-JS has no built-in quest system — all quest logic is custom via player variables and NPC event handlers
- Settler dialogue reflects the book's themes: gentleman vs. laborer conflict, Smith's leadership style, trust between peoples
- Characters from the book have distinct personalities: Wingfield (arrogant), Ratcliffe (troublemaker), Kendall (schemer), Laxon (hardworking), Thomas Savage (language learner)
