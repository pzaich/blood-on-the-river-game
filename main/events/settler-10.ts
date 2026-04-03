import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-10', hitbox: { width: 8, height: 8 } })
export default class Settler10Event extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('John Laydon Jr.')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 4) {
            await player.showText("My father is the carpenter back at the fort. He sent me to learn how the Powhatan build their longhouses.", { talkWith: this })
        } else if (quest == 2) {
            await player.showText("My father builds the houses. I carry the nails! One day I'll be a carpenter too.", { talkWith: this })
        } else {
            await player.showText("I'm John Laydon's son. My father says Virginia will be our home forever.", { talkWith: this })
        }
    }
}
