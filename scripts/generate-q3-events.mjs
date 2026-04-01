/**
 * Generate Quest 3 event files (hunter NPC, creatures, targets, map exits)
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const eventsDir = join(__dirname, '..', 'main', 'events')

// Hunter NPC
writeFileSync(join(eventsDir, 'hunter.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'hunter',
    hitbox: { width: 32, height: 16 }
})
export default class HunterEvent extends RpgEvent {
    onInit() {
        this.setGraphic('richard') // placeholder
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 3) {
            await player.showText("I'm the hunter. Come back when you're ready to learn.", { talkWith: this })
            return
        }

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')
        const q3c = player.getVariable('quest_3c')
        const q3d = player.getVariable('quest_3d')
        const q3e = player.getVariable('quest_3e')

        if (!q3a) {
            await player.showText("Welcome to the wilderness, Samuel! I'll teach you to survive.", { talkWith: this })
            await player.showText("First, sword training. Hit the training targets to learn.", { talkWith: this })
            player.setVariable('quest_3a', 'active')
            player.setVariable('quest_3a_hits', 0)
            return
        }

        if (q3a === 'active') {
            const hits = player.getVariable('quest_3a_hits') || 0
            if (hits >= 2) {
                await player.showText("Good swordsmanship! Now let's try the musket.", { talkWith: this })
                player.setVariable('quest_3a', 'complete')
                player.setVariable('quest_3b', 'active')
                player.setVariable('quest_3b_hits', 0)
            } else {
                await player.showText(\`Hit the training targets with your sword! (\${hits}/2)\`, { talkWith: this })
            }
            return
        }

        if (q3b === 'active') {
            const hits = player.getVariable('quest_3b_hits') || 0
            if (hits >= 2) {
                await player.showText("Fine shooting! Now gather food. Collect 5 mussels and 5 crabs from the shore.", { talkWith: this })
                player.setVariable('quest_3b', 'complete')
                player.setVariable('quest_3c', 'active')
                player.setVariable('quest_3_mussels', 0)
                player.setVariable('quest_3_crabs', 0)
            } else {
                await player.showText(\`Hit the targets again — this time imagine a musket! (\${hits}/2)\`, { talkWith: this })
            }
            return
        }

        if (q3c === 'active') {
            const m = player.getVariable('quest_3_mussels') || 0
            const c = player.getVariable('quest_3_crabs') || 0
            if (m >= 5 && c >= 5) {
                await player.showText("Excellent! Now hunt 3 rabbits in the forest.", { talkWith: this })
                player.setVariable('quest_3c', 'complete')
                player.setVariable('quest_3d', 'active')
                player.setVariable('quest_3_rabbits', 0)
            } else {
                await player.showText(\`Keep gathering! (Mussels: \${m}/5, Crabs: \${c}/5)\`, { talkWith: this })
            }
            return
        }

        if (q3d === 'active') {
            const r = player.getVariable('quest_3_rabbits') || 0
            if (r >= 3) {
                await player.showText("You're a natural hunter! One final challenge — find and hunt the great deer.", { talkWith: this })
                player.setVariable('quest_3d', 'complete')
                player.setVariable('quest_3e', 'active')
            } else {
                await player.showText(\`Hunt rabbits in the forest. (\${r}/3)\`, { talkWith: this })
            }
            return
        }

        if (q3e === 'active') {
            await player.showText("The deer roams deep in the forest. Be patient and careful.", { talkWith: this })
            return
        }

        if (q3e === 'complete') {
            await player.showText("You've mastered the hunt, Samuel! Head back to Jamestown.", { talkWith: this })
            player.setVariable('current_quest', 4)
            return
        }
    }
}
`)
console.log('Generated hunter.ts')

// Training targets
for (let i = 1; i <= 2; i++) {
  writeFileSync(join(eventsDir, `target-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'target-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class Target${i}Event extends RpgEvent {
    private hitCooldown = false

    onInit() {
        this.setGraphic('crate') // placeholder
    }

    async onAction(player: RpgPlayer) {
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 1500)

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')

        if (q3a === 'active') {
            const hits = (player.getVariable('quest_3a_hits') || 0) + 1
            player.setVariable('quest_3a_hits', hits)
            player.showNotification(\`Sword hit! (\${hits}/2)\`, { time: 1500 })
            if (hits >= 2) player.showNotification("Sword training done! Talk to the hunter.", { time: 3000 })
        } else if (q3b === 'active') {
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits)
            player.showNotification(\`Musket hit! (\${hits}/2)\`, { time: 1500 })
            if (hits >= 2) player.showNotification("Musket training done! Talk to the hunter.", { time: 3000 })
        } else {
            await player.showText("A training target.")
        }
    }
}
`)
}
console.log('Generated target-1.ts, target-2.ts')

// Mussels
for (let i = 1; i <= 5; i++) {
  writeFileSync(join(eventsDir, `mussel-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'mussel-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class Mussel${i}Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("Mussels clinging to the rocks.")
            return
        }
        this.collected = true
        const m = (player.getVariable('quest_3_mussels') || 0) + 1
        player.setVariable('quest_3_mussels', m)
        player.showNotification(\`Mussel collected! (\${m}/5)\`, { time: 1500 })
    }
}
`)
}
console.log('Generated mussel-1..5.ts')

// Crabs
for (let i = 1; i <= 5; i++) {
  writeFileSync(join(eventsDir, `crab-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'crab-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class Crab${i}Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("A crab scuttling along the sand.")
            return
        }
        this.collected = true
        const c = (player.getVariable('quest_3_crabs') || 0) + 1
        player.setVariable('quest_3_crabs', c)
        player.showNotification(\`Crab caught! (\${c}/5)\`, { time: 1500 })
    }
}
`)
}
console.log('Generated crab-1..5.ts')

// Rabbits
for (let i = 1; i <= 3; i++) {
  writeFileSync(join(eventsDir, `rabbit-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'rabbit-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class Rabbit${i}Event extends RpgEvent {
    private caught = false
    onInit() { this.setGraphic('richard') }

    async onAction(player: RpgPlayer) {
        if (this.caught) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3d') !== 'active') {
            await player.showText("A rabbit hops around the forest.")
            return
        }
        this.caught = true
        const r = (player.getVariable('quest_3_rabbits') || 0) + 1
        player.setVariable('quest_3_rabbits', r)
        player.showNotification(\`Rabbit caught! (\${r}/3)\`, { time: 1500 })
        if (r >= 3) player.showNotification("All rabbits caught! Talk to the hunter.", { time: 3000 })
    }
}
`)
}
console.log('Generated rabbit-1..3.ts')

// Deer
writeFileSync(join(eventsDir, 'deer-1.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'deer-1',
    hitbox: { width: 32, height: 16 }
})
export default class Deer1Event extends RpgEvent {
    private hunted = false
    onInit() { this.setGraphic('hunt') }

    async onAction(player: RpgPlayer) {
        if (this.hunted) { await player.showText("The deer has been hunted."); return }
        if (player.getVariable('quest_3e') !== 'active') {
            await player.showText("A magnificent deer. It watches you cautiously.")
            return
        }
        await player.showText("You carefully approach the deer...")
        const choice = await player.showChoices("How do you hunt?", [
            { text: "Sword — charge!", value: 'sword' },
            { text: "Bow — steady aim", value: 'bow' },
            { text: "Sneak closer first", value: 'sneak' }
        ])
        if (choice && choice.value === 'sneak') {
            await player.showText("You sneak closer... the deer doesn't notice. Now strike!")
            this.hunted = true
            player.setVariable('quest_3e', 'complete')
            player.showNotification("Deer hunted! You're a true hunter. Talk to the hunter.", { time: 3000 })
        } else if (choice && choice.value === 'bow') {
            this.hunted = true
            player.setVariable('quest_3e', 'complete')
            player.showNotification("Perfect shot! Deer hunted. Talk to the hunter.", { time: 3000 })
        } else {
            await player.showText("The deer bolts! It's too fast. Try a different approach.")
        }
    }
}
`)
console.log('Generated deer-1.ts')

// Return to Jamestown exit
writeFileSync(join(eventsDir, 'to-jamestown.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-jamestown',
    hitbox: { width: 32, height: 16 }
})
export default class ToJamestownEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        player.changeMap('jamestown')
    }
}
`)
console.log('Generated to-jamestown.ts')

// From Jamestown entry (same as start point, no event needed - just object in TMX)

console.log('All Quest 3 events generated!')
