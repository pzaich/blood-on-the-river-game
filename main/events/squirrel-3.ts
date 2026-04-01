import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'squirrel-3', hitbox: { width: 8, height: 8 } })
export default class Squirrel3Event extends RpgEvent {
    onInit() { this.setGraphic('squirrel-sprite') }
    async onAction(player: RpgPlayer) {
        await player.showText("A squirrel chatters and scurries up a tree!")
    }
}
