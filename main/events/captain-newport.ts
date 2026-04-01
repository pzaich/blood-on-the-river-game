import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'captain-newport',
    hitbox: { width: 8, height: 8 }
})
export default class CaptainNewportEvent extends RpgEvent {
    onInit() {
        this.setGraphic('smith')
        this.setComponentsTop(Components.text('Capt. Newport'))
    }

    async onAction(player: RpgPlayer) {
        const quest1c = player.getVariable('quest_1c')
        if (quest1c === 'active') {
            await player.showText("Hold steady! This storm will pass!", { talkWith: this })
            return
        }
        await player.showText("I am Captain Christopher Newport, master of the Susan Constant. We sail for Virginia!", { talkWith: this })
    }
}
