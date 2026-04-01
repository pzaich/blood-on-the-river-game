import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'james',
    hitbox: { width: 16, height: 16 }
})
export default class JamesEvent extends RpgEvent {
    onInit() {
        this.setGraphic('richard')
        this.setComponentsTop(Components.text('James'))
    }

    async onAction(player: RpgPlayer) {
        const quest1c = player.getVariable('quest_1c')
        if (quest1c === 'active') {
            await player.showText("This storm is terrible! Hold on to something!", { talkWith: this })
            return
        }
        await player.showText("I'm James. I hope Virginia is as good as they say!", { talkWith: this })
    }
}
