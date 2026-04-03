import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-warrior-2', hitbox: { width: 8, height: 8 } })
export default class PowhatanWarrior2Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Swift Arrow')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I have hunted since I was your age. The bow is an extension of your arm.", { talkWith: this })
    }
}
