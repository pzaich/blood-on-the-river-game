import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-9', hitbox: { width: 8, height: 8 } })
export default class Settler9Event extends RpgEvent {
    onInit() { this.setGraphic('richard'); this.setComponentsTop(Components.text('Anas Todkill')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 4) {
            await player.showText("The Powhatan are skilled hunters. I've been watching how they track deer — we could learn much from them.", { talkWith: this })
        } else if (quest == 3) {
            await player.showText("I go where Captain Smith goes. He's the only real leader we have.", { talkWith: this })
        } else {
            await player.showText("I'm Anas Todkill, Captain Smith's most loyal man. I'll follow him anywhere.", { talkWith: this })
        }
    }
}
