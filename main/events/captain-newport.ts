import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'captain-newport', hitbox: { width: 8, height: 8 } })
export default class CaptainNewportEvent extends RpgEvent {
    onInit() { this.setGraphic('smith'); this.setComponentsTop(Components.text('Capt. Newport')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 1) {
            const q1c = player.getVariable('quest_1c')
            if (q1c == 'active') {
                await player.showText("All hands! Secure the rigging! This storm will test us!", { talkWith: this })
            } else {
                await player.showText("I am Captain Christopher Newport. I command the Susan Constant. We sail for Virginia and glory!", { talkWith: this })
            }
        } else {
            await player.showText("I must return to England for more supplies. Hold the fort until I return!", { talkWith: this })
        }
    }
}
