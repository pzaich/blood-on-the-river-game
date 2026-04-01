import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'hay-1',
    hitbox: { width: 32, height: 16 }
})
export default class Hay1Event extends RpgEvent {
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
        player.showNotification(`Gathered hay! (${hay}/5)`, { time: 1500 })
        if (hay >= 5 && (player.getVariable('quest_2_mud') || 0) >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
