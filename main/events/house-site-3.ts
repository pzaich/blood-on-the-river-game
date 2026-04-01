import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'house-site-3',
    hitbox: { width: 16, height: 16 }
})
export default class HouseSite3Event extends RpgEvent {
    private built = false

    onInit() {
        this.setGraphic('crate')
    }

    async onAction(player: RpgPlayer) {
        if (this.built) {
            await player.showText("A finished house. The settlers are grateful!")
            return
        }
        if (player.getVariable('quest_2f') !== 'active') {
            await player.showText("A good spot for a house.")
            return
        }
        const logs = player.getVariable('quest_2f_logs') || 0
        if (logs < 4) {
            await player.showText(`This house needs 4 logs to build. Chop more trees! (${logs}/4 logs)`)
            return
        }
        this.built = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'build')
        player.setVariable('quest_2f_logs', logs - 4)
        const houses = (player.getVariable('quest_2f_houses') || 0) + 1
        player.setVariable('quest_2f_houses', houses)
        player.showNotification(`House built! (${houses}/4)`, { time: 2000 })
        if (houses >= 4) {
            player.showNotification("All houses built! Talk to the carpenter.", { time: 3000 })
        }
    }
}
