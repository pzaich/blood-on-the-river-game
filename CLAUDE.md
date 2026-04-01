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
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build: RPG_TYPE=rpg npm run build → dist/standalone/
npm run preview      # Preview production build
```

## Project Structure
```
src/modules/main/
├── server/
│   ├── index.ts              # Module registration
│   ├── player.ts             # Player init, quest state, save/load
│   ├── maps/                 # Map TypeScript classes + tmx/ subfolder
│   ├── events/
│   │   ├── npcs/             # NPC dialogue and quest logic
│   │   ├── interactables/    # Trees, crates, collection points
│   │   └── creatures/        # Huntable animals
│   └── database/
│       ├── items.ts          # @Item decorators
│       └── weapons.ts        # @Weapon decorators
└── client/
    ├── index.ts              # Client module + spritesheet registration
    ├── characters/           # Character sprite PNGs (4x4 grids)
    ├── tilesets/             # Terrain, buildings, objects PNGs
    └── gui/                  # Vue components (quest log, inventory)
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
- Created in Tiled Map Editor, exported as TMX
- Each map has a TypeScript class with `@MapData` decorator
- Collisions set via tile properties or object layers in Tiled
- Maps connect via edges/doors (player teleport events)

### Sprites
- Using placeholder colored-rectangle PNGs until real art is ready
- Character spritesheets: 4 columns (animation frames) x 4 rows (directions)
- Register sprites in `client/index.ts` with `id`, `src`, `framesWidth`, `framesHeight`

## Coding Conventions
- TypeScript strict mode
- Use RPG-JS decorators: `@MapData`, `@EventData`, `@Item`, `@Weapon`
- One file per NPC, creature, interactable, and map
- Keep quest logic in NPC event files (onAction handlers)
- Keep item/weapon definitions in database/ folder
- Vue components for any GUI overlays

## Config Files
- `rpg.toml` — RPG-JS configuration (start map, player sprite, RPG mode)
- `vercel.json` — Build command and output directory

## Game Design Reference
See `PLAN.md` for full quest design, item database, map connections, and implementation phases.

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

## Important Notes
- This is an educational game for children — keep content age-appropriate
- The Powhatan quest line (Quest 4) should be culturally respectful — Samuel is an invited guest learning, not conquering
- All sprites are placeholders — design code so assets can be swapped by changing PNGs without code changes
- RPG-JS has no built-in quest system — all quest logic is custom via player variables and NPC event handlers
