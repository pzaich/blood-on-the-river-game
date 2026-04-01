import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'kanta-wild',
    hitbox: { width: 24, height: 16 }
})
export default class KantaWildEvent extends RpgEvent {
    onInit() {
        this.setGraphic('powhatan')
        this.setComponentsTop(Components.text('Kanta'))
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 3) {
            await player.showText("I am Kanta. Namontack and I will teach you to survive in the wilderness.", { talkWith: this })
            return
        }

        const q3a = player.getVariable('quest_3a')
        const q3c = player.getVariable('quest_3c')
        const q3d = player.getVariable('quest_3d')
        const q3e = player.getVariable('quest_3e')

        if (q3a === 'active' || player.getVariable('quest_3b') === 'active') {
            await player.showText("Chase the targets! They move fast — you must be quicker!", { talkWith: this })
            return
        }
        if (q3c === 'active') {
            await player.showText("The mussels cling to rocks by the shore. Crabs hide in the sand. Look carefully!", { talkWith: this })
            return
        }
        if (q3d === 'active') {
            await player.showText("Rabbits are quick! Sneak up slowly, then grab them!", { talkWith: this })
            return
        }
        if (q3e === 'active') {
            await player.showText("The deer is deep in the forest. Be patient and choose your approach wisely.", { talkWith: this })
            return
        }
        await player.showText("You are learning well, Samuel. The forest provides for those who respect it.", { talkWith: this })
    }
}
