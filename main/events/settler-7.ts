import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-7', hitbox: { width: 8, height: 8 } })
export default class Settler7Event extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('Robert Behethland')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I came to Virginia seeking fortune. So far I've found mosquitoes and hard work!", { talkWith: this })
    }
}
