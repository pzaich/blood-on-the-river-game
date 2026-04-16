import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'construction-2',
    hitbox: { width: 8, height: 8 }
})
export default class Construction2Event extends RpgEvent {
    private built = false

    onInit() {
        this.setGraphic('foundation')
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
        this.built = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'build')
        const walls = (player.getVariable('quest_2_walls') || 0) + 1
        player.setVariable('quest_2_walls', walls)
        player.showNotification(`Wall built! (${walls}/4)`, { time: 1500 })
        if (walls >= 4) {
            player.showNotification("All walls complete! Talk to the carpenter.", { time: 3000 })
        }
    }
}
