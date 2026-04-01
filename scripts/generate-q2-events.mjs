/**
 * Generate Quest 2 event files (trees, hay, mud, construction sites, etc.)
 * Each RPG-JS event needs its own file with a default export.
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const eventsDir = join(__dirname, '..', 'main', 'events')

function makeTree(n) {
  return `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'tree-${n}',
    hitbox: { width: 32, height: 16 }
})
export default class Tree${n}Event extends RpgEvent {
    private chopped = false

    onInit() {
        this.setGraphic('crate') // placeholder — green square would be better
    }

    async onAction(player: RpgPlayer) {
        if (this.chopped) {
            await player.showText("Just a stump now.")
            return
        }
        const q2a = player.getVariable('quest_2a')
        const q2d = player.getVariable('quest_2d')

        if (q2a === 'active' || q2d === 'active') {
            this.chopped = true
            if (q2a === 'active') {
                const logs = (player.getVariable('quest_2_logs') || 0) + 1
                player.setVariable('quest_2_logs', logs)
                player.showNotification(\`Chopped a tree! (\${logs}/10 logs)\`, { time: 1500 })
                if (logs >= 10) {
                    player.showNotification("All logs collected! Talk to the carpenter.", { time: 3000 })
                }
            } else {
                const logs = (player.getVariable('quest_2d_logs') || 0) + 1
                player.setVariable('quest_2d_logs', logs)
                player.showNotification(\`Chopped a tree! (\${logs}/8 logs for storehouse)\`, { time: 1500 })
            }
        } else {
            await player.showText("A tall tree. No reason to chop it right now.")
        }
    }
}
`
}

function makeHay(n) {
  return `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'hay-${n}',
    hitbox: { width: 32, height: 16 }
})
export default class Hay${n}Event extends RpgEvent {
    private collected = false

    onInit() {
        this.setGraphic('crate') // placeholder
    }

    async onAction(player: RpgPlayer) {
        if (this.collected) {
            await player.showText("Already gathered.")
            return
        }
        if (player.getVariable('quest_2b') !== 'active') {
            await player.showText("A bundle of dried hay by the riverbank.")
            return
        }
        this.collected = true
        const hay = (player.getVariable('quest_2_hay') || 0) + 1
        player.setVariable('quest_2_hay', hay)
        player.showNotification(\`Gathered hay! (\${hay}/5)\`, { time: 1500 })
        if (hay >= 5 && (player.getVariable('quest_2_mud') || 0) >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
`
}

function makeMud(n) {
  return `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'mud-${n}',
    hitbox: { width: 32, height: 16 }
})
export default class Mud${n}Event extends RpgEvent {
    private collected = false

    onInit() {
        this.setGraphic('barrel') // placeholder
    }

    async onAction(player: RpgPlayer) {
        if (this.collected) {
            await player.showText("Already gathered.")
            return
        }
        if (player.getVariable('quest_2b') !== 'active') {
            await player.showText("A pile of thick mud near the water.")
            return
        }
        this.collected = true
        const mud = (player.getVariable('quest_2_mud') || 0) + 1
        player.setVariable('quest_2_mud', mud)
        player.showNotification(\`Gathered mud! (\${mud}/5)\`, { time: 1500 })
        if ((player.getVariable('quest_2_hay') || 0) >= 5 && mud >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
`
}

function makeConstruction(n) {
  return `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'construction-${n}',
    hitbox: { width: 32, height: 16 }
})
export default class Construction${n}Event extends RpgEvent {
    private built = false

    onInit() {
        this.setGraphic('crate') // placeholder
    }

    async onAction(player: RpgPlayer) {
        if (this.built) {
            await player.showText("This wall section is complete.")
            return
        }
        if (player.getVariable('quest_2c') !== 'active') {
            await player.showText("A construction site. Nothing to do here yet.")
            return
        }
        this.built = true
        const walls = (player.getVariable('quest_2_walls') || 0) + 1
        player.setVariable('quest_2_walls', walls)
        player.showNotification(\`Wall built! (\${walls}/4)\`, { time: 1500 })
        if (walls >= 4) {
            player.showNotification("All walls complete! Talk to the carpenter.", { time: 3000 })
        }
    }
}
`
}

// Generate trees 1-10
for (let i = 1; i <= 10; i++) {
  writeFileSync(join(eventsDir, `tree-${i}.ts`), makeTree(i))
}
console.log('Generated tree-1.ts through tree-10.ts')

// Generate hay 1-5
for (let i = 1; i <= 5; i++) {
  writeFileSync(join(eventsDir, `hay-${i}.ts`), makeHay(i))
}
console.log('Generated hay-1.ts through hay-5.ts')

// Generate mud 1-5
for (let i = 1; i <= 5; i++) {
  writeFileSync(join(eventsDir, `mud-${i}.ts`), makeMud(i))
}
console.log('Generated mud-1.ts through mud-5.ts')

// Generate construction sites 1-4
for (let i = 1; i <= 4; i++) {
  writeFileSync(join(eventsDir, `construction-${i}.ts`), makeConstruction(i))
}
console.log('Generated construction-1.ts through construction-4.ts')

console.log('All Quest 2 events generated!')
