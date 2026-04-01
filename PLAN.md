# Blood on the River — RPG Game Plan

## Overview
Top-down Pokemon-style RPG where you play as **Samuel Collier**, a young orphan from London who sails to Virginia in 1607 and helps found Jamestown. Built with RPG-JS v4, deployed on Vercel.

---

## Part 1: Expanded Quest Design

### Story Arc (5 Main Quests)

The game follows Samuel's journey from angry orphan to trusted community member across 5 chapter-quests, each with sub-tasks.

---

### Quest 1: "The Voyage to Virginia"
**Map:** `ship` — The Susan Constant ship with upper deck and below-deck areas in one map
**NPCs:** Captain John Smith (mentor), Reverend Hunt (peacemaker), Richard Mutton (friend)

| Sub-task | Objective | Reward |
|----------|-----------|--------|
| 1a. Meet Captain Smith | Find Smith on the upper deck, agree to be his page | Journal item |
| 1b. Fetch Supplies | Collect 3 supply crates from around the ship | Sailor's Knife (weapon) |
| 1c. Survive the Storm | Navigate the deck avoiding sliding barrels (obstacle mini-game) | Sea Legs badge |
| 1d. Make a Friend | Talk to Richard Mutton below deck, share your bread ration | Richard becomes companion |

---

### Quest 2: "Building James Fort"
**Map:** `jamestown` — The Jamestown clearing with forest edges, riverbank, and construction areas
**NPCs:** Captain Smith, Carpenter NPC, Settler NPCs

| Sub-task | Objective | Reward |
|----------|-----------|--------|
| 2a. Chop Trees | Chop 10 trees at the forest edge to collect logs | Axe (weapon/tool) |
| 2b. Gather Materials | Collect 5 hay bundles + 5 mud piles from the riverbank area | Builder's Pouch |
| 2c. Build Palisade Wall | Deliver materials to 4 construction sites around the perimeter | Fort progress |
| 2d. Build the Storehouse | Deliver 8 logs to the storehouse site | Storehouse Key |
| 2e. Build the Lookout | Construct a lookout tower on the south edge to watch for Spanish ships | Spyglass item |

---

### Quest 3: "The Hunt"
**Map:** `wilderness` — Virginia wilderness with forest, shore, and a training clearing
**NPCs:** Hunter NPC, Captain Smith

| Sub-task | Objective | Reward |
|----------|-----------|--------|
| 3a. Sword Training | Learn to swing the sword at the training clearing (tutorial combat) | Sword proficiency |
| 3b. Musket Training | Learn to aim and fire at targets (timing mini-game) | Musket (weapon) |
| 3c. Gather Shellfish | Collect 5 mussels + 5 crabs along the shore section | Cooked Shellfish (heal item) |
| 3d. Hunt Rabbits | Track and catch 3 rabbits in the forest section | Rabbit Pelts |
| 3e. The Great Deer Hunt | Track and hunt a deer using any weapon | Venison (major heal) + Hunter title |

**Combat System:** Simple action-based — walk up to prey, choose weapon, timing-based hit chance. Sword=close/fast, Musket=far/slow reload, Bow=medium/medium.

---

### Quest 4: "Joining the Powhatan"
**Map:** `powhatan-village` — The village with longhouses, archery range, and ball field areas
**NPCs:** Namontack (Powhatan boy/friend), Chief Powhatan, Village Elder

This quest is about **cultural exchange and friendship**, not conquest. Samuel is a guest learning from the Powhatan people.

| Sub-task | Objective | Reward |
|----------|-----------|--------|
| 4a. Meet Namontack | Namontack greets you at the village entrance and offers to teach you | Friendship Bracelet |
| 4b. Learn the Bow | Archery mini-game at the range area — hit 3/5 targets | Powhatan Bow (best bow weapon) |
| 4c. Make a Pouch | Collect deer hide + sinew, follow crafting steps with Village Elder | Leather Pouch (extra inventory) |
| 4d. Play Pasuckuakohowog | Soccer-like ball game at the field — score 2 goals (movement mini-game) | Ball Game Champion badge |
| 4e. The Ceremony | Choose to wear Powhatan clothing and adopt the warrior hairstyle | Powhatan Outfit + Warrior Hair |
| 4f. A Feast Together | Bring food (venison, shellfish) to share at a feast | Trust of the Powhatan |

**Tone:** Respectful and educational. Dialogue explains Powhatan customs. Samuel is learning, not appropriating — he's invited and honored.

---

### Quest 5: "Two Worlds United"
**Map:** `jamestown` (revisited) — Return to the expanded Jamestown fort
**NPCs:** Captain Smith, Namontack, Chief Powhatan, Settlers

| Sub-task | Objective | Reward |
|----------|-----------|--------|
| 5a. The Trade | Bring English tools to Namontack at the fort gate, receive corn and knowledge | Trade goods |
| 5b. Defend the Fort | Spanish scouts spotted! Prepare defenses at the lookout tower | Defender's Medal |
| 5c. Bridge Between Worlds | Mediate between settlers and Powhatan during a dispute at the fort | Peacemaker title |
| 5d. Samuel's Choice | Final dialogue — Samuel reflects on his journey, chooses to stay | Game completion |

---

### Item & Weapon Database

**Weapons:**
| ID | Name | Type | ATK | Range | Source |
|----|------|------|-----|-------|--------|
| `sailor-knife` | Sailor's Knife | Melee | 3 | Close | Quest 1b |
| `axe` | Woodcutter's Axe | Melee | 5 | Close | Quest 2a |
| `sword` | English Sword | Melee | 8 | Close | Quest 3a |
| `musket` | Musket | Ranged | 12 | Far | Quest 3b |
| `basic-bow` | Hunting Bow | Ranged | 6 | Medium | Quest 3 start |
| `powhatan-bow` | Powhatan Bow | Ranged | 10 | Medium | Quest 4b |

**Items:**
| ID | Name | Effect | Source |
|----|------|--------|--------|
| `journal` | Samuel's Journal | Quest log | Quest 1a |
| `bread-ration` | Bread Ration | Heal 5 HP | Ship |
| `cooked-shellfish` | Cooked Shellfish | Heal 15 HP | Quest 3c |
| `venison` | Venison | Heal 30 HP | Quest 3e |
| `rabbit-pelt` | Rabbit Pelt | Trade item | Quest 3d |
| `logs` | Wood Logs | Building material | Trees |
| `hay` | Hay Bundle | Building material | Riverbank |
| `mud` | Mud Pile | Building material | Riverbank |
| `leather-pouch` | Leather Pouch | +5 inventory slots | Quest 4c |
| `spyglass` | Spyglass | Reveal hidden areas | Quest 2e |

---

## Part 2: Technical Architecture

### Project Setup
```
npx degit rpgjs/starter blood-on-the-river
cd blood-on-the-river
npm install
```

### File Structure
```
blood-on-the-river/
├── rpg.toml                    # RPG-JS config (RPG mode, start map, start character)
├── package.json
├── vercel.json                 # Vercel deploy config
├── src/
│   └── modules/
│       └── main/
│           ├── server/
│           │   ├── index.ts            # Module registration
│           │   ├── player.ts           # Player initialization, quest state
│           │   ├── maps/
│           │   │   ├── ship.ts              # Quest 1: The Susan Constant
│           │   │   ├── jamestown.ts          # Quest 2 & 5: Fort and clearing
│           │   │   ├── wilderness.ts         # Quest 3: Forest, shore, training
│           │   │   ├── powhatan-village.ts   # Quest 4: Village with all areas
│           │   │   └── tmx/                  # Tiled map files
│           │   ├── events/
│           │   │   ├── npcs/
│           │   │   │   ├── captain-smith.ts
│           │   │   │   ├── reverend-hunt.ts
│           │   │   │   ├── richard-mutton.ts
│           │   │   │   ├── namontack.ts
│           │   │   │   ├── chief-powhatan.ts
│           │   │   │   ├── carpenter.ts
│           │   │   │   ├── hunter.ts
│           │   │   │   └── village-elder.ts
│           │   │   ├── interactables/
│           │   │   │   ├── tree.ts
│           │   │   │   ├── supply-crate.ts
│           │   │   │   ├── hay-pile.ts
│           │   │   │   ├── mud-pile.ts
│           │   │   │   ├── shellfish.ts
│           │   │   │   ├── construction-site.ts
│           │   │   │   └── archery-target.ts
│           │   │   └── creatures/
│           │   │       ├── rabbit.ts
│           │   │       ├── deer.ts
│           │   │       ├── crab.ts
│           │   │       └── mussel.ts
│           │   └── database/
│           │       ├── items.ts
│           │       └── weapons.ts
│           └── client/
│               ├── index.ts
│               ├── characters/
│               │   ├── samuel.png       # 4x4 spritesheet (placeholder)
│               │   ├── npc-smith.png
│               │   ├── npc-namontack.png
│               │   └── ... (other character sprites)
│               ├── tilesets/
│               │   ├── terrain.png      # Grass, dirt, water, sand
│               │   ├── buildings.png    # Fort walls, houses, ship
│               │   └── objects.png      # Trees, crates, items
│               └── gui/
│                   ├── quest-log.vue    # Quest log UI component
│                   └── inventory.vue    # Inventory display
```

### Map Connections (4 maps)
```
ship → jamestown ←→ wilderness
            ↕
      powhatan-village
```
- `ship` — One-way start. After Quest 1 completes, Samuel arrives at Jamestown.
- `jamestown` — Central hub. Connects to wilderness (east edge) and Powhatan village (north edge).
- `wilderness` — Accessible from Jamestown. Forest, shore, and training areas in one map.
- `powhatan-village` — Accessible from Jamestown after Quest 3. Village, archery range, ball field in one map.
- Quest 5 returns to `jamestown` with new NPCs/events spawned.

### Quest State Machine
Using RPG-JS player variables:

```typescript
// Quest progress tracked as variables on the player
// Format: quest_{questNum}_{subtask} = 'not_started' | 'active' | 'complete'

// Examples:
player.setVariable('quest_1a', 'complete')
player.setVariable('quest_2_logs', 7)        // 7/10 logs collected
player.setVariable('quest_3_rabbits', 2)     // 2/3 rabbits caught
player.setVariable('current_quest', 2)       // Which main quest is active

// NPCs check these variables to show appropriate dialogue:
async onAction(player: RpgPlayer) {
    const quest = player.getVariable('current_quest')
    if (quest === 1 && player.getVariable('quest_1a') !== 'complete') {
        await player.showText("Samuel! I need a capable page. Will you join me?")
        // ... choice logic
    }
}
```

### Save/Load (LocalStorage)
```typescript
// Save
const saveData = player.save()
localStorage.setItem('blood-on-the-river-save', JSON.stringify(saveData))

// Load
const raw = localStorage.getItem('blood-on-the-river-save')
if (raw) player.load(JSON.parse(raw))
```

### Placeholder Sprites
Generate simple colored-rectangle placeholder PNGs programmatically at build time or use a minimal pixel art set from OpenGameArt.org. Each character gets a distinct color:
- Samuel: Blue
- Captain Smith: Red
- Namontack: Green
- Other NPCs: Yellow/Orange/Purple
- Terrain: standard tileset from RPG-JS starter or OpenGameArt

### Vercel Config
```json
{
  "buildCommand": "RPG_TYPE=rpg npm run build",
  "outputDirectory": "dist/standalone",
  "framework": null
}
```

---

## Part 3: Implementation Phases

### Phase 1 — MVP (Walking & Talking)
1. Scaffold RPG-JS project
2. Create placeholder sprite PNGs (colored rectangles)
3. Build `ship` map — Quest 1 complete
4. Add Samuel (player character) with movement
5. Add Captain Smith NPC with Quest 1 dialogue
6. Implement quest state variables
7. LocalStorage save/load
8. Deploy to Vercel

### Phase 2 — Building System (Quest 2)
1. Build `jamestown` map with forest edge, riverbank, construction sites
2. Implement interactable objects (trees, hay, mud) with collection mechanics
3. Add item database (logs, hay, mud)
4. Build construction-site events that consume materials
5. Complete Quest 2 chain
6. Add basic inventory UI (Vue component)

### Phase 3 — Hunting (Quest 3)
1. Build `wilderness` map with forest, shore, and training clearing
2. Implement weapon system (sword, musket, bow)
3. Add creature events (rabbits, deer, crabs, mussels)
4. Simple combat — walk up, choose weapon, timing-based hit
5. Complete Quest 3 chain

### Phase 4 — Powhatan Village (Quest 4)
1. Build `powhatan-village` map with longhouses, archery range, ball field
2. Add Namontack, Chief Powhatan, Village Elder NPCs
3. Archery mini-game (target shooting)
4. Ball game mini-game (simple soccer)
5. Crafting system for pouch
6. Outfit/appearance change system
7. Complete Quest 4 chain

### Phase 5 — Finale & Polish (Quest 5)
1. Add Quest 5 NPCs/events to `jamestown` map
2. Complete Quest 5 chain (trade, defense, mediation)
3. Quest log UI
4. Title screen
5. Replace placeholder sprites with real art
6. Add sound effects and music
