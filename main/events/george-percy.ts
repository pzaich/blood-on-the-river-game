import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'george-percy',
    hitbox: { width: 24, height: 16 }
})
export default class GeorcePercyEvent extends RpgEvent {
    onInit() {
        this.setGraphic('richard')
        this.setComponentsTop(Components.text('George Percy'))
    }

    async onAction(player: RpgPlayer) {
        await player.showText("George Percy, at your service. I keep a journal of everything I see on this voyage.", { talkWith: this })
    }
}
