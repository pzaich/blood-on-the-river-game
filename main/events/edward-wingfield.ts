import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'edward-wingfield', hitbox: { width: 8, height: 8 } })
export default class EdwardWingfieldEvent extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('Edward Wingfield')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 2) {
            await player.showText("Why should I dig in the dirt? I am a gentleman! Let the laborers do the work.", { talkWith: this })
            await player.showText("Captain Smith is a fool for making us all work equally.", { talkWith: this })
        } else if (quest == 5) {
            await player.showText("I still say we should not trust those natives. Mark my words.", { talkWith: this })
        } else {
            await player.showText("I am Edward Maria Wingfield, president of the council. Do not forget your place, boy.", { talkWith: this })
        }
    }
}
