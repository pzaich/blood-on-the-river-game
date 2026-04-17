import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'storehouse-site',
    hitbox: { width: 8, height: 8 }
})
export default class StorehouseSiteEvent extends RpgEvent {
    onInit() {
        this.setGraphic('fort')
    }

    async onAction(player: RpgPlayer) {
        const q2d = player.getVariable('quest_2d')
        if (q2d !== 'active') {
            await player.showText("A cleared area for a future building.")
            return
        }

        const logs = player.getVariable('quest_2d_logs') || 0
        if (logs >= 8) {
            await player.showText("The storehouse is complete!")
            player.setVariable('quest_2d', 'complete')
            player.setVariable('quest_2e', 'active')
            player.showNotification("Storehouse built! Talk to the carpenter.", { time: 3000 })
        } else {
            await player.showText(`The storehouse needs 8 logs. Chop trees and come back. (${logs}/8)`)
        }
    }
}
