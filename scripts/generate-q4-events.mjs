/**
 * Generate Quest 4 events: Powhatan village NPCs, archery, ball game, crafting, feast
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const eventsDir = join(__dirname, '..', 'main', 'events')

// Namontack - main quest giver for Q4
writeFileSync(join(eventsDir, 'namontack.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'namontack',
    hitbox: { width: 32, height: 16 }
})
export default class NamontackEvent extends RpgEvent {
    onInit() { this.setGraphic('richard') }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 4) {
            await player.showText("Welcome, friend. Come back when you are ready to learn our ways.", { talkWith: this })
            return
        }

        const q4a = player.getVariable('quest_4a')
        const q4b = player.getVariable('quest_4b')
        const q4c = player.getVariable('quest_4c')
        const q4d = player.getVariable('quest_4d')
        const q4e = player.getVariable('quest_4e')
        const q4f = player.getVariable('quest_4f')

        if (!q4a) {
            await player.showText("Samuel! I am Namontack. My people have been watching your settlement.", { talkWith: this })
            await player.showText("You are brave to come here. I would like to teach you our ways — if you are willing to learn.", { talkWith: this })
            const choice = await player.showChoices("Will you learn from Namontack?", [
                { text: "Yes, I want to learn!", value: 'yes' },
                { text: "Tell me more.", value: 'more' }
            ])
            if (choice && choice.value === 'more') {
                await player.showText("We will teach you to shoot the bow, craft useful things, play our games, and share a feast.", { talkWith: this })
                await player.showText("You will be our honored guest. What do you say?", { talkWith: this })
            }
            await player.showText("Wonderful! First, let me teach you the bow. Go to the archery range on the east side. Hit 3 of 5 targets!", { talkWith: this })
            player.setVariable('quest_4a', 'complete')
            player.setVariable('quest_4b', 'active')
            player.setVariable('quest_4b_hits', 0)
            return
        }

        if (q4b === 'active') {
            const hits = player.getVariable('quest_4b_hits') || 0
            if (hits >= 3) {
                await player.showText("Excellent shooting! You have the eye of a hunter. Take this — a Powhatan bow, crafted by our finest bowyer.", { talkWith: this })
                player.setVariable('quest_4b', 'complete')
                player.setVariable('quest_4c', 'active')
                await player.showText("Now visit the Village Elder. She will teach you to make a leather pouch. You'll need deer hide and sinew — look around the village.", { talkWith: this })
            } else {
                await player.showText(\`Keep practicing at the archery range! (\${hits}/3 hits)\`, { talkWith: this })
            }
            return
        }

        if (q4c === 'active') {
            if (player.getVariable('quest_4c') === 'complete') return
            await player.showText("Have you visited the Village Elder? She's by the longhouses on the west side.", { talkWith: this })
            return
        }

        if (q4c === 'complete' && (!q4d || q4d !== 'complete')) {
            if (q4d !== 'active') {
                await player.showText("Nice pouch! Now let's play Pasuckuakohowog — our ball game!", { talkWith: this })
                await player.showText("Go to the ball field in the south. Score 2 goals to win!", { talkWith: this })
                player.setVariable('quest_4d', 'active')
                player.setVariable('quest_4d_goals', 0)
            } else {
                const goals = player.getVariable('quest_4d_goals') || 0
                if (goals >= 2) {
                    await player.showText("You won! You play like one of us!", { talkWith: this })
                    player.setVariable('quest_4d', 'complete')
                    player.setVariable('quest_4e', 'active')
                    await player.showText("Chief Powhatan wishes to honor you with a ceremony. Go speak with him by the fire.", { talkWith: this })
                } else {
                    await player.showText(\`Score goals at the ball field! (\${goals}/2)\`, { talkWith: this })
                }
            }
            return
        }

        if (q4e === 'active') {
            await player.showText("Go speak with Chief Powhatan at the feast area.", { talkWith: this })
            return
        }

        if (q4e === 'complete' && q4f !== 'complete') {
            if (q4f !== 'active') {
                await player.showText("You look like a true warrior now, Samuel! One last thing — let us share a feast together.", { talkWith: this })
                await player.showText("Go to the feast fire and offer food to celebrate our friendship.", { talkWith: this })
                player.setVariable('quest_4f', 'active')
            } else {
                await player.showText("Go to the feast fire in the center of the village.", { talkWith: this })
            }
            return
        }

        if (q4f === 'complete') {
            await player.showText("You are part of our family now, Samuel. Go back to Jamestown — but remember, we are always here.", { talkWith: this })
            player.setVariable('current_quest', 5)
            return
        }
    }
}
`)
console.log('Generated namontack.ts')

// Chief Powhatan
writeFileSync(join(eventsDir, 'chief-powhatan.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'chief-powhatan',
    hitbox: { width: 32, height: 16 }
})
export default class ChiefPowhatanEvent extends RpgEvent {
    onInit() { this.setGraphic('smith') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4e') === 'active') {
            await player.showText("Young Samuel, you have shown respect and courage.", { talkWith: this })
            await player.showText("We wish to honor you. Will you wear the clothing of our people and take the warrior's hairstyle?", { talkWith: this })
            const choice = await player.showChoices("Accept the ceremony?", [
                { text: "I am honored. Yes!", value: 'yes' },
                { text: "I'm not sure...", value: 'unsure' }
            ])
            if (choice && choice.value === 'unsure') {
                await player.showText("There is no shame in thinking. This is a gift, not an obligation. You may return when ready.", { talkWith: this })
                return
            }
            await player.showText("Then it is done! You now wear the clothing of the Powhatan and carry the warrior's spirit.", { talkWith: this })
            await player.showText("Remember — this is not about becoming someone else. It is about understanding each other.", { talkWith: this })
            player.setVariable('quest_4e', 'complete')
            player.showNotification("Ceremony complete! You received Powhatan Outfit and Warrior Hair.", { time: 3000 })
            return
        }

        if (player.getVariable('quest_4e') === 'complete') {
            await player.showText("You honor us, Samuel. Enjoy the feast with Namontack.", { talkWith: this })
            return
        }

        await player.showText("I am Chief Powhatan. Our peoples can learn much from each other.", { talkWith: this })
    }
}
`)
console.log('Generated chief-powhatan.ts')

// Village Elder
writeFileSync(join(eventsDir, 'village-elder.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'village-elder',
    hitbox: { width: 32, height: 16 }
})
export default class VillageElderEvent extends RpgEvent {
    onInit() { this.setGraphic('hunt') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("I am the Village Elder. I teach the young ones to craft.", { talkWith: this })
            return
        }

        const hide = player.getVariable('quest_4c_hide')
        const sinew = player.getVariable('quest_4c_sinew')

        if (!hide || !sinew) {
            await player.showText("To make a pouch, you need deer hide and sinew. Look around the village for them.", { talkWith: this })
            if (hide) await player.showText("You have the deer hide. Now find sinew.", { talkWith: this })
            if (sinew) await player.showText("You have the sinew. Now find deer hide.", { talkWith: this })
            return
        }

        await player.showText("You have both materials! Let me show you how to make a pouch...", { talkWith: this })
        await player.showText("First, cut the hide to size. Then punch holes along the edge. Finally, thread the sinew through to form the pouch.", { talkWith: this })
        await player.showText("There! A fine leather pouch. You can carry more supplies now.", { talkWith: this })
        player.setVariable('quest_4c', 'complete')
        player.showNotification("Leather Pouch crafted! Talk to Namontack.", { time: 3000 })
    }
}
`)
console.log('Generated village-elder.ts')

// Deer hide collectible
writeFileSync(join(eventsDir, 'deer-hide.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'deer-hide',
    hitbox: { width: 32, height: 16 }
})
export default class DeerHideEvent extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("A deer hide stretched on a frame to dry.")
            return
        }
        this.collected = true
        player.setVariable('quest_4c_hide', true)
        player.showNotification("Deer hide collected!", { time: 1500 })
        if (player.getVariable('quest_4c_sinew')) {
            player.showNotification("Got both materials! Talk to the Village Elder.", { time: 3000 })
        }
    }
}
`)

// Sinew collectible
writeFileSync(join(eventsDir, 'sinew-pile.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'sinew-pile',
    hitbox: { width: 32, height: 16 }
})
export default class SinewPileEvent extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("Strips of dried sinew, used for sewing and binding.")
            return
        }
        this.collected = true
        player.setVariable('quest_4c_sinew', true)
        player.showNotification("Sinew collected!", { time: 1500 })
        if (player.getVariable('quest_4c_hide')) {
            player.showNotification("Got both materials! Talk to the Village Elder.", { time: 3000 })
        }
    }
}
`)
console.log('Generated deer-hide.ts, sinew-pile.ts')

// Archery targets (5)
for (let i = 1; i <= 5; i++) {
  writeFileSync(join(eventsDir, `archery-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'archery-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class Archery${i}Event extends RpgEvent {
    private hitCooldown = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4b') !== 'active') {
            await player.showText("An archery target made of woven reeds.")
            return
        }
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 2000)

        const hits = (player.getVariable('quest_4b_hits') || 0) + 1
        player.setVariable('quest_4b_hits', hits)
        player.showNotification(\`Arrow hits! (\${hits}/3)\`, { time: 1500 })
        if (hits >= 3) {
            player.showNotification("Archery complete! Talk to Namontack.", { time: 3000 })
        }
    }
}
`)
}
console.log('Generated archery-1..5.ts')

// Ball goals (2)
for (let i = 1; i <= 2; i++) {
  writeFileSync(join(eventsDir, `ball-goal-${i}.ts`), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'ball-goal-${i}',
    hitbox: { width: 32, height: 16 }
})
export default class BallGoal${i}Event extends RpgEvent {
    private cooldown = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4d') !== 'active') {
            await player.showText("A goal post for Pasuckuakohowog, the Powhatan ball game.")
            return
        }
        if (this.cooldown) return
        this.cooldown = true
        setTimeout(() => { this.cooldown = false }, 3000)

        const goals = (player.getVariable('quest_4d_goals') || 0) + 1
        player.setVariable('quest_4d_goals', goals)
        player.showNotification(\`Goal! (\${goals}/2)\`, { time: 1500 })
        if (goals >= 2) {
            player.showNotification("You won the ball game! Talk to Namontack.", { time: 3000 })
        }
    }
}
`)
}
console.log('Generated ball-goal-1..2.ts')

// Feast fire
writeFileSync(join(eventsDir, 'feast-fire.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'feast-fire',
    hitbox: { width: 32, height: 16 }
})
export default class FeastFireEvent extends RpgEvent {
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4f') !== 'active') {
            await player.showText("The central fire pit, where the village gathers.")
            return
        }

        await player.showText("You share venison and shellfish from your hunts with the Powhatan people.")
        await player.showText("In return, they share corn, squash, and stories of their ancestors.")
        await player.showText("Namontack teaches you words in his language. The children laugh and play around the fire.")
        await player.showText("Tonight, you are not English or Powhatan. You are simply friends.")
        player.setVariable('quest_4f', 'complete')
        player.showNotification("Feast complete! You've earned the Trust of the Powhatan. Talk to Namontack.", { time: 4000 })
    }
}
`)
console.log('Generated feast-fire.ts')

// Return to Jamestown from Powhatan
writeFileSync(join(eventsDir, 'to-jamestown-pv.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-jamestown-pv',
    hitbox: { width: 32, height: 16 }
})
export default class ToJamestownPVEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        player.changeMap('jamestown')
    }
}
`)
console.log('Generated to-jamestown-pv.ts')

console.log('All Quest 4 events generated!')
