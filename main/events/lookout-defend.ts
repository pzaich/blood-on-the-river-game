import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'lookout-defend',
    hitbox: { width: 32, height: 16 }
})
export default class LookoutDefendEvent extends RpgEvent {
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_5b') !== 'active') {
            await player.showText("The lookout tower overlooks the river. All clear.")
            return
        }

        await player.showText("You climb the lookout tower and spot sails on the horizon — Spanish ships!")
        await player.showText("You must prepare the defenses!")
        const choice = await player.showChoices("What do you do?", [
            { text: "Light the warning fire", value: 'fire' },
            { text: "Load the cannons", value: 'cannon' },
            { text: "Both — fire AND cannons!", value: 'both' }
        ])
        if (choice && choice.value === 'both') {
            await player.showText("Smart thinking! You light the warning fire AND help load the cannons.")
            await player.showText("The Spanish see the fire and the fort's defenses. They turn away!")
            await player.showText("Virginia is safe — thanks to you, Samuel!")
        } else {
            await player.showText("Good call! The Spanish scouts see that the fort is defended and sail away.")
            await player.showText("Virginia is safe for now.")
        }
        player.setVariable('quest_5b', 'complete')
        player.showNotification("Fort defended! You earned the Defender's Medal.", { time: 3000 })
    }
}
