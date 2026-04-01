/**
 * Generate Quest 5 events: Trade, Fort Defense, Mediation, Samuel's Choice
 * These all happen on the Jamestown map with new NPCs/interactions
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const eventsDir = join(__dirname, '..', 'main', 'events')

// Update captain-smith-jt to handle Q5
// (We'll create a separate Q5 handler file instead to avoid overwriting)

// Namontack at Jamestown (Q5 trade partner)
writeFileSync(join(eventsDir, 'namontack-jt.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'namontack-jt',
    hitbox: { width: 32, height: 16 }
})
export default class NamontackJTEvent extends RpgEvent {
    onInit() { this.setGraphic('richard') }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 5) return

        const q5a = player.getVariable('quest_5a')

        if (!q5a || q5a === 'active') {
            await player.showText("Samuel! I have come to trade with your people.", { talkWith: this })
            await player.showText("I bring corn, squash, and knowledge of the land.", { talkWith: this })
            const choice = await player.showChoices("Trade English tools for Powhatan goods?", [
                { text: "Yes, let's trade!", value: 'trade' },
                { text: "What do you need?", value: 'ask' }
            ])
            if (choice && choice.value === 'ask') {
                await player.showText("We need iron tools — axes, knives. In return, you will never go hungry.", { talkWith: this })
                await player.showText("This trade will help both our peoples survive.", { talkWith: this })
            }
            await player.showText("The trade is done! Your storehouse is now full of corn and squash.", { talkWith: this })
            await player.showText("This is how it should be — two peoples helping each other.", { talkWith: this })
            player.setVariable('quest_5a', 'complete')
            player.showNotification("Trade complete! Talk to Captain Smith.", { time: 3000 })
            return
        }

        if (player.getVariable('quest_5c') === 'active') {
            await player.showText("Samuel, please help us. The settlers are angry, but we mean no harm.", { talkWith: this })
            await player.showText("Tell them we only want peace and fair trade.", { talkWith: this })
            return
        }

        await player.showText("Thank you for being a bridge between our peoples, Samuel.", { talkWith: this })
    }
}
`)
console.log('Generated namontack-jt.ts')

// Settler NPC (for the dispute in Q5c)
writeFileSync(join(eventsDir, 'settler.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'settler',
    hitbox: { width: 32, height: 16 }
})
export default class SettlerEvent extends RpgEvent {
    onInit() { this.setGraphic('female') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_5c') === 'active') {
            await player.showText("Those natives took our fishing nets! We can't trust them!", { talkWith: this })
            const choice = await player.showChoices("How do you respond?", [
                { text: "They borrowed them to show us better fishing spots.", value: 'peace' },
                { text: "Let me talk to Namontack about this.", value: 'mediate' },
                { text: "You're right, we should fight!", value: 'fight' }
            ])
            if (choice && (choice.value === 'peace' || choice.value === 'mediate')) {
                await player.showText("...I suppose that could be true. You know them better than we do.", { talkWith: this })
                await player.showText("Fine, I'll give them a chance. But only because you vouch for them, Samuel.", { talkWith: this })
                player.setVariable('quest_5c', 'complete')
                player.showNotification("Dispute resolved peacefully! You're a true Peacemaker.", { time: 3000 })
            } else {
                await player.showText("No, Samuel. Violence is not the answer. Reverend Hunt taught us better.", { talkWith: this })
                await player.showText("Think about what Namontack would say. Try again.", { talkWith: this })
            }
            return
        }

        await player.showText("Life in Virginia is hard, but we're building something here.", { talkWith: this })
    }
}
`)
console.log('Generated settler.ts')

// Lookout event for Q5b (defend the fort)
writeFileSync(join(eventsDir, 'lookout-defend.ts'), `import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'lookout-defend',
    hitbox: { width: 32, height: 16 }
})
export default class LookoutDefendEvent extends RpgEvent {
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_5b') !== 'active') {
            await player.showText("The lookout tower overlooks the river. All clear.")
            return
        }

        await player.showText("You climb the lookout tower and spot sails on the horizon — Spanish ships!")
        await player.showText("You must prepare the defenses!")
        const choice = await player.showChoices("What do you do?", [
            { text: "Light the warning fire", value: 'fire' },
            { text: "Load the cannons", value: 'cannon' },
            { text: "Both — fire AND cannons!", value: 'both' }
        ])
        if (choice && choice.value === 'both') {
            await player.showText("Smart thinking! You light the warning fire AND help load the cannons.")
            await player.showText("The Spanish see the fire and the fort's defenses. They turn away!")
            await player.showText("Virginia is safe — thanks to you, Samuel!")
        } else {
            await player.showText("Good call! The Spanish scouts see that the fort is defended and sail away.")
            await player.showText("Virginia is safe for now.")
        }
        player.setVariable('quest_5b', 'complete')
        player.showNotification("Fort defended! You earned the Defender's Medal.", { time: 3000 })
    }
}
`)
console.log('Generated lookout-defend.ts')

console.log('All Quest 5 events generated!')
