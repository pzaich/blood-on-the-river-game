import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-2', hitbox: { width: 8, height: 8 } })
export default class Settler2Event extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('John Martin')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 2) {
            await player.showText("My back aches! In England, I had servants to do this work.", { talkWith: this })
            await player.showText("Captain Smith says 'He that will not work shall not eat.' Harsh but perhaps fair.", { talkWith: this })
        } else {
            await player.showText("I came seeking gold. Instead I found swamps and hard labor.", { talkWith: this })
        }
    }
}
