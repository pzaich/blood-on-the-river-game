import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'wheat-3', hitbox: { width: 16, height: 16 } })
export default class Wheat3Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('wheat-sprite') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already harvested."); return }
        if (player.getVariable('quest_3c') !== 'active') { await player.showText("Golden wheat sways in the breeze."); return }
        this.collected = true
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Wheat harvested! (${b} crops)`, { time: 1500 })
    }
}
