import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-3', hitbox: { width: 8, height: 8 } })
export default class Settler3Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('Thomas Savage')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 4 || quest == 5) {
            await player.showText("Samuel! I've been living with the Powhatan to learn their language. They call me one of their own now!", { talkWith: this })
            await player.showText("Namontack taught me to say 'wingapo' — it means 'welcome, friend.'", { talkWith: this })
        } else if (quest == 2) {
            await player.showText("I'm learning words from the natives who visit. 'Maize' means corn!", { talkWith: this })
        } else {
            await player.showText("I'm Thomas Savage. I'm about your age, Samuel. Stick together?", { talkWith: this })
        }
    }
}
