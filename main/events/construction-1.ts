import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'construction-1',
    hitbox: { width: 32, height: 16 }
})
export default class Construction1Event extends RpgEvent {
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
        player.showNotification(`Wall built! (${walls}/4)`, { time: 1500 })
        if (walls >= 4) {
            player.showNotification("All walls complete! Talk to the carpenter.", { time: 3000 })
        }
    }
}
