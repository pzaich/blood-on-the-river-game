import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'berry-3',
    hitbox: { width: 16, height: 16 }
})
export default class Berry3Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('berry-sprite') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already picked."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("Wild berries! They look delicious.")
            return
        }
        this.collected = true
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Berries collected! (${b}/3)`, { time: 1500 })
    }
}
