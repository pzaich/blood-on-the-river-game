import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'squirrel-4', hitbox: { width: 16, height: 16 } })
export default class Squirrel4Event extends RpgEvent {
    onInit() { this.setGraphic('squirrel-sprite') }
    async onAction(player: RpgPlayer) {
        await player.showText("A squirrel chatters and scurries up a tree!")
    }
}
