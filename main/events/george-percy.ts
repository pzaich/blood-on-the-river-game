import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'george-percy', hitbox: { width: 8, height: 8 } })
export default class GeorgePercyEvent extends RpgEvent {
    onInit() { this.setGraphic('richard'); this.setComponentsTop(Components.text('George Percy')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 1) {
            await player.showText("I write down everything I see. This voyage is long and many are sick.", { talkWith: this })
        } else if (quest == 2) {
            await player.showText("The mosquitoes are dreadful and the water is foul. I fear many will not survive.", { talkWith: this })
        } else {
            await player.showText("George Percy, at your service. I keep a journal of our trials here.", { talkWith: this })
        }
    }
}
