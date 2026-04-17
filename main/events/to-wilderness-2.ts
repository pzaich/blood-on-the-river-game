import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'to-wilderness-2', hitbox: { width: 32, height: 32 } })
export default class ToWilderness2Event extends RpgEvent {
    onInit() { this.through = true }
    async onPlayerTouch(player: RpgPlayer) {
        const quest = player.getVariable('current_quest') || 0
        if (quest >= 3) {
            player.changeMap('wilderness', { x: 64, y: 320 })
        } else {
            player.showNotification("The wilderness is dangerous. Finish building the fort first.", { time: 2000 })
        }
    }
}
