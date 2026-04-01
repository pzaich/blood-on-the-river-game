import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'deer-2',
    hitbox: { width: 8, height: 8 }
})
export default class Deer2Event extends RpgEvent {
    private hunted = false
    onInit() { this.setGraphic('deer-sprite') }

    async onAction(player: RpgPlayer) {
        if (this.hunted) { await player.showText("The deer has been hunted."); return }
        if (player.getVariable('quest_3e') !== 'active') {
            await player.showText("A deer grazes peacefully in the forest.")
            return
        }
        await player.showText("You carefully approach the deer...")
        const choice = await player.showChoices("How do you hunt?", [
            { text: "Sword — charge!", value: 'sword' },
            { text: "Bow — steady aim", value: 'bow' },
            { text: "Sneak closer first", value: 'sneak' }
        ])
        if (choice && (choice.value === 'sneak' || choice.value === 'bow')) {
            this.hunted = true
            player.setVariable('quest_3e', 'complete')
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'questComplete')
            player.showNotification("Deer hunted! Talk to Namontack.", { time: 3000 })
        } else {
            await player.showText("The deer bolts! Try a different approach.")
        }
    }
}
