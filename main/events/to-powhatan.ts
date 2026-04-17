import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-powhatan',
    hitbox: { width: 8, height: 8 }
})
export default class ToPowhatanEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        const quest = player.getVariable('current_quest') || 0
        if (quest >= 4) {
            player.changeMap('powhatan-village', { x: 320, y: 576 })
        } else {
            player.showNotification("You're not ready to visit the Powhatan village yet.", { time: 2000 })
        }
    }
}
