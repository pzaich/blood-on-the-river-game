import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-4', hitbox: { width: 8, height: 8 } })
export default class Settler4Event extends RpgEvent {
    onInit() { this.setGraphic('richard'); this.setComponentsTop(Components.text('William Laxon')) }
    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest == 2) {
            await player.showText("I'm the blacksmith. Bring me iron and I'll forge you the finest tools in Virginia!", { talkWith: this })
            await player.showText("Unlike those gentlemen who won't dirty their hands, I know the value of honest work.", { talkWith: this })
        } else {
            await player.showText("These gentlemen think they're too good to work. Captain Smith has the right idea — everyone works or nobody eats.", { talkWith: this })
        }
    }
}
