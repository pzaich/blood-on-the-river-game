import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'corn-2', hitbox: { width: 8, height: 8 } })
export default class Corn2Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('corn') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already harvested."); return }
        if (player.getVariable('quest_3c') !== 'active') { await player.showText("Wild corn grows tall here."); return }
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Corn harvested! (${b}/3 crops)`, { time: 1500 })
    }
}
