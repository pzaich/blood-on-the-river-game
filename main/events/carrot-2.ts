import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'carrot-2', hitbox: { width: 16, height: 16 } })
export default class Carrot2Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('carrot-sprite') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already picked."); return }
        if (player.getVariable('quest_3c') !== 'active') { await player.showText("Fresh carrots grow in the soil."); return }
        this.collected = true
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Carrot picked! (${b} crops)`, { time: 1500 })
    }
}
