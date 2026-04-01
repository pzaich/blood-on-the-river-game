import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'mud-4',
    hitbox: { width: 16, height: 16 }
})
export default class Mud4Event extends RpgEvent {
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
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const mud = (player.getVariable('quest_2_mud') || 0) + 1
        player.setVariable('quest_2_mud', mud)
        player.showNotification(`Gathered mud! (${mud}/5)`, { time: 1500 })
        if ((player.getVariable('quest_2_hay') || 0) >= 5 && mud >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
