import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-wilderness',
    hitbox: { width: 16, height: 16 }
})
export default class ToWildernessEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        const quest = player.getVariable('current_quest') || 0
        if (quest >= 3) {
            player.changeMap('wilderness')
        } else {
            player.showNotification("The wilderness is dangerous. Finish building the fort first.", { time: 2000 })
        }
    }
}
