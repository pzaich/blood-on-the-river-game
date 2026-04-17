import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'deer-1',
    hitbox: { width: 8, height: 8 }
})
export default class Deer1Event extends RpgEvent {
    private hunted = false
    onInit() { this.setGraphic('deer') }

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
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'questComplete')
            player.showNotification("Deer hunted! You're a true hunter. Talk to Namontack.", { time: 3000 })
        } else if (choice && choice.value === 'bow') {
            this.hunted = true
            player.setVariable('quest_3e', 'complete')
            player.showNotification("Perfect shot! Deer hunted. Talk to the hunter.", { time: 3000 })
        } else {
            await player.showText("The deer bolts! It's too fast. Try a different approach.")
        }
    }
}
