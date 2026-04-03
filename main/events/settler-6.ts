import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-6', hitbox: { width: 8, height: 8 } })
export default class Settler6Event extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('George Kendall')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 2) {
            await player.showText("*whispers* Don't trust everything you hear, boy. Not everyone here has Virginia's best interests at heart.", { talkWith: this })
        } else if (quest == 5) {
            await player.showText("The Spanish would pay well for information about this colony... Not that I would know anything about that.", { talkWith: this })
        } else {
            await player.showText("I'm on the council. I have... connections. In many places.", { talkWith: this })
        }
    }
}
