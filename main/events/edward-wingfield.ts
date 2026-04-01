import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'edward-wingfield',
    hitbox: { width: 8, height: 8 }
})
export default class EdwardWingfieldEvent extends RpgEvent {
    onInit() {
        this.setGraphic('hunt')
        this.setComponentsTop(Components.text('Edward Wingfield'))
    }

    async onAction(player: RpgPlayer) {
        await player.showText("I am Edward Maria Wingfield, president of the council. Mind your manners, boy.", { talkWith: this })
    }
}
