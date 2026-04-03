import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-5', hitbox: { width: 8, height: 8 } })
export default class Settler5Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('Nate Peacock')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 1) {
            await player.showText("Samuel! Another boy! I'm Nathaniel but call me Nate. This ship is boring.", { talkWith: this })
        } else if (quest == 2) {
            await player.showText("Samuel, have you tried the oysters? They're huge here! Bigger than my hand!", { talkWith: this })
        } else if (quest == 3) {
            await player.showText("Be careful in the forest, Samuel. I heard there are wolves!", { talkWith: this })
        } else {
            await player.showText("Can you believe we're actually here? In Virginia! What an adventure!", { talkWith: this })
        }
    }
}
