import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'bear-1', hitbox: { width: 8, height: 8 } })
export default class Bear1Event extends RpgEvent {
    onInit() { this.setGraphic('bear-sprite') }
    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_3e') === 'active') {
            await player.showText("A massive black bear! It growls at you. Better leave it alone and focus on the deer.")
        } else {
            await player.showText("A large black bear forages in the forest. Best keep your distance!")
        }
    }
}
